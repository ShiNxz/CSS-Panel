import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import type { DB_Count, SA_AdminGroup } from '@/utils/types/db/plugin'
import type { Flag } from '@/utils/types/db/css'
import db from '@/utils/lib/Mysql'

interface SA_AdminGroupDB extends SA_AdminGroup, RowDataPacket {}

const Admins = {
	getAll: async (): Promise<SA_AdminGroup[]> => {
		try {
			const [rows] = await db.query<SA_AdminGroupDB[]>(`SELECT * FROM \`sa_admins_groups\``)

			rows.forEach((group) => {
				group.flags = (group.flags as unknown as string).split(',') as Flag[]
			})

			return rows
		} catch (err) {
			error(`[DB] Error while getting all admin groups: ${err}`)
			return []
		}
	},
	getById: async (groupId: string): Promise<SA_AdminGroup | null> => {
		try {
			const [rows] = await db.query<SA_AdminGroupDB[]>('SELECT * FROM `sa_admins_groups` WHERE id = ?', [groupId])
			if (!rows.length || rows.length < 1) return null

			const group = rows[0]
			group.flags = (group.flags as unknown as string).split(',') as Flag[]

			return group
		} catch (err) {
			error(`[DB] Error while getting the admin group: ${err}`)
			return null
		}
	},
	create: async (props: SA_AdminGroup): Promise<number | null> => {
		try {
			const keys = Object.keys(props)
			const values = Object.values(props)

			const newValues = values.map((v) => (Array.isArray(v) ? v.join(',') : v))

			const [rows] = await db.query<ResultSetHeader>(
				`INSERT INTO \`sa_admins_groups\` (${keys.join(', ')}, created) VALUES (${keys
					.map(() => '?')
					.join(', ')}, NOW())`,
				newValues
			)

			return rows.insertId
		} catch (err) {
			error(`[DB] Error while creating admin group: ${err}`)
			throw err
		}
	},
	update: async (id: string, props: Partial<SA_AdminGroup>): Promise<boolean> => {
		try {
			const keys = Object.keys(props)
			const values = Object.values(props)

			const newValues = values.map((v) => (Array.isArray(v) ? v.join(',') : v))

			const [rows] = await db.query<ResultSetHeader>(
				`UPDATE \`sa_admins_groups\` SET ${keys.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`,
				[...newValues, id]
			)

			return rows.affectedRows > 0
		} catch (err) {
			error(`[DB] Error while updating admin group: ${err}`)
			throw err
		}
	},
	delete: async (groupId: string): Promise<boolean> => {
		try {
			const [rows] = await db.query<ResultSetHeader>('DELETE FROM `sa_admins_groups` WHERE id = ?', [groupId])

			return rows.affectedRows > 0
		} catch (err) {
			error(`[DB] Error while deleting admin group: ${err}`)
			throw err
		}
	},
	count: async (): Promise<number> => {
		try {
			const [rows] = await db.query<DB_Count[]>('SELECT COUNT(*) FROM `sa_admins_groups`')
			return rows?.[0]?.['COUNT(*)']
		} catch (err) {
			error(`[DB] Error while counting admin groups: ${err}`)
			return 0
		}
	},
}

export default Admins
