import type { RowDataPacket } from 'mysql2'

interface SA_Admin extends RowDataPacket {
	id: number
	player_steamid: string
	player_name: string
	flags: string
	immunity: string
	server_id?: string | null
	ends?: string | null
	created: Date
}

interface SA_Ban extends RowDataPacket {
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

interface SA_Mute extends RowDataPacket {
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

interface SA_Server extends RowDataPacket {
	id: number
	address: string
	hostname: string
}

interface DB_Count extends RowDataPacket {
	'COUNT(*)': number
}
