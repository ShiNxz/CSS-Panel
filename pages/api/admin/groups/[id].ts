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

	const { id } = req.query as { id: string }
	const adminGroup = await query.adminGroups.getById(`#${id}`)
	if (!adminGroup) return res.status(404).json({ message: 'Admin group not found' })

	switch (method) {
		case 'PUT': {
			const { id, name, flags, immunity } = adminGroupSchema.parse(req.body)

			const userImmunity = isAdmin.immunity
			if (Number(immunity) >= Number(userImmunity))
				return res
					.status(403)
					.json({ message: 'You cannot edit an admin group with higher immunity than yours' })

			const adminGroup = await query.adminGroups.update({
				id: id as `#${string}`,
				name,
				flags: flags as Flag[],
				immunity: immunity.toString() ?? 0,
			})

			return res.status(201).json(adminGroup)
		}

		case 'DELETE': {
			try {
				const adminGroup = await query.adminGroups.getById(`#${id}`)
				if (!adminGroup) return res.status(404).json({ message: 'Admin group not found' })

				const userImmunity = isAdmin.immunity
				if (Number(adminGroup.immunity) >= Number(userImmunity))
					return res
						.status(403)
						.json({ message: 'You cannot delete an admin group with higher immunity than yours' })

				await query.adminGroups.delete(`#${id}`)

				return res.status(201).send('Admin group deleted')
			} catch (error) {
				return res.status(500).json({ message: 'Error while deleting admin group', error })
			}
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
