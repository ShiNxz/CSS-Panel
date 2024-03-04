import { From64ToUser } from 'steam-api-sdk'

/**
 * Get a duplicate-free version of an array of steam-64 ids and return steam users
 */
const GetSteamUsers = async (steamIds: string[]) => {
	const uniqueSteamIds = [...new Set(steamIds)]
		// Filter the non steam64 values (not numbers)
		.filter((steamid) => !isNaN(Number(steamid)))

	// If there are no valid steam64 ids, return an empty array
	if (!uniqueSteamIds.length) return []

	// Get the steam profiles
	const profiles = await From64ToUser(uniqueSteamIds)

	return profiles || []
}

export default GetSteamUsers
