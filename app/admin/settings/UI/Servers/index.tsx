import { Input } from '@nextui-org/input'
import adminSettingsStore from '../../store'

const ServersSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)
	console.log(settings)
	return <div className='flex flex-col gap-4'></div>
}

export default ServersSettings
