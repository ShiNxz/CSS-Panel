import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!query) return res.status(500).json({ message: 'Database not connected' })

	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const settings = await query.settings.getAll(true)

			return res.status(200).json(settings)
		}
	}
}

export default handler
