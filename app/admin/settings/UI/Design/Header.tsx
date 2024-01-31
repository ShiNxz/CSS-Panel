import Editor from '@/app/UI/Layouts/Main/Inputs/CodeEditor'
import adminSettingsStore from '../../store'
import Header from '@/app/UI/Layouts/Main/Header'
import isUrl from '@/utils/functions/isURL'
import { Input } from '@nextui-org/input'

const HeaderDesign = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='flex flex-col gap-4'>
			<Input
				label='Header Image URL'
				value={settings.headerImage}
				onValueChange={(headerImage) => setSettings({ ...settings, headerImage })}
				disabled={isFormLoading}
				color={isUrl(settings.headerImage) ? 'success' : 'danger'}
			/>
			<div className='grid grid-cols-2 gap-6'>
				<Editor
					label='Header HTML'
					value={settings.headerCodeHTML}
					setValue={(headerCodeHTML) => setSettings({ ...settings, headerCodeHTML })}
					disabled={isFormLoading}
					example={`<h1 class="banner-title">Welcome!</h1>`}
					lang='html'
				/>
				<Editor
					label='Header CSS'
					value={settings.headerCodeCSS}
					setValue={(headerCodeCSS) => setSettings({ ...settings, headerCodeCSS })}
					disabled={isFormLoading}
					example={`.banner-title {\n\tcolor: #000000;\n\tfont-size: 32px;\n}`}
					lang='css'
				/>
			</div>
			<h2>Preview</h2>
			<Header
				image={settings.headerImage}
				html={settings.headerCodeHTML}
				css={settings.headerCodeCSS}
			/>
		</div>
	)
}

export default HeaderDesign
