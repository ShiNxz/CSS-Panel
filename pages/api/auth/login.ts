import p from '@/lib/Steam'
import router from '@/lib/Router'

const path = '/api/auth/login'

export default router
	.use((req, res, next) => {
		next()
	})
	.get(path, p.authenticate('steam', (err: any) => console.log(err)))
