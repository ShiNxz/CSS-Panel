import type { NextApiHandler } from 'next'
import { exec } from 'child_process'

const handler: NextApiHandler = (req, res) => {
	exec('npm run update', (err, stdout, stderr) => {
		if (err) {
			// node couldn't execute the command
			return res.status(500).json({ stderr: err })
		}

		// the *entire* stdout and stderr (buffered)
		return res.status(200).json({ stdout: stdout, stderr: stderr })
	})
}

export default handler
