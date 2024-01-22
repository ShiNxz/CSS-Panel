import { NextApiRequest, NextApiResponse } from 'next'
import Admin from '../models/Admin'

const isAdminMiddleware = (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		if (!req.user) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		const isAdmin = await Admin.findOne({ userId: req.user.id })

		if (!isAdmin) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		resolve(true)
	})
}

export default isAdminMiddleware
