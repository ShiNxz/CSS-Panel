import axios from 'axios'
import UpdateButtonClient from './Client'

export const revalidate = 3600

const UpdateButton = async () => {
	const tags = await axios.get('https://api.github.com/repos/ShiNxz/CSS-Panel/tags').catch(() => null)
	debug('Github: Checking for updates')
	if (!tags || !tags.data) return <UpdateButtonClient />

	const latestVersion = tags.data[0].name as string
	const currentVersion = process.env.version as string

	return latestVersion !== currentVersion && <UpdateButtonClient />
}

export default UpdateButton
