import { Server } from '@fabricio-191/valve-server-query'

const GetServerInfo = async (ip: string, port: number): Promise<ServerInfo | null> => {
	try {
		const server = await Server({
			ip,
			port,
			timeout: 2000,
		})

		const info = await server.getInfo()
		server.disconnect()

		const { name, map, game, players, VAC, version } = info

		return {
			name,
			map,
			players: players.online,
			maxPlayers: players.max,
			percentage: Math.round((players.online / players.max) * 100),
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
	percentage: number
	VAC: boolean
	version: string | undefined
	game: string
}

export default GetServerInfo
