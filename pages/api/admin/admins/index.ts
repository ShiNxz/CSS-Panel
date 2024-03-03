import type { NextApiRequest, NextApiResponse } from 'next'
import type { Flag } from '@/utils/types/db/css'
import { SendGlobalCommand } from '@/utils/functions/SendRcon'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import adminSchema from '@/utils/schemas/adminSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@web/admins', '@css/root'], 'OR')
	if (!isAdmin) return

	switch (method) {
		case 'GET': {
			const admins = await query.admins.getAll()
			const servers = await query.servers.getAll()
			const groups = await query.adminGroups.getAll()

			return res.status(200).json({ admins, servers, groups })
		}

		case 'POST': {
			const { flags, immunity, player_name, player_steamid, server_id } = adminSchema.parse(req.body)

			const userImmunity = isAdmin.immunity
			if (Number(immunity) >= Number(userImmunity))
				return res.status(403).json({ message: 'You cannot create an admin with higher immunity than yours' })

			const admin = await query.admins.create({
				flags: flags as Flag[],
				immunity: immunity.toString() ?? 0,
				player_name,
				player_steamid,
				server_id: server_id ?? null,
			})

			await SendGlobalCommand('css_reladmin')

			Log('Admin Create', `Admin ${req.user?.displayName} (${req.user?.id}) created admin: ${player_name}`, req.user?.id)

			return res.status(201).json(admin)
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
