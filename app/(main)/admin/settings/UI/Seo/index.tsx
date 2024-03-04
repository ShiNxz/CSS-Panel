import isUrl from '@/utils/functions/isURL'
import adminSettingsStore from '../../store'
import { Input, Textarea } from '@nextui-org/input'

const SeoSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='flex flex-col gap-4'>
			<Input
				label='Website Title'
				value={settings.title}
				onValueChange={(title) => setSettings({ ...settings, title })}
				disabled={isFormLoading}
			/>
			<div className='flex flex-row gap-8 items-center'>
				<Input
					label='Favicon URL'
					value={settings.favicon}
					onValueChange={(favicon) => setSettings({ ...settings, favicon })}
					disabled={isFormLoading}
				/>
				{settings.favicon && isUrl(settings.favicon) && (
					<img
						src={settings.favicon}
						alt='Favicon'
						className='w-12'
					/>
				)}
			</div>
			<Textarea
				label='Website Description'
				value={settings.description}
				onValueChange={(description) => setSettings({ ...settings, description })}
				disabled={isFormLoading}
			/>
			<Textarea
				label='Website Keywords'
				value={settings.keywords}
				onValueChange={(keywords) => setSettings({ ...settings, keywords })}
				description='Separate each keyword with a comma'
				disabled={isFormLoading}
			/>
			<div className='flex flex-row gap-8 items-center'>
				<Input
					label='Logo URL'
					value={settings.logo}
					onValueChange={(logo) => setSettings({ ...settings, logo })}
					disabled={isFormLoading}
				/>
				{settings.logo && isUrl(settings.logo) && (
					<img
						src={settings.logo}
						alt='Logo'
						className='h-12'
					/>
				)}
			</div>
		</div>
	)
}

export default SeoSettings
