import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const isAdmin = await isAdminMiddleware(req, res, ['@css/root'])
	if (!isAdmin) return

	const { method } = req

	switch (method) {
		case 'GET': {
			const logs = await query.logs.getAllMapped()

			return res.status(200).json(logs)
		}
	}
}

export default handler
