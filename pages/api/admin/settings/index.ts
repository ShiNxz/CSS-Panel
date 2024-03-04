import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import settingsSchema from '@/utils/schemas/settings'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@css/root'], 'OR')
	if (!isAdmin) return

	const { method } = req

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'GET': {
			const settings = await query.settings.getAll(false)

			return res.status(200).json(settings)
		}

		case 'POST': {
			const settings = settingsSchema.parse(req.body)

			await query.settings.update(settings)

			Log(
				'Settings update',
				`Admin ${req.user?.displayName} (${req.user?.id}) updated the panel settings`,
				req.user?.id
			)

			return res.status(200).json({ message: 'Settings updated' })
		}
	}
}

export default handler
