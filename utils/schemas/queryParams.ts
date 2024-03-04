import z from 'zod'

const queryParamsSchema = z.object({
	page: z
		.string()
		.default('1')
		.refine((val) => !isNaN(Number(val)), {
			message: 'Invalid page query',
		})
		.transform((val) => Number(val)),
	rows: z
		.string()
		.default('10')
		.refine((val) => !isNaN(Number(val)), {
			message: 'Invalid page query',
		})
		.refine((val) => Number(val) < 50, {
			message: 'Rows must be less than 50',
		})
		.transform((val) => Number(val)),
	query: z.string().optional(),
})

export default queryParamsSchema
