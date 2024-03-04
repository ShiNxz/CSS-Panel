import { z } from 'zod'

// either player_steamid or player_ip
const banSchema = z.object({
	player_steamid: z.string().optional(),
	player_ip: z.string().optional(),
	reason: z.string().min(3),
	duration: z.string(),
	comment: z.string().optional(),
})

export default banSchema
