import type { NextApiHandler } from 'next'
import { exec } from 'child_process'
import router from '@/lib/Router'
import isAdminMiddleware from '@/utils/middlewares/isAdminMiddleware'

const handler: NextApiHandler = async (req, res) => {
	await router.run(req, res)

	const isAdmin = await isAdminMiddleware(req, res, ['@web/root', '@css/root'], 'OR')
	if (!isAdmin) return

	const { method } = req

	switch (method) {
		case 'POST':
			try {
				log('Updating the panel...')

				const pull = await execPromise('pnpm run pull')

				log('Panel updated!')

				return res.status(200).json(pull)
			} catch (e) {
				error(e)

				return res.status(500).json(e)
			}
		default:
			return res.status(405).end()
	}
}

const execPromise = (
	command: string
): Promise<{
	stdout: string
	stderr: string
}> =>
	new Promise(function (resolve) {
		exec(command, (error, stdout, stderr) => {
			if (error) {
				resolve({ stdout, stderr })
				return
			}

			resolve({ stdout, stderr })
		})
	})

export default handler
