import type { NextApiRequest, NextApiResponse } from 'next'
import type { SteamProfile } from '@/utils/lib/Steam'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			if (!req.user) return res.status(401).json({ error: 'Unauthorized' })

			return res.status(200).json({ user: req.user })
		}
	}
}

export interface IAuth {
	user: SteamProfile
}

export default handler
