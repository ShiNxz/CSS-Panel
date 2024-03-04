import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'

passport.serializeUser(async (user, done: any) => {
	done(null, user)
})

passport.deserializeUser(async (obj, done: any) => {
	done(null, obj)
})

// if (!process.env.STEAM_API_KEY) throw new Error('No Steam API key provided')
// if (!process.env.DOMAIN) throw new Error('No DOMAIN provided')

let domain = process.env.DOMAIN || ''
if (!domain.startsWith('http')) domain = `https://${domain}`

passport.use(
	new SteamStrategy(
		{
			returnURL: `${domain}/api/auth/return`,
			realm: `${domain}/`,
			apiKey: process.env.STEAM_API_KEY || '',
			stateless: true,
		},
		(_, profile, done) => {
			;(profile as any).identifier = _
			return done(null, profile)
		}
	) as any
)

declare module 'next' {
	interface NextApiRequest {
		user: SteamProfile | null
		logout: () => void
	}
}

export interface SteamProfile {
	provider: 'steam'
	_json: {
		steamid: string
		communityvisibilitystate: number
		profilestate: number
		personaname: string
		commentpermission: number
		profileurl: string
		avatar: string
		avatarmedium: string
		avatarfull: string
		avatarhash: string
		lastlogoff: number
		personastate: number
		realname: string
		primaryclanid: string
		timecreated: number
		personastateflags: number
		loccountrycode: string
		locstatecode: string
	}
	id: string
	displayName: string
	photos: Array<{ value: string }>
}

export default passport
