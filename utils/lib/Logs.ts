import query from '@/utils/functions/db'
import DiscordWebhook from '../functions/DiscordWebhook'

const Log = async (title: string, message: string, admin64?: string) => {
	if (!query) return

	try {
		query.logs.create(title, message, admin64)

		const discordWebhook = await query.settings.getByKey('discordWebhook', false)
		if (discordWebhook)
			DiscordWebhook({
				url: discordWebhook,
				embeds: [
					{
						title: `**▬▬▬▬▬ [LOG :: ${title}] ▬▬▬▬▬**`,
						color: 0x51adff,
						description: message,
						timestamp: new Date().toISOString(),
					},
				],
			})
	} catch (err) {
		error(`Failed to log: ${err}`)
	}
}

export default Log
