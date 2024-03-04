import type { NextApiRequest, NextApiResponse } from 'next'
import type { IExtendedSteamUser } from 'steam-api-sdk/types'
import { RCON } from '@fabricio-191/valve-server-query'
import { From64ToUser } from 'steam-api-sdk'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!query) return res.status(500).json({ message: 'Database not connected' })

	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res)
	if (!isAdmin) return

	switch (method) {
		/**
		 * Get all chat logs from a server
		 */
		case 'GET': {
			try {
				const { serverId } = req.query as { serverId: string }
				const dbServer = await query.servers.getById(Number(serverId))
				if (!dbServer) return res.status(404).json({ error: 'Server not found' })

				const chatMessages = await query.chatLogs.getAllByServerAndMinutes(Number(serverId), 5)

				return res.status(200).json(chatMessages)
			} catch (error) {
				return res.status(500).json({ error })
			}
		}

		// Send a message to the server
		case 'POST': {
			try {
				const { serverId } = req.query as { serverId: string }
				const dbServer = await query.servers.getById(Number(serverId))
				if (!dbServer) return res.status(404).json('Server not found')

				const { address, rcon } = dbServer
				if (!address || !rcon) return res.status(400).send('Server address or RCON password is missing')

				const [ip, port] = address.split(':')

				let { message, hideName } = req.body as { message: string; hideName: boolean }
				if (!message) return res.status(400).send('Message is required')

				if (typeof hideName !== 'boolean') hideName = false

				const adminUser = await From64ToUser(req.user?.id!)
				if (!adminUser || !adminUser.length) return res.status(500).send('Error getting admin user')

				const server = await RCON({
					ip,
					port: Number(port),
					password: rcon,
				})

				if (!server) return res.status(500).send('Error creating RCON connection')

				server.authenticate()

				await server.exec(
					`css_panel_say ${
						hideName ? '{lime}[ADMIN]' : `{lime} ${adminUser[0].personaname}`
					}: {default}${message}`
				)

				Log(
					'Server Chat',
					`Admin ${req.user?.displayName} (${req.user?.id}) Sent message to server ${
						dbServer.hostname
					}: ${message} as ${hideName ? 'Anonymouse' : ''}`,
					req.user?.id
				)

				const created = new Date()

				await query.chatLogs.create({
					created,
					message,
					playerName: adminUser[0].personaname + ' (Panel)',
					playerSteam64: adminUser[0].steamid,
					serverId,
					team: 0,
				})

				return res.status(200).send('Message sent')
			} catch (error) {
				return res.status(500).json({ error })
			}
		}
	}
}

export default handler
