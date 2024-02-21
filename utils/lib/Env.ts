/**
 * This lib is used to get environment variables from .env file and check if they are valid
 */

import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

const envSchema = z.object({
	STEAM_API_KEY: z.string().min(1),
	SESSION_SECRET: z.string().min(1),
	DOMAIN: z.string().min(1),
	DB_HOST: z.string().min(1),
	DB_USER: z.string().min(1),
	DB_PASSWORD: z.string().min(1),
	DB_DATABASE: z.string().min(1),
	DB_PORT: z.string().min(1),
})

export type Env = z.infer<typeof envSchema>

const CheckENV = () => {
	try {
		envSchema.parse(process.env)
	} catch (error) {
		const validationError = fromZodError(error as z.ZodError)

		console.log(
			`[ENV] .env file is missing or its missing one of the following values, please check .env.example file for more info:\n\n${validationError.toString()}\n\n`
		)

		process.exit(1)
	}
}

export default CheckENV
