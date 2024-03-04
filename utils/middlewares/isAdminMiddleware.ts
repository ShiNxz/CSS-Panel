import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Admin } from '../types/db/plugin'
import type { Flag } from '../types/db/css'
import query from '@/func/db'

/**
 * Check if user is admin and has the required flag
 */
const isAdminMiddleware = (
	req: NextApiRequest,
	res: NextApiResponse,
	flags?: Flag[],
	filter: Filter = 'AND'
): Promise<SA_Admin> => {
	return new Promise(async (resolve, reject) => {
		if (!query) return res.status(500).json({ message: 'Database not connected' })

		if (!req.user) return reject(res.status(400).json({ success: false, error: 'Protected Route' }))

		const steam64 = req.user.id

		const admin = await query.admins.getBySteam64(steam64)
		if (!admin) return reject(res.status(401).json({ success: false, error: 'Protected Route' }))

		if (!flags) return resolve(admin)

		let adminFlags: Flag[] | null = null

		if (typeof admin.flags === 'object') {
			adminFlags = admin.flags
		} else {
			const group = await query.adminGroups.getById(admin.flags)
			if (group) adminFlags = group.flags
		}

		if (adminFlags === null) return reject(res.status(403).json({ success: false, error: 'Protected Route' }))

		let hasFlag: boolean

		if (filter === 'AND') {
			hasFlag = flags.every((flag) => adminFlags!.includes(flag))
		} else {
			hasFlag = flags.some((flag) => adminFlags!.includes(flag))
		}

		if (!hasFlag) return reject(res.status(403).json({ success: false, error: 'Protected Route' }))

		resolve(admin)
	})
}

/**
 * Filter type
 * AND: All flags must be present
 * OR: At least one flag must be present
 */
type Filter = 'AND' | 'OR'

export default isAdminMiddleware
