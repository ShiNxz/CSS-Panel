import { NextApiRequest, NextApiResponse } from 'next'
import Staff from '@/models/Staff'

const isStaffMiddleware = (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		if (!req.user) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		const isStaff = await Staff.findOne({ status: 1, userId: req.user.id})

		if (!isStaff) return reject(res.status(200).json({ success: false, error: 'error to auth' }))

		resolve(true)
	})
}

export default isStaffMiddleware
