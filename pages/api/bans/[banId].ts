import type { NextApiRequest, NextApiResponse } from 'next'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import {
	banActionsSchema,
	commentSchema,
	editBanSchema,
	reBanSchema,
	unBanSchema,
} from '@/app/UI/Layouts/Main/Bans/Store'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res)
	if (!isAdmin) return

	if (!query) return res.status(500).json({ message: 'Database not connected' })

	switch (method) {
		case 'POST': {
			try {
				const { banId } = req.query as { banId: string }
				const dbBan = await query.bans.getById(Number(banId))
				if (!dbBan) return res.status(404).json({ error: 'Ban not found' })

				const action = banActionsSchema.parse(req.body.action)
				const details = req.body.details

				switch (action) {
					case 'unban': {
						const { reason } = unBanSchema.parse(details)
						await query.bans.update(Number(banId), { status: 'UNBANNED', unban_reason: reason })

						break
					}

					case 'reban': {
						const { reason, duration } = reBanSchema.parse(details)

						const created = new Date()
						const ends = new Date(Date.now() + Number(duration) * 60000)

						await query.bans.update(Number(banId), {
							status: 'ACTIVE',
							reason,
							created,
							ends,
							duration: Number(duration),
							admin_name: isAdmin.player_name,
							admin_steamid: isAdmin.player_steamid,
							unban_reason: null,
						})

						break
					}

					case 'edit': {
						const { reason, duration } = editBanSchema.parse(details)

						const createdDate = new Date(dbBan.created)
						const ends = new Date(createdDate.getTime() + Number(duration) * 60000)

						const status = ends > new Date() ? 'ACTIVE' : 'EXPIRED'

						await query.bans.update(Number(banId), {
							reason,
							ends,
							duration: Number(duration),
							status,
						})

						break
					}

					case 'comment': {
						const { comment } = commentSchema.parse(details)

						await query.bans.update(Number(banId), {
							comment,
						})

						break
					}

					case 'delete': {
						await query.bans.delete(Number(banId))

						break
					}
				}

				Log(
					'Ban Action',
					`Admin ${req.user?.displayName} (${req.user?.id}) performed action '${action}' on ban #${banId}`,
					req.user?.id
				)

				return res.status(200).json({ message: 'Message sent' })
			} catch (error) {
				return res.status(500).json({ error })
			}
		}
	}
}

export default handler
