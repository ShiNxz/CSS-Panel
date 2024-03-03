import { Server } from '@fabricio-191/valve-server-query'
import PlayerStatus, { type RconPlayer } from './PlayersStatus'

/**
 * Get server info **using the source-query package**
 * @param ip Server IP
 * @param port Server port
 * @returns ServerInfo
 * @returns null if the server is offline or the query fails
 */
const GetServerInfo = async (ip: string, port: number, rcon?: string): Promise<ServerInfo | null> => {
	try {
		const server = await Server({
			ip,
			port,
			timeout: 2000,
		})

		const info = await server.getInfo()
		server.disconnect()

		const { name, map, game, players, VAC, version } = info

		if (rcon)
			debug(
				`RCON Found for server ${ip}:${port}, the server info will be pulled with RCON.\nNote that you can should consider using our official plugin to get more information and features.\nhttps://github.com/ShiNxz/CSS-Plugin`
			)
		else
			log(
				`RCON not found for server ${ip}:${port}, the server info will be pulled without RCON, this means that players and advanced information modal will not be shown.\nConsider using our official plugin to get more information and features.\nhttps://github.com/ShiNxz/CSS-Plugin`
			)

		const serverPlayers = rcon ? await PlayerStatus(ip, port, rcon) : null
		const serverPlayersWithoutIP = serverPlayers
			? serverPlayers?.map((player) => {
					const { ipAddress, ...rest } = player
					return rest
			  })
			: null

		return {
			name,
			map,
			players: players.online,
			serverPlayers: serverPlayersWithoutIP,
			maxPlayers: players.max,
			VAC,
			version,
			game,
		}
	} catch (e) {
		error(`[Error] getting server info: ${ip}:${port}: ${e}`)
		return null
	}
}

export interface ServerInfo {
	name: string
	map: string
	players: number
	maxPlayers: number
	VAC: boolean
	version: string | undefined
	game: string
	serverPlayers: Omit<RconPlayer, 'ipAddress'>[] | null
}

export default GetServerInfo
