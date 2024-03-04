import { z } from 'zod'
import { flagsSchema } from './adminSchema'

const adminGroupSchema = z.object({
	id: z
		.string()
		.min(3)
		.refine((v) => v.startsWith('#'), { message: 'The id must start with #' }),
	name: z.string().min(3),
	flags: z.array(flagsSchema),
	immunity: z.string().min(0).max(100),
})

export default adminGroupSchema
