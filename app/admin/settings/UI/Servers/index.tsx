import { Input } from '@nextui-org/input'
import adminSettingsStore from '../../store'

const ServersSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)
	console.log(settings)
	return (
		<div className='flex flex-col gap-4'>
			<Input
				label='RCON Password'
				value={settings.rconPassword}
				onValueChange={(rconPassword) => setSettings({ ...settings, rconPassword })}
				disabled={isFormLoading}
				description='The password for the RCON connection to the servers, note that all servers must have the same password for this to work.'
				type='password'
			/>
		</div>
	)
}

export default ServersSettings
