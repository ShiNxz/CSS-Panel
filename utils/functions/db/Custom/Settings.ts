import type { CSSP_Setting } from '@/utils/types/db/panel'
import settingsSchema, { GetDefaultSettings, type Settings as ISettings } from '@/utils/schemas/settings'
import db from '@/utils/lib/Mysql'

const publicSettings: (keyof ISettings)[] = [
	'title',
	'description',
	'keywords',
	'theme',
	'logo',
	'headerImage',
	'headerCodeHTML',
	'headerCodeCSS',
	'serversGrid',
]

const booleanSettings: (keyof ISettings)[] = ['debugMode', 'earlyAccessFeatures', 'serversGrid', 'showAdminName']

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
				if (booleanSettings.includes(curr.key as keyof ISettings)) {
					// @ts-ignore
					acc[curr.key] = curr.value === '1' ? true : false
					return acc
				}

				// @ts-ignore
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
			error(`[DB] Error while getting all settings: ${err}`)
			return GetDefaultSettings()
		}
	},
	getByKey: async <K extends keyof ISettings>(key: K, safe = true): Promise<ISettings[K] | null> => {
		try {
			if (safe && !publicSettings.includes(key)) return null

			const [rows] = await db.query<CSSP_Setting[]>(`SELECT * FROM \`cssp_settings\` WHERE \`key\` LIKE '${key}'`)

			if (!rows.length || rows.length < 1) {
				const defaultSettings = GetDefaultSettings()
				return defaultSettings[key as keyof ISettings] as ISettings[K]
			}

			// Check the key type and cast the value to the correct type
			if (booleanSettings.includes(key)) {
				return (rows[0].value === '1' ? true : false) as ISettings[K]
			}

			return rows[0].value as ISettings[K]
		} catch (err) {
			error(`[DB] Error while getting setting: ${err}`)
			const defaultSettings = GetDefaultSettings()
			return defaultSettings[key as keyof ISettings] as ISettings[K]
		}
	},
	update: async (settings: ISettings): Promise<void> => {
		try {
			const parsedSettings = settingsSchema.parse(settings)

			for await (const [key, value] of Object.entries(parsedSettings)) {
				const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

				await db.query(
					`INSERT INTO \`cssp_settings\` (\`key\`, \`value\`, \`lastChange\`) 
						VALUES (?, ?, ?) 
						ON DUPLICATE KEY UPDATE \`value\` = ?, \`lastChange\` = ?`,
					[key, value, date, value, date]
				)
			}
		} catch (err) {
			error(`[DB] Error while creating server: ${err}`)
		}
	},
}

export default Settings
