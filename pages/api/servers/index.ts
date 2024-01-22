import type { NextApiRequest, NextApiResponse } from 'next'
import GetServerInfo, { ServerInfo } from '@/utils/functions/query/ServerStatus'
import query from '@/utils/functions/db'
import router from '@/lib/Router'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const dbServers = await query.servers.getAll()

			const servers: (ExtServer | null)[] = await Promise.all(
				dbServers.map(async (server) => {
					const { hostname, address } = server
					const [ip, port] = address.split(':')

					const info = await GetServerInfo(ip, Number(port))
					if (!info) return null

					return { hostname, address, ...info }
				})
			)

			const mappedServers = servers.filter((server) => server !== null)

			return res.status(200).json(mappedServers)
		}
	}
}

export interface ExtServer extends ServerInfo {
	hostname: string
	address: string
}

export default handler
