const GetDateTimeString = (date?: Date | string | number) => {
	const newDate = date ? new Date(date) : new Date()

	return newDate.toLocaleDateString() + ' - ' + newDate.toLocaleTimeString()
}

export default GetDateTimeString
