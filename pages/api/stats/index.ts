import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!query) return res.status(500).json({ message: 'Database not connected' })

	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const servers = await query.servers.count()
			const admins = await query.admins.count()
			const bans = await query.bans.count()
			const mutes = await query.mutes.count()

			return res.status(200).json({
				admins,
				servers,
				bans,
				mutes,
			})
		}
	}
}

export interface API_STATS {
	servers: number
	admins: number
	bans: number
	mutes: number
}

export default handler
