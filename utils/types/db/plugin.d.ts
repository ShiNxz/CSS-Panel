import type { RowDataPacket } from 'mysql2'
import type { Flag } from './css'

type Group = `#${string}`

interface SA_Admin {
	id?: number
	player_steamid: string
	player_name: string
	flags: Group | Flag[]
	immunity: string
	server_id: string[] | null
	ends?: string | null
	created?: string
	group?: SA_AdminGroup
}

interface SA_AdminGroup {
	id: Group
	name: string
	flags: Flag[]
	immunity: string
	created?: string
}

interface SA_Ban {
	id: number
	player_steamid?: string | null
	player_name?: string | null
	player_ip?: string | null
	admin_steamid: string
	admin_name: string
	reason: string
	unban_reason?: string | null
	comment?: string
	duration: number
	ends: Date
	created: Date
	server_id?: number
	status: 'ACTIVE' | 'UNBANNED' | 'EXPIRED' | ''
}

interface SA_Mute {
	id: number
	player_steamid?: string
	player_name?: string
	admin_steamid: string
	admin_name: string
	reason: string
	unmute_reason?: string | null
	comment?: string
	duration: number
	ends: Date
	created: Date
	type: 'GAG' | 'MUTE' | 'SILENCE' | ''
	server_id?: number
	status: 'ACTIVE' | 'UNMUTED' | 'EXPIRED' | ''
}

interface SA_Server {
	id: number
	address: string
	hostname: string
	rcon?: string
}

// todo check if it also push when using the css_say/say command, if yes, keep it like that but in the messages modal make sure to filter out the '/' startsWith messages
// todo add index to serverId
interface SA_ChatLog {
	id: number
	serverId: string
	playerSteam64: string
	playerName: string
	message: string
	team: number
	created: Date
}

interface DB_Count extends RowDataPacket {
	'COUNT(*)': number
}
