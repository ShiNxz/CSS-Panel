import adminSettingsStore from '../../store'
import AdvancedSwitch from '@/app/UI/Layouts/Main/Inputs/AdvancedSwitch'

const ServersSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='grid grid-cols-4 gap-6'>
			<AdvancedSwitch
				label='Servers Grid'
				description='Display the servers in a grid or list view (table) in the home page.'
				value={settings.serversGrid}
				onChange={(value) => setSettings({ ...settings, serversGrid: value })}
				disabled={isFormLoading}
			/>
		</div>
	)
}

export default ServersSettings
