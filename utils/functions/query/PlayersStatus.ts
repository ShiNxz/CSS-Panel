import { RCON } from '@fabricio-191/valve-server-query'

/**
 * Get the server players **using RCON** and pull the players list
 * - Using the SimpleAdmin RCON command (css_players)
 */
const PlayerStatus = async (ip: string, port: number, password: string): Promise<RconPlayer[] | null> => {
	try {
		const server = await RCON({
			ip,
			port,
			password,
		})

		server.authenticate()

		const playersString = await server.exec('css_players')

		// Split the string into lines
		const lines = playersString.split('\n')

		// Define the regular expression to match player details
		const playerRegex = /\[#(\d+)\] "(.*?)" \(IP Address: "(.*?)" SteamID64: "(.*?)"\)/

		// Initialize an empty array to hold the player objects
		const players = []

		// Iterate over each line
		for (const line of lines) {
			// If the line matches the player details regex
			const match = line.match(playerRegex)
			if (match) {
				// Extract the player details
				const [, id, name, ipAddress, steamId64] = match

				// If the player has a SteamID, add them to the array
				if (steamId64) {
					players.push({
						id: parseInt(id),
						name,
						ipAddress,
						steamId64,
					})
				}
			}
		}

		server.destroy()

		console.log({ players })
		// Filter out empty names (bots)
		return players
	} catch (e) {
		console.error(`Error getting RCON status: ${ip}:${port}`, e)
		return null
	}
}

export interface RconPlayer {
	id: number
	name: string
	ipAddress: string
	steamId64: string
}

export default PlayerStatus
