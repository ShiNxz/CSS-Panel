import type { NextApiRequest, NextApiResponse } from 'next'
import ServerQuery from '@/utils/functions/query/ServerQuery'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!query) return res.status(500).json({ message: 'Database not connected' })

	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			try {
				const { serverId } = req.query as { serverId: string }
				const dbServer = await query.servers.getById(Number(serverId))
				if (!dbServer) return res.status(404).json({ error: 'Server not found' })

				const isAdmin = req.user?.id ? !!(await query.admins.getBySteam64(req.user?.id)) : false

				const serverInfo = await ServerQuery(Number(serverId), isAdmin)

				return res.status(200).json(serverInfo)
			} catch (error) {
				return res.status(500).json({ error })
			}
		}
	}
}

export default handler
