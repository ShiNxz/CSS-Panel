import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_Mute } from '@/utils/types/db/plugin'
import db from '@/utils/lib/Mysql'

const fields = [
	'player_steamid',
	'player_name',
	'admin_steamid',
	'admin_name',
	'reason',
	'duration',
	'ends',
	'created',
	'server_id',
	'status',
	'type',
]

interface SA_MutesDB extends SA_Mute, RowDataPacket {}

const Mutes = {
	getAll: async (page: number, limit: number): Promise<SA_Mute[]> => {
		try {
			const [rows] = await db.query<SA_MutesDB[]>(
				`SELECT * FROM \`sa_mutes\` ORDER BY \`id\` DESC LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)
			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all mutes: ${err}`)
			return []
		}
	},
	getById: async (muteId: number): Promise<SA_Mute | null> => {
		try {
			const [rows] = await db.query<SA_MutesDB[]>('SELECT * FROM `sa_mutes` WHERE id = ?', [muteId])
			if (!rows.length || rows.length < 1) return null
			return rows[0]
		} catch (err) {
			console.error(`[DB] Error while getting all mutes: ${err}`)
			return null
		}
	},
	create: async ({
		player_steamid,
		player_name,
		admin_steamid,
		admin_name,
		reason,
		duration,
		ends,
		created,
		server_id,
		status,
		type,
	}: SA_Mute): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO 'sa_mutes' (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`,
				[
					player_steamid,
					player_name,
					admin_steamid,
					admin_name,
					reason,
					duration,
					ends,
					created,
					server_id,
					status,
					type,
				]
			)

			return rows.insertId
		} catch (err) {
			console.error(`[DB] Error while creating mutes: ${err}`)
			return null
		}
	},
	update: async ({
		id,
		player_steamid,
		player_name,
		admin_steamid,
		admin_name,
		reason,
		duration,
		ends,
		created,
		server_id,
		status,
		type,
	}: SA_Mute): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE 'sa_mutes' SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[
					player_steamid,
					player_name,
					admin_steamid,
					admin_name,
					reason,
					duration,
					ends,
					created,
					server_id,
					status,
					type,
					id,
				]
			)

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while updating mutes: ${err}`)
			return false
		}
	},
	delete: async (muteId: number): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_mutes` WHERE id = ?', [muteId])

			return rows.affectedRows > 0
		} catch (err) {
			console.error(`[DB] Error while deleting mute: ${err}`)
			return false
		}
	},
	count: async (): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_mutes`')
			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			console.error(`[DB] Error while counting mutes: ${err}`)
			return 0
		}
	},
}

export default Mutes
