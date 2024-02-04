import type { NextApiRequest, NextApiResponse } from 'next'
import type { Flag } from '@/utils/types/db/css'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import adminSchema from '@/utils/schemas/adminSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@css/root'])
	if (!isAdmin) return

	switch (method) {
		case 'GET': {
			const admins = await query.admins.getAll()
			const servers = await query.servers.getAll()

			return res.status(200).json({ admins, servers })
		}

		case 'POST': {
			const { flags, immunity, player_name, player_steamid, server_id } = adminSchema.parse(req.body)

			const admin = await query.admins.create({
				flags: flags as Flag,
				immunity: immunity.toString() ?? 0,
				player_name,
				player_steamid,
				server_id: server_id ?? null,
			})

			// todo send a rcon command to update the admin on the servers

			return res.status(201).json(admin)
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
