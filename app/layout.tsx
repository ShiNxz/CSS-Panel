import type { Metadata } from 'next'
import { fontRoboto } from '@/config/fonts'
import query from '@/utils/functions/db'
import Layout from './UI/Layouts/Main'
import Providers from './providers'
import clsx from 'clsx'

import './styles/globals.scss'

export const dynamic = 'force-dynamic'

export const generateMetadata = async (): Promise<Metadata> => {
	const title = await query.settings.getByKey('title')
	const description = await query.settings.getByKey('description')
	const keywords = await query.settings.getByKey('keywords')

	return {
		title: {
			default: title || '',
			template: `%s - ${title}`,
		},
		description,
		keywords,
	}
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
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
