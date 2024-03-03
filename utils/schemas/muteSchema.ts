import { z } from 'zod'

export const typeSchema = z.enum(['GAG', 'MUTE', 'SILENCE'])

const muteSchema = z.object({
	player_steamid: z.string(),
	reason: z.string().min(3),
	duration: z.string(),
	comment: z.string().optional(),
	type: typeSchema,
})

export default muteSchema
