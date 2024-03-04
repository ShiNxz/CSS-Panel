import { redirect } from 'next/navigation'
import envSchema from '@/utils/lib/Env'

export const metadata = {
	title: 'Setup',
	description: 'Setup the application.',
}

const Layout = ({ children }: { children: React.ReactNode }) => {
	const envSet = envSchema.safeParse(process.env)
	if (envSet.success) {
		debug('Env already set, redirecting to main page.')
		return redirect('/')
	}

	return children
}

export default Layout
