import type { Settings } from '@/utils/schemas/settings'
import type { RowDataPacket } from 'mysql2'
import type { SA_Admin } from './plugin'
import type { IExtendedSteamUser } from 'steam-api-sdk/types'

interface CSSP_Setting extends RowDataPacket {
	key: keyof Settings
	value: Settings[keyof Settings]
	lastChange: Date
}

interface CSSP_Log {
	id: number
	title: string
	message: string
	aid: number
	time: Date
}

interface Admin extends SA_Admin {
	user?: IExtendedSteamUser
}

interface CSSP_LogExtended {
	id: number
	title: string
	message: string
	aid: number
	admin: Admin | null
	time: Date
}
