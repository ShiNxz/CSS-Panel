import type { NextApiRequest, NextApiResponse } from 'next'
import { RCON } from '@fabricio-191/valve-server-query'
import { z } from 'zod'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res)
	if (!isAdmin) return

	switch (method) {
		case 'POST': {
			try {
				const { serverId } = req.query as { serverId: string }
				const dbServer = await query.servers.getById(Number(serverId))
				if (!dbServer) return res.status(404).json({ error: 'Server not found' })

				const { address, rcon } = dbServer
				const { action, userId, details } = serverActionsSchema.parse(req.body)

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
						const reason = details as z.infer<typeof kickSchema>

						await server.exec(`css_kick #${userId} ${reason}`)
						console.log(`css_kick #${userId} ${reason}`)

						break
					}

					case 'ban': {
						const { reason, duration } = details as z.infer<typeof banSchema>

						await server.exec(`css_ban #${userId} ${duration} ${reason}`)

						break
					}
				}

				query.logs.create(
					'Server Action',
					`Admin ${req.user?.id} performed action ${action} on player ${userId} on server ${serverId}`,
					req.user?.id
				)

				return res.status(200).send('Message sent')
			} catch (error) {
				return res.status(500).json({ error })
			}
		}
	}
}

const kickSchema = z.string()
const banSchema = z.object({
	duration: z.number(), // in minutes
	reason: z.string(),
})

const serverActionsSchema = z.object({
	action: z.enum(['kick', 'ban', 'message']),
	userId: z.number(),
	details: z.union([kickSchema, banSchema]),
})

export default handler
