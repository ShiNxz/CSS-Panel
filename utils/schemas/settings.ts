import { THEMES_OPTIONS } from '@/themes'
import { z } from 'zod'

const settingsSchema = z.object({
	title: z.string().optional().default('CSS-Panel'),
	description: z.string().optional().default(''),
	keywords: z.string().optional().default('gaming, cs2'),
	favicon: z.string().optional().default(''),
	theme: z.string().default(THEMES_OPTIONS[0].value),
	logo: z.string().optional().default(''),
	debugMode: z.boolean().optional().default(false),
	headerImage: z.string().optional().default('https://prosettings.net/wp-content/uploads/inferno-in-cs2-2.jpg'),
	headerCodeHTML: z.string().optional().default(''),
	headerCodeCSS: z.string().optional().default(''),
	earlyAccessFeatures: z.boolean().optional().default(false),
	serversGrid: z.boolean().optional().default(true),
	showAdminName: z.boolean().optional().default(false),
	language: z.string().optional().default('en'),
	discordWebhook: z.string().optional().default(''),
})

export type Settings = z.infer<typeof settingsSchema>

/**
 * Get the default settings from the zod schema
 */
export const GetDefaultSettings = () => settingsSchema.parse({})

export default settingsSchema
