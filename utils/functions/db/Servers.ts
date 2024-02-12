import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_Server } from '@/utils/types/db/plugin'
import { z } from 'zod'
import db from '@/utils/lib/Mysql'
import serverSchema from '@/utils/schemas/serverSchema'

interface SA_ServerDB extends SA_Server, RowDataPacket {}

const Servers = {
	getAll: async (): Promise<SA_Server[]> => {
		try {
			const [rows] = await db.query<SA_ServerDB[]>('SELECT * FROM `sa_servers`')
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all servers: ${err}`)
			return []
		}
	},
	getAllSafe: async (): Promise<SA_Server[]> => {
		try {
			const [rows] = await db.query<SA_ServerDB[]>('SELECT id, hostname, address FROM `sa_servers`')
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all servers: ${err}`)
			return []
		}
	},
	getById: async (serverId: number): Promise<SA_Server | null> => {
		try {
			const [rows] = await db.query<SA_ServerDB[]>('SELECT * FROM `sa_servers` WHERE id = ?', [serverId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting all servers: ${err}`)
			return null
		}
	},
	create: async ({ hostname, address }: z.infer<typeof serverSchema>): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				'INSERT INTO `sa_servers` (hostname, address) VALUES(?, ?)',
				[hostname, address]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating server: ${err}`)
			throw err
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
			throw err
		}
	},
	delete: async (serverId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_servers` WHERE id = ?', [serverId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting server: ${err}`)
			throw err
		}
	},
	count: async (): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_admins`')
			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			console.error(`[DB] Error while counting admins: ${err}`)
			return 0
		}
	},
}

export default Servers
