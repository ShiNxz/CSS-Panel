import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Admin } from '@/utils/types/db/plugin'
import type { SteamProfile } from '@/utils/lib/Steam'
import router from '@/lib/Router'
import query from '@/utils/functions/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

			const steam64 = req.user.id
			const admin = await query.admins.getBySteam64(steam64)

			return res.status(200).json({ user: req.user, admin })
		}
	}
}

export interface IAuth {
	user: SteamProfile
	admin: SA_Admin
}

export default handler
