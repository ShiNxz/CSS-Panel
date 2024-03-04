import type { NextApiRequest, NextApiResponse } from 'next'
import { RCON } from '@fabricio-191/valve-server-query'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import {
	serverActionsSchema,
	serverBanSchema,
	serverKickSchema,
	serverMuteSchema,
} from '@/app/UI/Layouts/Main/Servers/Modal/Store'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res)
	if (!isAdmin) return

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'POST': {
			try {
				const { serverId } = req.query as { serverId: string }
				const dbServer = await query.servers.getById(Number(serverId))
				if (!dbServer) return res.status(404).json({ error: 'Server not found' })

				const { address, rcon } = dbServer
				const { action, userId } = serverActionsSchema.parse(req.body)

				const details = req.body.details
				if (!details) return res.status(400).json({ error: 'Details not set' })

				if (!rcon) return res.status(500).json({ error: 'RCON not set' })

				const [ip, port] = address.split(':')

				const server = await RCON({
					ip,
					port: Number(port),
					password: rcon,
				})

				server.authenticate()

				switch (action) {
					case 'kick': {
						const reason = serverKickSchema.parse(details)

						await server.exec(`css_kick #${userId} ${reason}`)

						break
					}

					case 'ban': {
						const { reason, duration } = serverBanSchema.parse(details)

						await server.exec(`css_ban #${userId} ${duration} ${reason}`)

						break
					}

					case 'mute': {
						const { reason, duration, type } = serverMuteSchema.parse(details)

						const command = `css_${type.toLowerCase()}`

						await server.exec(`${command} #${userId} ${duration} ${reason}`)

						break
					}
				}

				Log(
					'Server Action',
					`Admin ${req.user?.displayName} (${req.user?.id}) performed action '${action}' on player ${userId} on server #${serverId}`,
					req.user?.id
				)

				return res.status(200).send('Message sent')
			} catch (error) {
				return res.status(500).json({ error })
			}
		}
	}
}

export default handler
