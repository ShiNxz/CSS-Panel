import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Mute } from '@/utils/types/db/plugin'
import { GetSteamUser } from 'steam-api-sdk'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import queryParamsSchema from '@/utils/schemas/queryParams'
import isAdmin from '@/utils/functions/isAdmin'
import GetSteamUsers from '@/utils/functions/GetSteamUsers'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import muteSchema from '@/utils/schemas/muteSchema'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'GET': {
			const { page, rows } = queryParamsSchema.parse(req.query)

			const isUserAdmin = await isAdmin(req)
			const showAdminName = await query.settings.getByKey('showAdminName', false)
			const shouldShowAdminName = showAdminName || isUserAdmin ? true : false

			const dbMutes = await query.mutes.getAll(page, rows)
			const count = await query.mutes.count()

			const filteredSteams = [
				...dbMutes.map((mute) => mute.player_steamid),
				...dbMutes.map((mute) => mute.admin_steamid),
			].filter((steamid): steamid is string => !!steamid)

			const steams = await GetSteamUsers(filteredSteams)

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
						comment,
						unmute_reason,
					} = mute

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
						unmute_reason: isUserAdmin ? unmute_reason : null,
						type,
					}
				})
			)

			const mappedMutes: ExtMute[] = mutes.filter((mute) => !!mute) as ExtMute[]

			return res.status(200).json({ results: mappedMutes, count })
		}

		case 'POST': {
			try {
				const isAdmin = await isAdminMiddleware(req, res)
				if (!isAdmin) return

				const body = muteSchema.parse(req.body)

				const { player_steamid, reason, duration, comment, type } = body

				let player = await GetSteamUser(player_steamid)
				if (!player) return res.status(400).send('Invalid player_steamid')

				const created = new Date()
				const ends = new Date(created.getTime() + Number(duration) * 60 * 1000)

				const admin_name = isAdmin.player_name
				const admin_steamid = isAdmin.player_steamid

				await query.mutes.create({
					player_name: player.personaname,
					player_steamid: player_steamid,
					reason,
					duration: Number(duration),
					comment,
					admin_steamid,
					admin_name,
					created,
					ends,
					type,
				})

				Log(
					'Mute Create',
					`Admin ${req.user?.displayName} (${req.user?.id}) muted "${player?.personaname}" (${player_steamid}) with reason: ${reason} and duration: ${duration} minutes`,
					req.user?.id
				)

				return res.status(201).json({ message: 'Mute created' })
			} catch (error) {
				return res.status(400).json({ error })
			}
		}
	}
}

export interface ExtMute {
	id: SA_Mute['id']
	admin_name: SA_Mute['admin_name'] | null
	admin_steamid: SA_Mute['admin_steamid'] | null
	admin_avatar: string | null
	created: SA_Mute['created']
	duration: SA_Mute['duration']
	ends: SA_Mute['ends']
	reason: SA_Mute['reason']
	status: SA_Mute['status']
	player_name: SA_Mute['player_name']
	player_steamid: SA_Mute['player_steamid']
	player_avatar: string | null
	server_id: SA_Mute['server_id']
	type: SA_Mute['type']
	comment: SA_Mute['comment'] | null
	unmute_reason: SA_Mute['unmute_reason'] | null
}

export interface API_MUTES {
	results: ExtMute[]
	count: number
}

export default handler
