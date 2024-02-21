import { RCON } from '@fabricio-191/valve-server-query'

const CURRENT_VERSION = '1.3.3a'

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
		if (!status) return null

		const jsonStatus = JSON.parse(status) as PluginStatus
		const { pluginVersion } = jsonStatus.server

		if (pluginVersion !== CURRENT_VERSION) {
			console.warn(
				`[PluginStatus] The plugin version (${pluginVersion}) for ${ip}:${port} is outdated, the latest version is: ${CURRENT_VERSION}\n->Download the latest version from: https://github.com/ShiNxz/CSS-Plugin`
			)
		}

		return JSON.parse(status)
	} catch (e) {
		console.error(
			`[Error] getting Plugin RCON status: ${ip}:${port}: ${e}\nMake sure that the plugin is installed and the RCON is enabled.\nDownload: https://github.com/ShiNxz/CSS-Plugin`
		)
		return null
	}
}

export interface PluginServer {
	map: string
	players: number
	maxPlayers: number
	maps: string[]
	pluginVersion: string
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
	kills: string
	deaths: string
	assists: string
	headshots: string
	damage: string
	score: number
	roundScore: number
	roundsWon: number
	mvps: number
	time: number // currently doesnt work
	avatar: string
	role?: string // todo after making the roles system
}

export interface PluginStatus {
	server: PluginServer
	players: PluginPlayer[]
}

export default PluginStatus
