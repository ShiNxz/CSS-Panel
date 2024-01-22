'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import THEMES from '@/themes'

export interface ProvidersProps {
	children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
	const router = useRouter()

	return (
		<NextUIProvider navigate={router.push}>
			<ThemeProvider themes={Object.keys(THEMES)}>
				<Toaster />
				{children}
			</ThemeProvider>
		</NextUIProvider>
	)
}

export default Providers
