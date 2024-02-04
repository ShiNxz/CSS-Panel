import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import serverSchema from '@/utils/schemas/serverSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@css/root'])
	if (!isAdmin) return

	switch (method) {
		case 'GET': {
			const servers = await query.servers.getAll()

			return res.status(200).json(servers)
		}

		case 'POST': {
			const { hostname, address } = serverSchema.parse(req.body)

			const server = await query.servers.create({ hostname, address })

			return res.status(201).send('Server created')
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
