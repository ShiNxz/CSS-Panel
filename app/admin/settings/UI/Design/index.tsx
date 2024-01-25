import adminSettingsStore from '../../store'
import { Input, Textarea } from '@nextui-org/input'
import HeaderDesign from './Header'

const DesignSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='flex flex-col gap-4'>
			<HeaderDesign />
		</div>
	)
}

export default DesignSettings
