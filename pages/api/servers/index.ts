import type { NextApiRequest, NextApiResponse } from 'next'
import ServerQuery, { type SafeServerInfo } from '@/utils/functions/query/ServerQuery'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const dbServers = await query.servers.getAll()
			const isAdmin = req.user?.id ? !!(await query.admins.getBySteam64(req.user?.id)) : false

			const servers: (SafeServerInfo | null)[] = await Promise.all(
				dbServers.map(async (server) => {
					const { id: serverId } = server

					const serverInfo = await ServerQuery(serverId, isAdmin).catch((e) => {
						console.error('Error while querying server', serverId, e)
					})

					if (!serverInfo) return null

					return serverInfo
				})
			)

			const mappedServers = servers.filter((server) => server !== null)

			return res.status(200).json(mappedServers)
		}
	}
}

export default handler
