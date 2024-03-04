import { Button } from '@nextui-org/button'
import Monaco from '@monaco-editor/react'
import toast from 'react-hot-toast'

const Editor = ({ value, setValue, lang, example, disabled, label }: Props) => {
	const handlePasteExample = () => {
		if (!example) return
		if (value && value.trim() !== '') return toast.error('Editor must be empty to paste example')

		setValue(example)
	}

	return (
		<div className='relative w-full h-full flex flex-col gap-2'>
			<h3 className='text-xl font-medium mb-2'>{label}</h3>
			<Monaco
				height={400}
				defaultLanguage={lang}
				className='!rounded-md overflow-hidden'
				theme='vs-dark'
				value={value}
				onChange={(!disabled && setValue) || ((() => {}) as any)}
				options={{
					inlineSuggest: {
						enabled: true,
					},
					fontSize: 16,
					formatOnType: true,
					autoClosingBrackets: 'always',
					autoSurround: 'languageDefined',
					automaticLayout: true,
					autoIndent: 'full',
					autoClosingQuotes: 'always',
				}}
			/>
			{example && (
				<Button
					onClick={handlePasteExample}
					disabled={disabled}
					variant='flat'
					color='primary'
				>
					Paste Example
				</Button>
			)}
		</div>
	)
}

interface Props {
	value: string
	setValue: (value: string) => void
	lang: string
	example?: string
	disabled?: boolean
	label?: string
}

export default Editor
