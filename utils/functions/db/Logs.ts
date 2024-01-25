import type { CSSP_Log, CSSP_LogExtended } from '@/utils/types/db/panel'
import { From64ToUser } from 'steam-api-sdk'
import db from '@/utils/lib/Mysql'
import Admins from './Admins'

const Logs = {
	getAll: async (): Promise<CSSP_Log[]> => {
		try {
			const [rows] = await db.query<CSSP_Log[]>('SELECT * FROM `cssp_logs`')

			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all logs: ${err}`)
			return []
		}
	},
	getAllMapped: async (): Promise<CSSP_LogExtended[]> => {
		try {
			const logs = await Logs.getAll()
			const steamIds: string[] = []

			const mappedLogs: CSSP_LogExtended[] = await Promise.all(
				logs.map(async (log) => {
					const admin = await Admins.getById(log.aid)
					if (admin) if (!steamIds.includes(admin.player_steamid)) steamIds.push(admin.player_steamid)

					return {
						...log,
						constructor: undefined,
						admin,
					}
				})
			)

			const users = await From64ToUser(steamIds)
			if (!users) return mappedLogs

			mappedLogs.forEach((log) => {
				if (log.admin) {
					const user = users.find((user) => user.steamid === log.admin?.player_steamid)
					if (user) log.admin.user = user
				}
			})

			return mappedLogs
		} catch (err) {
			console.error(`[DB] Error while getting all logs: ${err}`)
			return []
		}
	},
	getByAdmin: async (adminId: number): Promise<CSSP_Log[]> => {
		try {
			const [rows] = await db.query<CSSP_Log[]>(`SELECT * FROM \`cssp_logs\` WHERE \`aid\` = ?`, [adminId])

			return rows
		} catch (err) {
			console.error(`[DB] Error while getting log: ${err}`)
			return []
		}
	},
	getByAdmin64: async (admin64: string): Promise<CSSP_Log[] | null> => {
		try {
			// Get the admin id
			const { id: adminId } = (await Admins.getBySteam64(admin64)) || {}
			if (!adminId) return null

			// Get the logs
			const [rows] = await db.query<CSSP_Log[]>(`SELECT * FROM \`cssp_logs\` WHERE \`aid\` = ?`, [adminId])

			return rows
		} catch (err) {
			console.error(`[DB] Error while getting log: ${err}`)
			return []
		}
	},
	create: async (title: string, message: string, admin64?: string): Promise<boolean> => {
		try {
			// System log
			if (!admin64) {
				await db.query(`INSERT INTO \`cssp_logs\` (\`title\`, \`message\`) VALUES (?, ?)`, [title, message])
				return true
			}

			// Get the admin id
			const { id: adminId } = (await Admins.getBySteam64(admin64)) || {}
			if (!adminId) return false

			await db.query(`INSERT INTO \`cssp_logs\` (\`title\`, \`message\`, \`aid\`) VALUES (?, ?, ?)`, [
				title,
				message,
				adminId,
			])

			return true
		} catch (err) {
			console.error(`[DB] Error while creating log: ${err}`)
			return false
		}
	},
}

export default Logs
