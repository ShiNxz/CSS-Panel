import { RCON } from '@fabricio-191/valve-server-query'

/**
 * Get the status of the server **using RCON and the custom plugin command (css_query)**
 * - Using the custom plugin that made for the panel
 */
const PluginStatus = async (ip: string, port: number, password: string): Promise<PluginStatus | null> => {
	try {
		const server = await RCON({
			ip,
			port,
			password,
		})

		server.authenticate()

		const status = await server.exec('css_query')

		console.log(JSON.parse(status))

		return JSON.parse(status)
	} catch (e) {
		console.error(`Error getting RCON status: ${ip}:${port}`, e)
		return null
	}
}

export interface PluginServer {
	map: string
	players: number
	maxPlayers: number
	maps: string[]
}

export interface PluginPlayer {
	userId: number
	playerName: string
	ipAddress: string
	accountId: '908937898'
	steamId2: 'STEAM_0:0:454468949'
	steamId3: '[U:1:908937898]'
	steam64: '76561198869203626'
	ping: number
	team: number
	clanName: string
	kills: string[] // currently doesnt work
	deaths: number // currently doesnt work
	score: number
	roundScore: number
	roundsWon: number
	flags: number // currently doesnt work
	mvps: number
	connected: number
	valid: boolean
	time: number // currently doesnt work
}

export interface PluginStatus {
	server: PluginServer
	users: PluginPlayer[]
}

export default PluginStatus
