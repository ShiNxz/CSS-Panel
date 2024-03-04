import type { NextApiHandler } from 'next'
import { createConnection } from 'mysql2/promise'
import { dbSchema } from '@/utils/lib/Env'

const handler: NextApiHandler = async (req, res) => {
	const { method } = req

	switch (method) {
		case 'POST':
			try {
				const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } = dbSchema.parse(req.body)

				// Create a connection to the database
				const connection = await createConnection({
					host: DB_HOST,
					user: DB_USER,
					password: DB_PASSWORD,
					database: DB_DATABASE,
					port: parseInt(DB_PORT),
				})

				// If connection is successful, disconnect
				await connection.end()

				return res.status(200).send('ok')
			} catch (e) {
				error(e)

				return res.status(500).json(e)
			}
		default:
			return res.status(405).end()
	}
}

export default handler
