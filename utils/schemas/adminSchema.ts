import type { Flag } from '../types/db/css'
import { z } from 'zod'

interface Flags {
	id: Flag
	description: string
}

export const FLAGS: Flags[] = [
	{
		id: '@css/reservation',
		description: 'Reserved slot access.',
	},
	{
		id: '@css/generic',
		description: 'Generic admin.',
	},
	{
		id: '@css/kick',
		description: 'Kick other players.',
	},
	{
		id: '@css/ban',
		description: 'Ban other players.',
	},
	{
		id: '@css/unban',
		description: 'Remove bans.',
	},
	{
		id: '@css/vip',
		description: 'General vip status.',
	},
	{
		id: '@css/slay',
		description: 'Slay/harm other players.',
	},
	{
		id: '@css/changemap',
		description: 'Change the map or major gameplay features.',
	},
	{
		id: '@css/cvar',
		description: 'Change most cvars.',
	},
	{
		id: '@css/config',
		description: 'Execute config files.',
	},
	{
		id: '@css/chat',
		description: 'Special chat privileges.',
	},
	{
		id: '@css/vote',
		description: 'Start or create votes.',
	},
	{
		id: '@css/password',
		description: 'Set a password on the server.',
	},
	{
		id: '@css/rcon',
		description: 'Use RCON commands.',
	},
	{
		id: '@css/cheats',
		description: 'Change sv_cheats or use cheating commands.',
	},
	{
		id: '@css/root',
		description: 'Magically enables all flags and ignores immunity values.',
	},
	{
		id: '@web/root',
		description: 'Web panel root access.',
	},
	{
		id: '@web/admins',
		description: 'Manage web admins.',
	},
	{
		id: '@web/admingroups',
		description: 'Manage web admin groups.',
	},
	{
		id: '@web/bans',
		description: 'Manage bans.',
	},
	{
		id: '@web/mutes',
		description: 'Manage mutes.',
	},
	{
		id: '@web/logs',
		description: 'View panel logs.',
	},
	{
		id: '@web/stats',
		description: 'View server statistics.',
	},
	{
		id: '@web/servers',
		description: 'Manage servers.',
	},
]

export const adminFlags: Flag[] = FLAGS.map((flag) => flag.id)

export const flagsSchema = z.string().refine((v) => adminFlags.includes(v as Flag) || v.startsWith('#'), {
	message: 'The flag is not valid',
})

const adminSchema = z.object({
	player_name: z
		.string()
		.min(3)
		.regex(/^[\w\s]+$/),
	player_steamid: z.string().regex(/^7656119\d{10}$/),
	server_id: z.array(z.string()).nullable(),
	// Flags should be either a string or an array of strings
	flags: z.union([z.array(flagsSchema), flagsSchema]),
	immunity: z.string().min(0).max(100),
})

export default adminSchema
