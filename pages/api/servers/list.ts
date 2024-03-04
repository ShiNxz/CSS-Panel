import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'GET': {
			const dbServers = await query.servers.getAll()

			return res.status(200).json(dbServers)
		}
	}
}

export default handler
