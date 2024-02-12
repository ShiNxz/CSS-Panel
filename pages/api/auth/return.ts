import passport from '@/lib/Steam'
import router from '@/lib/Router'

const path = '/api/auth/return'
let returnUrl = '/'

export default router
	.get(path, (req, res) => {
		console.log(req.url, req.originalUrl)
	})
	.use(
		path,
		passport.authenticate(
			'steam'
			// { failureRedirect: returnUrl || '/', failureMessage: true, failWithError: true },
			// (err: any) => console.log({ err })
		)
	)
	.get(path, (_, res) => {
		res.end('<script>window.close();</script >')
	})
