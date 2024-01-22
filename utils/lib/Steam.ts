import passport from 'passport'
import { Strategy as SteamStrategy } from 'passport-steam'

passport.serializeUser(async (user, done: any) => {
	done(null, user)
})

passport.deserializeUser(async (obj, done: any) => {
	done(null, obj)
})

if (!process.env.STEAM_API_KEY) throw new Error('No Steam API key provided')

passport.use(
	new SteamStrategy(
		{
			returnURL: `${process.env.DOMAIN || 'http://localhost:3000'}/api/auth/return`,
			realm: `${process.env.DOMAIN || 'http://localhost:3000/'}`,
			apiKey: process.env.STEAM_API_KEY,
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
