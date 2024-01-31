import type { ConfigThemes } from '@nextui-org/theme'
import { bluePurpleDark, bluePurpleLight } from './bluePurple'
import { orangeDark, orangeLight } from './orangeRed'

export const THEMES_OPTIONS = [
	{
		name: 'Blue Purple',
		value: 'bluePurple',
	},
	{
		name: 'Orange',
		value: 'orange',
	},
]

const THEMES: ConfigThemes = {
	'light-bluePurple-theme': bluePurpleLight,
	'dark-bluePurple-theme': bluePurpleDark,
	'light-orange-theme': orangeLight,
	'dark-orange-theme': orangeDark,
}

export default THEMES
