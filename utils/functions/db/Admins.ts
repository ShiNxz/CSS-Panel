import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_Admin } from '@/utils/types/db/simpleadmin'
import db from '@/utils/lib/Mysql'

const fields = ['player_steamid', 'player_name', 'flags', 'immunity', 'server_id', 'ends']

interface SA_AdminDB extends SA_Admin, RowDataPacket {}

const Admins = {
	getAll: async (page: number = 1, limit: number = 100000): Promise<SA_Admin[]> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>(
				`SELECT * FROM \`sa_admins\` LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all admins: ${err}`)
			return []
		}
	},
	getById: async (adminId: number): Promise<SA_Admin | null> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>('SELECT * FROM `sa_admins` WHERE id = ?', [adminId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	getBySteam64: async (steam64: string): Promise<SA_Admin | null> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>('SELECT * FROM `sa_admins` WHERE player_steamid = ?', [steam64])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	getByServerId: async (serverId: number): Promise<SA_Admin[]> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>('SELECT * FROM `sa_admins` WHERE server_id = ?', [serverId])
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all admins: ${err}`)
			return []
		}
	},
	create: async ({ player_steamid, player_name, flags, immunity, server_id }: SA_Admin): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO \`sa_admins\` (${fields.join(', ')}, created) VALUES (${fields
					.map(() => '?')
					.join(', ')}, NOW())`,
				[player_steamid, player_name, flags, immunity, server_id, null]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating sa_admins: ${err}`)
			throw err
		}
	},
	update: async ({ id, player_steamid, player_name, flags, immunity, server_id }: SA_Admin): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE \`sa_admins\` SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[player_steamid, player_name, flags, immunity, server_id, null, id]
			)

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while updating admin: ${err}`)
			throw err
		}
	},
	delete: async (adminId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_admins` WHERE id = ?', [adminId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting admin: ${err}`)
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

export default Admins
