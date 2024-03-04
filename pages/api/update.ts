import type { NextApiHandler } from 'next'
import { exec } from 'child_process'

const handler: NextApiHandler = async (req, res) => {
	try {
		log('Updating the panel...')

		const update = await execPromise('pnpm run update')
		console.log('update:', update)

		const pull = await execPromise('pnpm run pull')
		console.log('stderr:', pull)

		log('Panel updated!')

		return res.status(200).json({ update, pull })
	} catch (e) {
		error(e)

		return res.status(500).json(e)
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
