import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import settingsSchema from '@/utils/schemas/settings'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const isAdmin = await isAdminMiddleware(req, res, ['@css/root'])
	if (!isAdmin) return

	const { method } = req

	switch (method) {
		case 'GET': {
			const settings = await query.settings.getAll(false)

			return res.status(200).json(settings)
		}

		case 'POST': {
			const settings = settingsSchema.parse(req.body)

			await query.settings.update(settings)

			query.logs.create('Settings updated', `Settings updated by ${req.user?.displayName}`, req.user?.id)

			return res.status(200).json({ message: 'Settings updated' })
		}
	}
}

export default handler
