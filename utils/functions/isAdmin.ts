import type { NextApiRequest } from 'next/types'
import query from './db'

const isAdmin = async (req: NextApiRequest) => {
	if (!req.user) return false

	const steam64 = req.user.id
	const admin = await query.admins.getBySteam64(steam64)

	return !!admin
}

export default isAdmin
