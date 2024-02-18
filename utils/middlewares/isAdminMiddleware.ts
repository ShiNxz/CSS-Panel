import type { NextApiRequest, NextApiResponse } from 'next'
import type { SA_Admin } from '../types/db/plugin'
import type { Flag } from '../types/db/css'
import query from '@/func/db'

/**
 * Check if user is admin and has the required flag
 */
const isAdminMiddleware = (req: NextApiRequest, res: NextApiResponse, flags?: Flag[]): Promise<SA_Admin> => {
	return new Promise(async (resolve, reject) => {
		if (!req.user) return reject(res.status(400).json({ success: false, error: 'Protected Route' }))

		const steam64 = req.user.id

		const admin = await query.admins.getBySteam64(steam64)
		if (!admin) return reject(res.status(401).json({ success: false, error: 'Protected Route' }))

		if (!flags) return resolve(admin)

		const adminFlags = admin.flags

		const hasFlag = flags.some((flag) => adminFlags.includes(flag))
		if (!hasFlag) return reject(res.status(403).json({ success: false, error: 'Protected Route' }))

		resolve(admin)
	})
}

export default isAdminMiddleware
