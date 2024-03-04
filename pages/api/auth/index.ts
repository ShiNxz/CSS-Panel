import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Admin } from '@/utils/types/db/plugin'
import type { SteamProfile } from '@/utils/lib/Steam'
import router from '@/lib/Router'
import query from '@/utils/functions/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'GET': {
			try {
				if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

				const steam64 = req.user.id
				const admin = await query.admins.getBySteam64(steam64)

				if (admin) {
					if (typeof admin.flags === 'string' && admin.flags.startsWith('#')) {
						const group = await query.adminGroups.getById(admin.flags)
						if (group) admin.group = group
					}
				}

				return res.status(200).json({ user: req.user, admin })
			} catch (err) {
				error(`GET /api/auth`, err)
				return res.status(400).json({ error: 'Internal Server Error' })
			}
		}
	}
}

export interface IAuth {
	user: SteamProfile
	admin: SA_Admin
}

export default handler
