import AdvancedSwitch from '@/app/UI/Layouts/Main/Inputs/AdvancedSwitch'
import adminSettingsStore from '../../store'
import { Input } from '@nextui-org/input'

const AdvancedSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='grid grid-cols-4 gap-6'>
			<Input
				label='Discord Webhook'
				value={settings.discordWebhook}
				onValueChange={(discordWebhook) => setSettings({ ...settings, discordWebhook })}
				disabled={isFormLoading}
				className='col-span-4'
				color={
					settings.discordWebhook?.includes('/api/webhooks/')
						? 'success'
						: settings.discordWebhook.length > 0
						? 'danger'
						: 'default'
				}
			/>
			<AdvancedSwitch
				label='Enable early access features'
				description='Get access to new features before they are released.'
				value={settings.earlyAccessFeatures}
				onChange={(value) => setSettings({ ...settings, earlyAccessFeatures: value })}
				disabled={isFormLoading}
			/>
			<AdvancedSwitch
				label='Debug Mode'
				description='Get logs and errors in the console for debugging.'
				value={settings.debugMode}
				onChange={(value) => setSettings({ ...settings, debugMode: value })}
				disabled={isFormLoading}
			/>
		</div>
	)
}

export default AdvancedSettings
