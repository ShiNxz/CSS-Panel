import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import serverSchema from '@/utils/schemas/serverSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import SendRcon from '@/utils/functions/SendRcon'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@web/servers', '@css/root'], 'OR')
	if (!isAdmin) return

	const { id } = req.query as { id: string }

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	const server = await query.servers.getById(Number(id))
	if (!server) return res.status(404).json({ message: 'Server not found' })

	switch (method) {
		case 'PUT': {
			const { hostname, address } = serverSchema.parse(req.body)

			const server = await query.servers.update(Number(id), { hostname, address })

			Log(
				'Server Edit',
				`Admin ${req.user?.displayName} (${req.user?.id}) edited server "${hostname}" (ip: ${address})`,
				req.user?.id
			)

			return res.status(201).json(server)
		}

		case 'POST': {
			try {
				const { message } = req.body as { message: string }

				const response = await SendRcon(Number(id), message)

				Log(
					'Server Rcon',
					`Admin ${req.user?.displayName} (${req.user?.id}) send a rcon command to server #${id} (command: ${message})`,
					req.user?.id
				)

				return res.status(200).json({ response })
			} catch (error) {
				return res.status(500).json(error)
			}
		}

		case 'DELETE': {
			try {
				const admins = await query.admins.getByServerId(id)
				if (admins.length > 0) return res.status(403).send('Please remove all admins from this server first')

				await query.servers.delete(Number(id))

				Log(
					'Server Delete',
					`Admin ${req.user?.displayName} (${req.user?.id}) deleted server #${id}`,
					req.user?.id
				)

				return res.status(200).send('Server deleted')
			} catch (error) {
				return res.status(500).json({ message: 'Error while deleting server', error })
			}
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
