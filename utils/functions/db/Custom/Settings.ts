import type { CSSP_Setting } from '@/utils/types/db/panel'
import db from '@/utils/lib/Mysql'
import settingsSchema, { GetDefaultSettings, type Settings as ISettings } from '@/utils/schemas/settings'

const publicSettings: (keyof ISettings)[] = [
	'title',
	'description',
	'keywords',
	'theme',
	'logo',
	'headerImage',
	'headerCodeHTML',
	'headerCodeCSS',
]

const Settings = {
	/**
	 * Get all settings from the database
	 * @param safe If true, it will return only the public settings
	 */
	getAll: async (safe = true): Promise<ISettings> => {
		try {
			const [rows] = await db.query<CSSP_Setting[]>('SELECT * FROM `cssp_settings`')
			const dbSettings: ISettings = rows.reduce((acc, curr) => {
				// If safe is true, it will return only the public settings
				if (safe && !publicSettings.includes(curr.key as keyof ISettings)) return acc

				// Check the key type and cast the value to the correct type
				if (curr.key === 'debugMode' || curr.key === 'earlyAccessFeatures') {
					acc[curr.key] = curr.value === '1' ? true : false
					return acc
				}

				acc[curr.key] = curr.value as string

				return acc
			}, {} as ISettings)

			const defaultSettings = GetDefaultSettings()
			const settings: ISettings = {
				...defaultSettings,
				...dbSettings,
			}

			return settings
		} catch (err) {
			console.error(`[DB] Error while getting all settings: ${err}`)
			return GetDefaultSettings()
		}
	},
	getByKey: async <K extends keyof ISettings>(key: K, safe = true): Promise<ISettings[K] | null> => {
		try {
			if (safe && !publicSettings.includes(key)) return null

			const [rows] = await db.query<CSSP_Setting[]>(`SELECT * FROM \`cssp_settings\` WHERE \`key\` LIKE '${key}'`)

			console.log(`[DB] Getting setting: ${key}`)

			if (!rows.length || rows.length < 1) {
				console.error(`[DB] Error while getting setting: ${key}`)
				const defaultSettings = GetDefaultSettings()
				return defaultSettings[key as keyof ISettings] as ISettings[K]
			}

			return rows[0].value as ISettings[K]
		} catch (err) {
			console.error(`[DB] Error while getting setting: ${err}`)
			const defaultSettings = GetDefaultSettings()
			return defaultSettings[key as keyof ISettings] as ISettings[K]
		}
	},
	update: async (settings: ISettings): Promise<void> => {
		try {
			const parsedSettings = settingsSchema.parse(settings)

			for await (const [key, value] of Object.entries(parsedSettings)) {
				const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
				console.log({ key, value, date })
				await db.query(
					`INSERT INTO \`cssp_settings\` (\`key\`, \`value\`, \`lastChange\`) 
						VALUES (?, ?, ?) 
						ON DUPLICATE KEY UPDATE \`value\` = ?, \`lastChange\` = ?`,
					[key, value, date, value, date]
				)
			}
		} catch (err) {
			console.error(`[DB] Error while creating server: ${err}`)
		}
	},
}

export default Settings
