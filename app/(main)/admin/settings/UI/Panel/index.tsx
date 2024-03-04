import { Select, SelectItem } from '@nextui-org/select'
import adminSettingsStore from '../../store'
import AdvancedSwitch from '@/app/UI/Layouts/Main/Inputs/AdvancedSwitch'

const PanelSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='grid grid-cols-4 gap-6'>
			<AdvancedSwitch
				label='Show Admin Name'
				description='Display the banned/muted admin name in the banned/muted list for non-admins (public) or only for admins.'
				value={settings.showAdminName}
				onChange={(showAdminName) => setSettings({ ...settings, showAdminName })}
				disabled={isFormLoading}
			/>
			<Select
				label='Panel language'
				variant='bordered'
				placeholder='Select a language'
				selectedKeys={[settings.language]}
				className='max-w-xs'
				onChange={(language) => setSettings({ ...settings, language: language.target.value })}
				disabled={isFormLoading}
				disallowEmptySelection
			>
				{LANGUAGES.map((option) => (
					<SelectItem
						key={option.value}
						value={option.value}
					>
						{option.name}
					</SelectItem>
				))}
			</Select>
		</div>
	)
}

const LANGUAGES = [
	{
		name: 'English',
		value: 'en',
	},
]

export default PanelSettings
