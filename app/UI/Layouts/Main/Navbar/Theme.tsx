import { useEffect, useState } from 'react'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import { useTheme } from 'next-themes'
import settingsStore from '@/utils/stores/settings.store'

const ThemeSwitch = () => {
	const { theme: selectedTheme } = settingsStore((state) => state.settings)
	const [mounted, setMounted] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (selectedTheme) {
			if (theme) {
				// Reload the theme
				const currentMode = theme?.split('-')[0]

				setTheme(`${currentMode || 'light'}-${selectedTheme}-theme`)
			} else {
				setTheme(`light-${selectedTheme}-theme`)
			}
		}
	}, [selectedTheme, setTheme, theme])

	if (!mounted) return null

	return (
		<Button
			onClick={() =>
				setTheme(
					theme === `dark-${selectedTheme}-theme`
						? `light-${selectedTheme}-theme`
						: `dark-${selectedTheme}-theme`
				)
			}
			size='sm'
			variant='faded'
			color='primary'
			isIconOnly
		>
			{theme === `dark-${selectedTheme}-theme` ? <IconMoon size={20} /> : <IconSun size={20} />}
		</Button>
	)
}

export default ThemeSwitch
