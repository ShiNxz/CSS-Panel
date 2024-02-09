import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Admin } from '@/utils/types/db/simpleadmin'
import { From64ToUser } from 'steam-api-sdk'
import GetServerInfo from '@/utils/functions/query/ServerStatus'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import PluginStatus from '@/utils/functions/query/PluginStatus'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	switch (method) {
		case 'GET': {
			const dbServers = await query.servers.getAll()

			const servers: (SafeServerInfo | null)[] = await Promise.all(
				dbServers.map(async (server) => {
					const { id: serverId, hostname, address, rcon } = server
					const [ip, port] = address.split(':')

					if (rcon) {
						const { server, players } = (await PluginStatus(ip, Number(port), rcon)) || {}
						if (!server || !players) return null

						const newPlayers: PlayerInfo[] = await Promise.all(
							players.map(async (player) => {
								const {
									userId,
									playerName,
									steam64,
									score,
									roundsWon,
									ping,
									avatar,
									kills,
									deaths,
									mvps,
								} = player
								const admin = await query.admins.getBySteam64AndServerId(steam64, serverId)

								return {
									userId,
									playerName,
									steam64,
									score,
									roundsWon,
									avatar,
									ping,
									admin,
									kills,
									deaths,
									mvps,
								}
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

						console.log(info)

						return info
					} else {
						const info = await GetServerInfo(ip, Number(port), rcon)
						if (!info) return null

						const steamIds = info.serverPlayers?.map((player) => player.steamId64)
						const steamProfiles = steamIds ? await From64ToUser(steamIds) : []

						const players: PlayerInfo[] | number = info.serverPlayers
							? await Promise.all(
									info.serverPlayers?.map(async (player) => {
										const { id, name, steamId64 } = player
										const profile = steamProfiles?.find((profile) => profile.steamid === steamId64)
										const avatar = profile?.avatarfull || ''
										const admin = await query.admins.getBySteam64AndServerId(steamId64, serverId)

										return {
											userId: id,
											playerName: name,
											steam64: steamId64,
											avatar,
											ping: 0,
											admin,
										}
									})
							  )
							: info.players

						return {
							hostname,
							address,
							playersPercentage: Math.round((info.players / info.maxPlayers) * 100),
							map: info.map,
							players: players,
							maxPlayers: info.maxPlayers,
							vac: info.VAC,
							game: info.game,
						}
					}
				})
			)

			const mappedServers = servers.filter((server) => server !== null)

			return res.status(200).json(mappedServers)
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
	admin: SA_Admin | null
	kills?: string
	deaths?: string
	mvps?: number
}

export default handler
