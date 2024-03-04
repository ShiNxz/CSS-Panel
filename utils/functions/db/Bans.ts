import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_Ban } from '@/utils/types/db/plugin'
import db from '@/utils/lib/Mysql'

interface SA_BansDB extends SA_Ban, RowDataPacket {}

const Bans = {
	getAll: async (page: number, limit: number): Promise<SA_Ban[]> => {
		try {
			const [rows] = await db.query<SA_BansDB[]>(
				`SELECT * FROM \`sa_bans\` ORDER BY \`id\` DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)

			return rows
		} catch (err) {
			error(`[DB] Error while getting all bans: ${err}`)
			return []
		}
	},
	getById: async (banId: number): Promise<SA_Ban | null> => {
		try {
			const [rows] = await db.query<SA_BansDB[]>('SELECT * FROM `sa_bans` WHERE id = ?', [banId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			error(`[DB] Error while getting all bans: ${err}`)
			return null
		}
	},
	create: async (props: Partial<SA_Ban>): Promise<number | null> => {
		const keys = Object.keys(props)
		const values = Object.values(props)

		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO \`sa_bans\` (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`,
				values
			)

			return rows.insertId
		} catch (err) {
			error(`[DB] Error while creating bans: ${err}`)
			return null
		}
	},
	update: async (id: number, props: Partial<SA_Ban>): Promise<boolean> => {
		try {
			const keys = Object.keys(props)

			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE \`sa_bans\` SET ${keys.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[...Object.values(props), id]
			)

			return rows.affectedRows > 0
		} catch (err) {
			error(`[DB] Error while updating bans: ${err}`)
			return false
		}
	},
	delete: async (banId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_bans` WHERE id = ?', [banId])

			return rows.affectedRows > 0
		} catch (err) {
			error(`[DB] Error while deleting ban: ${err}`)
			return false
		}
	},
	count: async (): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_bans`')
			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			error(`[DB] Error while counting bans: ${err}`)
			return 0
		}
	},
}

export default Bans
