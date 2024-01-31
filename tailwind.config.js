import { nextui } from '@nextui-org/theme'
import THEMES from './themes'
import { bluePurpleDark, bluePurpleLight } from './themes/bluePurple'
import { orangeDark, orangeLight } from './themes/orangeRed'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [
		nextui({
			themes: {
				'light-bluePurple-theme': bluePurpleLight,
				'dark-bluePurple-theme': bluePurpleDark,
				'light-orange-theme': orangeLight,
				'dark-orange-theme': orangeDark,
			},
			prefix: 'css',
		}),
	],
}
