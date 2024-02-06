import { Server } from '@fabricio-191/valve-server-query'
import PlayerStatus, { type RconPlayer } from './PlayersStatus'
import query from '../db'

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
		console.error(`Error getting server info: ${ip}:${port}`, e)
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
