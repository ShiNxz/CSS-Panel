import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { SA_ChatLog } from '@/utils/types/db/plugin'
import db from '@/utils/lib/Mysql'

interface SA_ChatLogsDB extends SA_ChatLog, RowDataPacket {}

const ChatLogs = {
	getAllByServer: async (serverId: number, limit: number = 10): Promise<SA_ChatLog[]> => {
		try {
			const [rows] = await db.query<SA_ChatLogsDB[]>(
				`SELECT * FROM \`sa_chatlogs\` WHERE serverId = ? ORDER BY \`id\` ASC LIMIT ${limit}`,
				[serverId]
			)

			return rows
		} catch (err) {
			error(`[DB] Error while getting all chat logs: ${err}`)
			return []
		}
	},
	getAllByServerAndMinutes: async (serverId: number, minutes: number): Promise<SA_ChatLog[]> => {
		try {
			const [rows] = await db.query<SA_ChatLogsDB[]>(
				`SELECT * FROM \`sa_chatlogs\` WHERE serverId = ? AND \`created\` > DATE_SUB(NOW(), INTERVAL ? MINUTE) ORDER BY \`id\` ASC`,
				[serverId, minutes]
			)

			return rows
		} catch (err) {
			error(`[DB] Error while getting all chat logs: ${err}`)
			return []
		}
	},
	create: async (props: Partial<SA_ChatLog>) => {
		const keys = Object.keys(props)
		const values = Object.values(props)

		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO \`sa_chatlogs\` (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`,
				values
			)

			return rows.insertId
		} catch (err) {
			error(`[DB] Error while creating chatLog: ${err}`)
			return null
		}
	},
}

export default ChatLogs
