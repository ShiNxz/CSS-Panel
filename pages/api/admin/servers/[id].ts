import type { NextApiRequest, NextApiResponse } from 'next'
import query from '@/utils/functions/db'
import router from '@/lib/Router'
import serverSchema from '@/utils/schemas/serverSchema'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await router.run(req, res)

	const { method } = req

	const { id } = req.query as { id: string }
	const server = await query.servers.getById(Number(id))
	if (!server) return res.status(404).json({ message: 'Server not found' })

	switch (method) {
		case 'PUT': {
			const { hostname, address } = serverSchema.parse(req.body)

			const server = await query.servers.update({ id: Number(id), hostname, address })

			return res.status(201).json(server)
		}

		case 'DELETE': {
			try {
				const admins = await query.admins.getByServerId(Number(id))
				if (admins.length > 0) return res.status(403).send('Please remove all admins from this server first')

				await query.servers.delete(Number(id))

				return res.status(200).send('Server deleted')
			} catch (error) {
				return res.status(500).json({ message: 'Error while deleting server', error })
			}
		}

		default: {
			return res.status(405).json({ message: 'Method not allowed' })
		}
	}
}

export default handler
