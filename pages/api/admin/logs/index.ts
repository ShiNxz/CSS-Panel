import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import queryParamsSchema from '@/utils/schemas/queryParams'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@web/logs', '@css/root'], 'OR')
	if (!isAdmin) return

	const { method } = req

	switch (method) {
		case 'GET': {
			const { page, rows, query: search } = queryParamsSchema.parse(req.query)
			const logs = await query.logs.getAllMapped(page, rows, search)
			const count = await query.logs.count(search)

			return res.status(200).json({ results: logs, count })
		}
	}
}

export default handler
