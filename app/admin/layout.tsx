import type { Metadata } from 'next'
import AdminTabs from './UI/Tabs'
import AdminCheck from './UI/AdminCheck'

export const metadata: Metadata = {
	title: 'Admin Panel',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AdminTabs />
			<AdminCheck>{children}</AdminCheck>
		</>
	)
}

export default RootLayout
