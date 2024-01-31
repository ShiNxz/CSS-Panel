import type { RowDataPacket } from 'mysql2'
import type { Flag } from './css'

interface SA_Admin {
	id?: number
	player_steamid: string
	player_name: string
	flags: Flag
	immunity: string
	server_id?: number | null
	ends?: string | null
	created?: string
}

interface SA_Ban {
	id: number
	player_steamid?: string
	player_name?: string
	player_ip?: string
	admin_steamid: string
	admin_name: string
	reason: string
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
	duration: number
	ends: Date
	created: Date
	type: 'GAG' | 'MUTE' | ''
	server_id?: number
	status: 'ACTIVE' | 'UNMUTED' | 'EXPIRED' | ''
}

interface SA_Server {
	id: number
	address: string
	hostname: string
}

interface DB_Count extends RowDataPacket {
	'COUNT(*)': number
}
