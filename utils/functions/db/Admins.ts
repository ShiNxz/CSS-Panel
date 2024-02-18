import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_Admin } from '@/utils/types/db/plugin'
import type { Flag } from '@/utils/types/db/css'
import db from '@/utils/lib/Mysql'

const fields = ['player_steamid', 'player_name', 'flags', 'immunity', 'server_id', 'ends']

interface SA_AdminDB extends SA_Admin, RowDataPacket {}

const Admins = {
	getAll: async (page: number = 1, limit: number = 100000): Promise<SA_Admin[]> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>(
				`SELECT * FROM \`sa_admins\` LIMIT ${limit} OFFSET ${(page - 1) * limit}`
			)

			rows.forEach((admin) => {
				if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
				if (admin.flags && !(admin.flags as string).startsWith('#')) {
					admin.flags = (admin.flags as string).split(',') as Flag[]
				}
			})

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

			const admin = rows[0]
			if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
			if (admin.flags && !(admin.flags as string).startsWith('#')) {
				admin.flags = (admin.flags as string).split(',') as Flag[]
			}

			return admin
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	getBySteam64: async (steam64: string): Promise<SA_Admin | null> => {
		try {
			const [rows] = await db.query<SA_AdminDB[]>('SELECT * FROM `sa_admins` WHERE player_steamid = ?', [steam64])
			if (!rows.length || rows.length < 1) return null

			const admin = rows[0]
			if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
			if (admin.flags && !(admin.flags as string).startsWith('#')) {
				admin.flags = (admin.flags as string).split(',') as Flag[]
			}

			return admin
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	getByServerId: async (serverId: string): Promise<SA_Admin[]> => {
		try {
			// Since the serverId is a string, and the server_id is a string[] | null, we need to check if the serverId is in the array
			const [rows] = await db.query<SA_AdminDB[]>(
				`SELECT * FROM \`sa_admins\` WHERE FIND_IN_SET(?, \`server_id\`)`,
				[serverId]
			)
			if (!rows.length || rows.length < 1) return []

			rows.forEach((admin) => {
				if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
				if (admin.flags && !(admin.flags as string).startsWith('#')) {
					admin.flags = (admin.flags as string).split(',') as Flag[]
				}
			})

			return rows
		} catch (err) {
			console.error(`[DB] Error while getting all admins: ${err}`)
			return []
		}
	},
	getBySteam64AndServerId: async (steam64: string, serverId: number): Promise<SA_Admin | null> => {
		try {
			// Since the serverId is a string, and the server_id is a string[] | null, we need to check if the serverId is in the array
			const [rows] = await db.query<SA_AdminDB[]>(
				`SELECT * FROM \`sa_admins\` WHERE player_steamid = ? AND FIND_IN_SET(?, \`server_id\`)`,
				[steam64, serverId]
			)
			if (!rows.length || rows.length < 1) return null

			rows.forEach((admin) => {
				if (admin.server_id) admin.server_id = (admin.server_id as unknown as string).split(',')
				if (admin.flags && !(admin.flags as string).startsWith('#')) {
					admin.flags = (admin.flags as string).split(',') as Flag[]
				}
			})

			return rows[0] || null
		} catch (err) {
			console.error(`[DB] Error while getting the admin: ${err}`)
			return null
		}
	},
	create: async ({ player_steamid, player_name, flags, immunity, server_id }: SA_Admin): Promise<number | null> => {
		try {
			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO \`sa_admins\` (${fields.join(', ')}, created) VALUES (${fields
					.map(() => '?')
					.join(', ')}, NOW())`,
				[
					player_steamid,
					player_name,
					typeof flags === 'string' ? flags : flags.join(','),
					immunity,
					server_id && server_id.join(','),
					null,
				]
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
				[
					player_steamid,
					player_name,
					typeof flags === 'string' ? flags : flags.join(','),
					immunity,
					server_id && server_id.join(','),
					null,
					id,
				]
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
