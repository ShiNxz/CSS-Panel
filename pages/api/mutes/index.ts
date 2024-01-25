import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Mute } from '@/utils/types/db/simpleadmin'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import queryParamsSchema from '@/utils/schemas/queryParams'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const { page, rows } = queryParamsSchema.parse(req.query)

			const dbMutes = await query.mutes.getAll(page, rows)
			const count = await query.mutes.count()

			const mutes: (ExtMute | null)[] = await Promise.all(
				dbMutes.map(async (mute) => {
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
						type,
					} = mute

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
						type,
					}
				})
			)

			const mappedMutes: ExtMute[] = mutes.filter((mute) => !!mute) as ExtMute[]

			return res.status(200).json({ results: mappedMutes, count })
		}
	}
}

export interface ExtMute {
	id: SA_Mute['id']
	admin_name: SA_Mute['admin_name']
	admin_steamid: SA_Mute['admin_steamid']
	created: SA_Mute['created']
	duration: SA_Mute['duration']
	ends: SA_Mute['ends']
	reason: SA_Mute['reason']
	status: SA_Mute['status']
	player_name: SA_Mute['player_name']
	player_steamid: SA_Mute['player_steamid']
	server_id: SA_Mute['server_id']
	type: SA_Mute['type']
}

export interface API_MUTES {
	results: ExtMute[]
	count: number
}

export default handler
