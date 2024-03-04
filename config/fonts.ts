import { Inter as FontSans, Assistant as FontAssistant, Roboto as FontRoboto } from 'next/font/google'

export const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
})

export const fontAssistant = FontAssistant({
	subsets: ['latin'],
	weight: ['200', '300', '400', '500', '700', '800'],
	variable: '--font-mono',
})

export const fontRoboto = FontRoboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	variable: '--font-roboto',
})
