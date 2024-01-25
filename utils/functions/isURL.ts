const isUrl = (url: string) => {
	try {
		new URL(url)
		return true
	} catch (error) {
		return false
	}
}

export default isUrl
