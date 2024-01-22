import type { Metadata } from 'next'
import { fontAssistant, fontRoboto } from '@/config/fonts'
import Providers from './providers'
import clsx from 'clsx'
import Layout from './UI/Layouts/Main'

import './styles/globals.scss'

export const metadata: Metadata = {
	title: {
		default: 'CS2',
		template: `%s - 'CS2'`,
	},
	description: 'CS2',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html
			lang='en'
			suppressHydrationWarning
		>
			<head />
			<body className={clsx('min-h-screen antialiased text-foreground bg-background', fontRoboto.className)}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}

export default RootLayout
