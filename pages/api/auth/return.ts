import passport from '@/lib/Steam'
import router from '@/lib/Router'

import Cookies from 'cookies'

const path = '/api/auth/return'
let returnUrl = '/'

export default router
	.use((req, res, next) => {
		const cookies = new Cookies(req, res)

		if (cookies.get('steamReturnUrl')) returnUrl = (cookies.get('steamReturnUrl') as string).replace(/['"]+/g, '')

		next()
	})
	.use(path, passport.authenticate('steam', { failureRedirect: returnUrl || '/' }))
	.get(path, (_, res) => {
		res.end('<script>window.close();</script >')
	})
