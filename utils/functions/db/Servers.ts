import type { ResultSetHeader } from 'mysql2'
import type { SA_Server } from '@/utils/types/db/simpleadmin'
import db from '@/utils/lib/Mysql'

const Servers = {
	getAll: async (): Promise<SA_Server[]> => {
		try {
			const [rows] = await db.query<SA_Server[]>('SELECT * FROM `sa_servers`')
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all servers: ${err}`)
			return []
		}
	},
	getById: async (serverId: number): Promise<SA_Server | null> => {
		try {
			const [rows] = await db.query<SA_Server[]>('SELECT * FROM `sa_servers` WHERE id = ?', [serverId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting all servers: ${err}`)
			return null
		}
	},
	create: async ({ hostname, address }: SA_Server): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				'INSERT INTO `sa_servers` (hostname, address) VALUES(?, ?)',
				[hostname, address]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating server: ${err}`)
			return null
		}
	},
	update: async ({ id, hostname, address }: SA_Server): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				'UPDATE `sa_servers` SET hostname = ?, address = ? WHERE id = ?',
				[hostname, address, id]
			)

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while updating server: ${err}`)
			return false
		}
	},
	delete: async (serverId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_servers` WHERE id = ?', [serverId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting server: ${err}`)
			return false
		}
	},
}

export default Servers
