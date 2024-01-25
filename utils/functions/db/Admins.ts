import type { ResultSetHeader } from 'mysql2'
import type { DB_Count, SA_Admin } from '@/utils/types/db/simpleadmin'
import db from '@/utils/lib/Mysql'

const fields = ['player_steamid', 'player_name', 'flags', 'immunity', 'server_id', 'ends']

const Admins = {
	getAll: async (page: number, limit: number): Promise<SA_Admin[]> => {
		try {
			const [rows] = await db.query<SA_Admin[]>(
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
			const [rows] = await db.query<SA_Admin[]>('SELECT * FROM `sa_admins` WHERE id = ?', [adminId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	getBySteam64: async (steam64: string): Promise<SA_Admin | null> => {
		try {
			const [rows] = await db.query<SA_Admin[]>('SELECT * FROM `sa_admins` WHERE player_steamid = ?', [steam64])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	create: async ({
		player_steamid,
		player_name,
		flags,
		immunity,
		server_id,
		ends,
	}: SA_Admin): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO 'sa_admins' (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
				[player_steamid, player_name, flags, immunity, server_id, ends]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating sa_admins: ${err}`)
			return null
		}
	},
	update: async ({
		id,
		player_steamid,
		player_name,
		flags,
		immunity,
		server_id,
		ends,
	}: SA_Admin): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE 'sa_admins' SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[player_steamid, player_name, flags, immunity, server_id, ends, id]
			)

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while updating admin: ${err}`)
			return false
		}
	},
	delete: async (adminId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_admins` WHERE id = ?', [adminId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting admin: ${err}`)
			return false
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
