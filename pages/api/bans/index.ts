import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Ban } from '@/utils/types/db/simpleadmin'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import queryParamsSchema from '@/utils/schemas/queryParams'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const { page, rows } = queryParamsSchema.parse(req.query)

			const dbBans = await query.bans.getAll(page, rows)
			const count = await query.bans.count()

			const bans: (ExtBan | null)[] = await Promise.all(
				dbBans.map(async (ban) => {
					const {
						admin_name,
						admin_steamid,
						created,
						duration,
						ends,
						id,
						reason,
						status,
						player_name,
						player_steamid,
						server_id,
					} = ban

					return {
						admin_name,
						admin_steamid,
						created,
						duration,
						ends,
						id,
						reason,
						status,
						player_name,
						player_steamid,
						server_id,
					}
				})
			)

			const mappedBans: ExtBan[] = bans.filter((ban) => !!ban) as ExtBan[]

			return res.status(200).json({ results: mappedBans, count })
		}
	}
}

export interface ExtBan {
	admin_name: SA_Ban['admin_name']
	admin_steamid: SA_Ban['admin_steamid']
	created: SA_Ban['created']
	duration: SA_Ban['duration']
	ends: SA_Ban['ends']
	id: SA_Ban['id']
	reason: SA_Ban['reason']
	status: SA_Ban['status']
	player_name: SA_Ban['player_name']
	player_steamid: SA_Ban['player_steamid']
	server_id: SA_Ban['server_id']
}

export interface API_BANS {
	results: ExtBan[]
	count: number
}

export default handler
