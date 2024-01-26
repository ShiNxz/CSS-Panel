import { z } from 'zod'

export const adminFlags = [
	'@css/reservation',
	'@css/generic',
	'@css/kick',
	'@css/ban',
	'@css/unban',
	'@css/vip',
	'@css/slay',
	'@css/changemap',
	'@css/cvar',
	'@css/config',
	'@css/chat',
	'@css/vote',
	'@css/password',
	'@css/rcon',
	'@css/cheats',
	'@css/root',
]

const flagsSchema = z.string().regex(/^(@css\/[a-z]+)(\s+@css\/[a-z]+)*$/)

const adminSchema = z.object({
	player_name: z
		.string()
		.min(3)
		.regex(/^[\w\s]+$/),
	player_steamid: z.string().regex(/^7656119\d{10}$/),
	server_id: z.number().nullable(),
	flags: flagsSchema,
	immunity: z.string().min(0).max(100),
})

export default adminSchema
