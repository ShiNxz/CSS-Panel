import type { NextApiHandler } from 'next'
import envSchema from '@/utils/lib/Env'
import fs from 'fs'
import path from 'path'
import { GetSteamUser } from 'steam-api-sdk'
import query from '@/utils/functions/db'

const handler: NextApiHandler = async (req, res) => {
	const { method } = req

	switch (method) {
		case 'POST':
			try {
				const settings = envSchema.parse(req.body)

				// Generate a random string
				settings.SESSION_SECRET =
					Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

				// Set the .env file
				Object.keys(settings).forEach((key) => {
					// @ts-ignore
					SetENV(key, settings[key])
				})

				// Setup the master admin
				const user = await GetSteamUser(settings.MASTER_ADMIN)
				if (!user) throw new Error('Invalid master admin SteamID64!')

				await query?.admins.create({
					player_steamid: user.steamid,
					player_name: user.personaname,
					flags: ['@css/root', '@web/root'],
					immunity: '100',
					server_id: null,
				})

				log('Setup complete!')

				res.status(200).send('ok')
				process.exit(1)
			} catch (e) {
				error(e)

				return res.status(500).json(e)
			}
		default:
			return res.status(405).end()
	}
}

const SetENV = (key: string, value: string) => {
	const dotenv = path.join(process.cwd(), '.env')

	// Check if .env file exists
	if (!fs.existsSync(dotenv)) {
		// File does not exist, create it
		fs.writeFileSync(dotenv, '')
	}

	// Read current .env
	let env = fs.readFileSync('.env', 'utf8')

	// Check if key already exists
	const regex = new RegExp(`^${key}=.*$`, 'm')
	if (regex.test(env)) {
		// Key exists, update it
		env = env.replace(regex, `${key}=${value}`)
	} else {
		// Key doesn't exist, append it
		env += `${key}=${value}\n`
	}

	fs.writeFileSync('.env', env)
}

export default handler
