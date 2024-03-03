import chalk from 'chalk'
import query from '../functions/db'
import DiscordWebhook from '../functions/DiscordWebhook'

global.log = async (message?: any, ...optionalParams: any[]) => {
	console.log(chalk.cyanBright('[LOG] ') + message, ...optionalParams)

	const discordWebhook = await query.settings.getByKey('discordWebhook', false)
	if (discordWebhook)
		DiscordWebhook({
			url: discordWebhook,
			embeds: [
				{
					title: '**▬▬▬▬▬ [LOG] ▬▬▬▬▬**',
					color: 0x51adff,
					description: message + '\n' + `\`\`\`${optionalParams.join('\n')}\`\`\``,
					timestamp: new Date().toISOString(),
				},
			],
		})
}

global.debug = async (message?: any, ...optionalParams: any[]) => {
	const shouldDebug = await query.settings.getByKey('debugMode', false)
	if (!shouldDebug) return

	const error = new Error()
	const stack = error.stack || ''
	const stackTrace = stack.split('\n').slice(1).join('\n').split('\n')[1].split(' ').slice(5).join(' ').split(' ')[0]

	console.debug(chalk.yellowBright('[DEBUG]') + ` (${stackTrace}) `, message, ...optionalParams)
}

global.error = async (message?: any, ...optionalParams: any[]) => {
	console.error(chalk.redBright('[ERROR] ') + message, ...optionalParams)

	const discordWebhook = await query.settings.getByKey('discordWebhook', false)
	if (discordWebhook)
		DiscordWebhook({
			url: discordWebhook,
			embeds: [
				{
					title: '**▬▬▬▬▬ [ ERROR ] ▬▬▬▬▬**',
					color: 0xff5151,
					description: message + '\n' + `\`\`\`${optionalParams.join('\n')}\`\`\``,
					timestamp: new Date().toISOString(),
				},
			],
		})
}

global.warn = async (message?: any, ...optionalParams: any[]) => {
	console.warn(chalk.yellowBright('[WARN] ') + message, ...optionalParams)

	const discordWebhook = await query.settings.getByKey('discordWebhook', false)
	if (discordWebhook)
		DiscordWebhook({
			url: discordWebhook,
			embeds: [
				{
					title: '**▬▬▬▬▬ [ WARN ] ▬▬▬▬▬**',
					color: 0xff9b51,
					description: message + '\n' + `\`\`\`${optionalParams.join('\n')}\`\`\``,
					timestamp: new Date().toISOString(),
				},
			],
		})
}

declare global {
	function log(message?: any, ...optionalParams: any[]): void
	function debug(message?: any, ...optionalParams: any[]): void
	function error(message?: any, ...optionalParams: any[]): void
	function warn(message?: any, ...optionalParams: any[]): void
}
