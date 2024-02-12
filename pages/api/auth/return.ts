import passport from '@/lib/Steam'
import router from '@/lib/Router'

const path = '/api/auth/return'
let returnUrl = '/'

export default router
	.use(path, passport.authenticate('steam', { failureRedirect: returnUrl || '/' }))
	.get(path, (_, res) => {
		res.end('<script>window.close();</script >')
	})
