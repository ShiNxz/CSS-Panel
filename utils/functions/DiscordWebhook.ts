import axios from 'axios'

const DiscordWebhook = async ({ url, content, embeds }: Webhook) => {
	try {
		const data = {
			username: 'CSS-Panel',
			content,
			embeds,
		}

		await axios.post(url, data)
	} catch (err) {
		error('Error while sending a webhook', err)
	}
}

interface Webhook {
	url: string
	content?: string
	embeds?: Embed[]
}

interface Embed {
	title: string
	color?: number
	fields?: Field[]
	description?: string
	timestamp?: string
}

interface Field {
	name: string
	value: string
	inline: boolean
}

export default DiscordWebhook
