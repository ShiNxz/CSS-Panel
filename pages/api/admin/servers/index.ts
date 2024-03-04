import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import serverSchema from '@/utils/schemas/serverSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@web/servers', '@css/root'], 'OR')
	if (!isAdmin) return

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'GET': {
			const servers = await query.servers.getAll()

			return res.status(200).json(servers)
		}

		case 'POST': {
			const { hostname, address } = serverSchema.parse(req.body)

			await query.servers.create({ hostname, address })

			Log(
				'Server Create',
				`Admin ${req.user?.displayName} (${req.user?.id}) created server: ${hostname}`,
				req.user?.id
			)

			return res.status(201).send('Server created')
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
