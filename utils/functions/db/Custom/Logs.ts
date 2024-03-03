import type { CSSP_Log, CSSP_LogExtended } from '@/utils/types/db/panel'
import type { DB_Count } from '@/utils/types/db/plugin'
import type { RowDataPacket } from 'mysql2'
import { From64ToUser } from 'steam-api-sdk'
import db from '@/utils/lib/Mysql'
import Admins from '../Admins'

interface CSSP_LogDB extends CSSP_Log, RowDataPacket {}

const Logs = {
	getAll: async (page: number, limit: number, query?: string): Promise<CSSP_Log[]> => {
		try {
			const [rows] = await db.query<CSSP_LogDB[]>(
				`SELECT * FROM \`cssp_logs\`  ${
					query && query.length > 2 ? `WHERE title LIKE '%${query}%' OR message LIKE '%${query}%'` : ''
				} ORDER BY \`id\` DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)

			return rows
		} catch (err) {
			error(`[DB] Error while getting all logs: ${err}`)
			return []
		}
	},
	getAllMapped: async (page: number, limit: number, query?: string): Promise<CSSP_LogExtended[]> => {
		try {
			const logs = await Logs.getAll(page, limit, query)
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
			error(`[DB] Error while getting all logs: ${err}`)
			return []
		}
	},
	getByAdmin: async (adminId: number): Promise<CSSP_Log[]> => {
		try {
			const [rows] = await db.query<CSSP_LogDB[]>(`SELECT * FROM \`cssp_logs\` WHERE \`aid\` = ?`, [adminId])

			return rows
		} catch (err) {
			error(`[DB] Error while getting log: ${err}`)
			return []
		}
	},
	getByAdmin64: async (admin64: string): Promise<CSSP_Log[] | null> => {
		try {
			// Get the admin id
			const { id: adminId } = (await Admins.getBySteam64(admin64)) || {}
			if (!adminId) return null

			// Get the logs
			const [rows] = await db.query<CSSP_LogDB[]>(`SELECT * FROM \`cssp_logs\` WHERE \`aid\` = ?`, [adminId])

			return rows
		} catch (err) {
			error(`[DB] Error while getting log: ${err}`)
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
			error(`[DB] Error while creating log: ${err}`)
			return false
		}
	},
	count: async (query?: string): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>(
				'SELECT COUNT(*) FROM `cssp_logs` ' +
					(query ? `WHERE title LIKE '%${query}%' OR message LIKE '%${query}%'` : '')
			)

			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			error(`[DB] Error while counting logs: ${err}`)
			return 0
		}
	},
}

export default Logs
