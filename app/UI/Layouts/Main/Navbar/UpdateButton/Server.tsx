import axios from 'axios'
import UpdateButtonClient from './Client'

export const dynamic = 'force-dynamic'

const UpdateButton = async () => {
	const tags = await axios.get('https://api.github.com/repos/ShiNxz/CSS-Panel/tags')
	const latestVersion = tags.data[0].name as string
	const currentVersion = process.env.version as string
	console.log({
		latestVersion,
		currentVersion,
	})

	return latestVersion !== currentVersion && <UpdateButtonClient />
}

export default UpdateButton
