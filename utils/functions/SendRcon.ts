import { RCON } from '@fabricio-191/valve-server-query'
import query from './db'

const SendRcon = async (serverId: number, command: string) => {
	try {
		const dbServer = await query.servers.getById(Number(serverId))
		if (!dbServer) throw new Error('Server not found')

		const { address, rcon } = dbServer
		const [ip, port] = address.split(':')

		if (!rcon) throw new Error('Server has no rcon password')

		const server = await RCON({
			ip,
			port: Number(port),
			password: rcon,
			enableWarns: true,
			retries: 2,
			timeout: 2000,
		})

		server.authenticate()

		const status = await server.exec(command)
		if (!status) return 'No response from server'

		return status
	} catch (error) {
		warn(`Error while sending rcon command: ${error}`)
		throw error
	}
}

export const SendGlobalCommand = async (command: string) => {
	const servers = await query.servers.getAll()
	const responses = await Promise.all(
		servers.map(async (server) => {
			try {
				const response = await SendRcon(server.id, command)
				return { server: server.hostname, response }
			} catch (error) {
				return { server: server.hostname, response: error }
			}
		})
	)

	return responses
}

export default SendRcon
