import type { NextApiRequest, NextApiResponse } from 'next'
import GetServerInfo from '@/utils/functions/query/ServerStatus'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import PluginStatus from '@/utils/functions/query/PluginStatus'
import { From64ToUser } from 'steam-api-sdk'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const { serverId } = req.query as { serverId: string }
			const dbServer = await query.servers.getById(Number(serverId))
			if (!dbServer) return res.status(404).json({ error: 'Server not found' })

			const { hostname, address, rcon } = dbServer
			const [ip, port] = address.split(':')

			if (rcon) {
				const { server, players } = (await PluginStatus(ip, Number(port), rcon)) || {}
				if (!server || !players) return res.status(404).json({ error: 'Server not found' })

				const steamIds = players.map((player) => player.steam64.toString())
				const steamProfiles = await From64ToUser(steamIds)

				const newPlayers: PlayerInfo[] = await Promise.all(
					players.map(async (player) => {
						const { userId, playerName, steam64, score, roundsWon, ping } = player
						const profile = steamProfiles?.find((profile) => profile.steamid === steam64.toString())
						const avatar = profile?.avatarfull || ''
						const admin = await query.admins.getBySteam64AndServerId(steam64, Number(serverId))

						return { userId, playerName, steam64, score, roundsWon, avatar, ping, admin }
					})
				)

				const info: SafeServerInfo = {
					hostname,
					address,
					map: server.map,
					players: newPlayers,
					maxPlayers: server.maxPlayers,
					playersPercentage: Math.round((players.length / server.maxPlayers) * 100),
					vac: true,
					game: 'Counter-Strike 2',
				}

				return res.status(200).json(info)
			} else {
				const info = await GetServerInfo(ip, Number(port), rcon)
				if (!info) return res.status(404).json({ error: 'Server not found' })

				const steamIds = info.serverPlayers?.map((player) => player.steamId64)
				const steamProfiles = steamIds ? await From64ToUser(steamIds) : []

				const players: PlayerInfo[] | number = info.serverPlayers
					? await Promise.all(
							info.serverPlayers?.map(async (player) => {
								const { id, name, steamId64 } = player
								const profile = steamProfiles?.find((profile) => profile.steamid === steamId64)
								const avatar = profile?.avatarfull || ''
								const admin = await query.admins.getBySteam64AndServerId(steamId64, Number(serverId))

								return { userId: id, playerName: name, steam64: steamId64, avatar, ping: 0, admin }
							})
					  )
					: info.players

				const results: SafeServerInfo = {
					hostname,
					address,
					playersPercentage: Math.round((info.players / info.maxPlayers) * 100),
					map: info.map,
					players: players,
					maxPlayers: info.maxPlayers,
					vac: info.VAC,
					game: info.game,
				}

				return res.status(200).json(results)
			}
		}
	}
}

export interface SafeServerInfo {
	hostname: string
	address: string
	players: PlayerInfo[] | number
	maxPlayers: number
	playersPercentage: number
	map: string
	vac: boolean
	game: string
}

export interface PlayerInfo {
	userId?: number
	playerName?: string
	steam64?: string
	score?: number
	roundsWon?: number
	avatar?: string
	ping?: number
}

export default handler
