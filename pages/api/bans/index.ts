import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Ban } from '@/utils/types/db/plugin'
import { GetSteamUser } from 'steam-api-sdk'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import queryParamsSchema from '@/utils/schemas/queryParams'
import isAdmin from '@/utils/functions/isAdmin'
import GetSteamUsers from '@/utils/functions/GetSteamUsers'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import banSchema from '@/utils/schemas/banSchema'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const { page, rows } = queryParamsSchema.parse(req.query)

			const isUserAdmin = await isAdmin(req)
			const showAdminName = await query.settings.getByKey('showAdminName', false)
			const shouldShowAdminName = showAdminName || isUserAdmin ? true : false

			const dbBans = await query.bans.getAll(page, rows)
			const count = await query.bans.count()

			const filteredSteams = [
				...dbBans.map((ban) => ban.player_steamid),
				...dbBans.map((ban) => ban.admin_steamid),
			].filter((steamid): steamid is string => !!steamid)

			const steams = await GetSteamUsers(filteredSteams)

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
						comment,
						unban_reason,
						player_ip,
					} = ban

					return {
						admin_name: shouldShowAdminName ? admin_name : null,
						admin_steamid: shouldShowAdminName ? admin_steamid : null,
						admin_avatar: steams.find((steam) => steam.steamid === admin_steamid)?.avatar || null,
						created,
						duration,
						ends,
						id,
						reason,
						status,
						player_name,
						player_steamid,
						player_avatar: steams.find((steam) => steam.steamid === player_steamid)?.avatar || null,
						server_id,
						comment: isUserAdmin ? comment : null,
						unban_reason: isUserAdmin ? unban_reason : null,
						player_ip,
					}
				})
			)

			const mappedBans: ExtBan[] = bans.filter((ban) => !!ban) as ExtBan[]

			return res.status(200).json({ results: mappedBans, count })
		}

		case 'POST': {
			try {
				const isAdmin = await isAdminMiddleware(req, res)
				if (!isAdmin) return

				const body = banSchema.parse(req.body)

				const { player_steamid, player_ip, reason, duration, comment } = body

				let player = null

				if (player_steamid) {
					player = await GetSteamUser(player_steamid)
					if (!player) return res.status(400).send('Invalid player_steamid')
				}

				const created = new Date()
				const ends = new Date(created.getTime() + Number(duration) * 60 * 1000)

				const admin_name = isAdmin.player_name
				const admin_steamid = isAdmin.player_steamid

				await query.bans.create({
					player_name: player ? player.personaname : null,
					player_steamid: player ? player.steamid : null,
					player_ip: player_ip || null,
					reason,
					duration: Number(duration),
					comment,
					admin_steamid,
					admin_name,
					created,
					ends,
				})

				Log(
					'Ban Create',
					`Admin ${req.user?.displayName} (${req.user?.id}) banned "${player?.personaname}" (${player_steamid}) with reason: ${reason} and duration: ${duration} minutes`,
					req.user?.id
				)

				return res.status(201).json({ message: 'Ban created' })
			} catch (error) {
				return res.status(400).json({ error })
			}
		}
	}
}

export interface ExtBan {
	admin_name: SA_Ban['admin_name'] | null
	admin_steamid: SA_Ban['admin_steamid'] | null
	admin_avatar: string | null
	created: SA_Ban['created']
	duration: SA_Ban['duration']
	ends: SA_Ban['ends']
	id: SA_Ban['id']
	reason: SA_Ban['reason']
	status: SA_Ban['status']
	player_name: SA_Ban['player_name']
	player_steamid: SA_Ban['player_steamid']
	player_avatar: string | null
	server_id: SA_Ban['server_id']
	comment: SA_Ban['comment'] | null
	unban_reason: SA_Ban['unban_reason'] | null
	player_ip: SA_Ban['player_ip'] | null
}

export interface API_BANS {
	results: ExtBan[]
	count: number
}

export default handler
