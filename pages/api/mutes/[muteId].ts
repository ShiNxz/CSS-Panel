import type { NextApiRequest, NextApiResponse } from 'next'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import {
	commentSchema,
	editMuteSchema,
	muteActionsSchema,
	reMuteSchema,
	unMuteSchema,
} from '@/app/UI/Layouts/Main/Mutes/Store'
import Log from '@/utils/lib/Logs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const isAdmin = await isAdminMiddleware(req, res)
	if (!isAdmin) return

	switch (method) {
		case 'POST': {
			try {
				const { muteId } = req.query as { muteId: string }
				const dbMute = await query.mutes.getById(Number(muteId))
				if (!dbMute) return res.status(404).json({ error: 'Mute not found' })

				const action = muteActionsSchema.parse(req.body.action)
				const details = req.body.details

				switch (action) {
					case 'unmute': {
						const { reason } = unMuteSchema.parse(details)
						await query.mutes.update(Number(muteId), { status: 'UNMUTED', unmute_reason: reason })

						break
					}

					case 'remute': {
						const { reason, duration, type } = reMuteSchema.parse(details)

						const created = new Date()
						const ends = new Date(Date.now() + Number(duration) * 60000)

						await query.mutes.update(Number(muteId), {
							status: 'ACTIVE',
							reason,
							created,
							ends,
							duration: Number(duration),
							admin_name: isAdmin.player_name,
							admin_steamid: isAdmin.player_steamid,
							unmute_reason: null,
							type,
						})

						break
					}

					case 'edit': {
						const { reason, duration, type } = editMuteSchema.parse(details)

						const createdDate = new Date(dbMute.created)
						const ends = new Date(createdDate.getTime() + Number(duration) * 60000)

						const status = ends > new Date() ? 'ACTIVE' : 'EXPIRED'

						await query.mutes.update(Number(muteId), {
							reason,
							ends,
							duration: Number(duration),
							status,
							type,
						})

						break
					}

					case 'comment': {
						const { comment } = commentSchema.parse(details)

						await query.mutes.update(Number(muteId), {
							comment,
						})

						break
					}

					case 'delete': {
						await query.mutes.delete(Number(muteId))

						break
					}
				}

				Log(
					'Mute Action',
					`Admin ${req.user?.displayName} (${req.user?.id}) performed action '${action}' on mute #${muteId}`,
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
