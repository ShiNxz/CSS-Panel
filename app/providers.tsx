'use client'

import { NextUIProvider } from '@nextui-org/system'
import { useRouter } from 'next/navigation'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import { Settings } from '@/utils/schemas/settings'
import { useEffect } from 'react'
import THEMES from '@/themes'
import settingsStore from '../utils/stores/settings.store'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

export interface ProvidersProps {
	children: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
	const router = useRouter()

	const { data } = useSWR<Settings>('/api/settings', fetcher)

	const setSettings = settingsStore((state) => state.setSettings)

	useEffect(() => {
		if (data) setSettings(data)
	}, [data, setSettings])

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
