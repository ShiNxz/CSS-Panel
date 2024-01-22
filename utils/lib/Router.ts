import passport from './Steam'
import nextConnect from 'next-connect'
import session from 'cookie-session'

const router = nextConnect()

router.use(
	session({
		secret: process.env.SESSION_SECRET,
		maxAge: 1000 * 60 * 60 * 24 * 120, // 30 days
	})
)

// Passport
router.use(passport.initialize())
router.use(passport.session())

export default router
