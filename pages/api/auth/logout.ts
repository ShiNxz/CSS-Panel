import type { NextApiRequest, NextApiResponse } from 'next'
import router from '@/lib/Router'

export default router.get('/api/auth/logout', (req: NextApiRequest, res: NextApiResponse) => {
	req.logout()
	res.end()
})
