import { z } from 'zod'

const serverSchema = z.object({
	address: z.string().refine((val) => val.includes(':'), {
		message: 'IP Address must include a port number',
	}),
	hostname: z.string().min(3),
})

export default serverSchema
