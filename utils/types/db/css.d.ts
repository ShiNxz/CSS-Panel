import { z } from 'zod'

/**
 * - `@css/reservation` # Reserved slot access.
 * - `@css/generic` # Generic admin.
 * - `@css/kick` # Kick other players.
 * - `@css/ban` # Ban other players.
 * - `@css/unban` # Remove bans.
 * - `@css/vip` # General vip status.
 * - `@css/slay` # Slay/harm other players.
 * - `@css/changemap` # Change the map or major gameplay features.
 * - `@css/cvar` # Change most cvars.
 * - `@css/config` # Execute config files.
 * - `@css/chat` # Special chat privileges.
 * - `@css/vote` # Start or create votes.
 * - `@css/password` # Set a password on the server.
 * - `@css/rcon` # Use RCON commands.
 * - `@css/cheats` # Change sv_cheats or use cheating commands.
 * - `@css/root` # Magically enables all flags and ignores immunity values.
 */
type Flag =
	| '@css/reservation'
	| '@css/generic'
	| '@css/kick'
	| '@css/ban'
	| '@css/unban'
	| '@css/vip'
	| '@css/slay'
	| '@css/changemap'
	| '@css/cvar'
	| '@css/config'
	| '@css/chat'
	| '@css/vote'
	| '@css/password'
	| '@css/rcon'
	| '@css/cheats'
	| '@css/root'
	| WebFlag

type WebFlag =
	| '@web/root' // Settings, logs, etc.
	| '@web/stats' // Statistics
	| '@web/admins' // Admins
	| '@web/admingroups' // Admin groups
	| '@web/servers' // Servers
	| '@web/bans' // Bans
	| '@web/mutes' // Mutes
	| '@web/logs' // Logs
