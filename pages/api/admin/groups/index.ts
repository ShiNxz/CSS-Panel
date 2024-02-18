import type { NextApiRequest, NextApiResponse } from 'next'
import type { Flag } from '@/utils/types/db/css'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import adminGroupSchema from '@/utils/schemas/adminGroupSchema'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res, ['@css/root'])
	if (!isAdmin) return

	switch (method) {
		case 'GET': {
			const groups = await query.adminGroups.getAll()

			return res.status(200).json(groups)
		}

		case 'POST': {
			const { id, name, flags, immunity } = adminGroupSchema.parse(req.body)

			const userImmunity = isAdmin.immunity
			if (Number(immunity) >= Number(userImmunity))
				return res.status(403).json({ message: 'You cannot create an admin group with higher immunity than yours' })

			const group = await query.adminGroups.create({
				id: id as `#${string}`,
				name,
				flags: flags as Flag[],
				immunity,
			})

			return res.status(201).json(group)
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
