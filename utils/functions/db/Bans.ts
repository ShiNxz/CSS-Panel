import type { ResultSetHeader } from 'mysql2'
import type { DB_Count, SA_Ban } from '@/utils/types/db/simpleadmin'
import db from '@/utils/lib/Mysql'

const fields = [
	'player_steamid',
	'player_name',
	'player_ip',
	'admin_steamid',
	'admin_name',
	'reason',
	'duration',
	'ends',
	'created',
	'server_id',
	'status',
]

const Bans = {
	getAll: async (page: number, limit: number): Promise<SA_Ban[]> => {
		try {
			const [rows] = await db.query<SA_Ban[]>(
				`SELECT * FROM \`sa_bans\` LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all bans: ${err}`)
			return []
		}
	},
	getById: async (banId: number): Promise<SA_Ban | null> => {
		try {
			const [rows] = await db.query<SA_Ban[]>('SELECT * FROM `sa_bans` WHERE id = ?', [banId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting all bans: ${err}`)
			return null
		}
	},
	create: async ({
		player_steamid,
		player_name,
		player_ip,
		admin_steamid,
		admin_name,
		reason,
		duration,
		ends,
		created,
		server_id,
		status,
	}: SA_Ban): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO 'sa_bans' (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
				[
					player_steamid,
					player_name,
					player_ip,
					admin_steamid,
					admin_name,
					reason,
					duration,
					ends,
					created,
					server_id,
					status,
				]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating bans: ${err}`)
			return null
		}
	},
	update: async ({
		id,
		player_steamid,
		player_name,
		player_ip,
		admin_steamid,
		admin_name,
		reason,
		duration,
		ends,
		created,
		server_id,
		status,
	}: SA_Ban): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE 'sa_bans' SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[
					player_steamid,
					player_name,
					player_ip,
					admin_steamid,
					admin_name,
					reason,
					duration,
					ends,
					created,
					server_id,
					status,
					id,
				]
			)

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while updating bans: ${err}`)
			return false
		}
	},
	delete: async (banId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_bans` WHERE id = ?', [banId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting ban: ${err}`)
			return false
		}
	},
	count: async (): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_bans`')
			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			console.error(`[DB] Error while counting bans: ${err}`)
			return 0
		}
	},
}

export default Bans
