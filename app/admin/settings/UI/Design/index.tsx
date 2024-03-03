import { THEMES_OPTIONS } from '@/themes'
import { Select, SelectItem } from '@nextui-org/select'
import adminSettingsStore from '../../store'

const DesignSettings = () => {
	const settings = adminSettingsStore((state) => state.settings)
	const setSettings = adminSettingsStore((state) => state.setSettings)
	const isFormLoading = adminSettingsStore((state) => state.isFormLoading)

	return (
		<div className='flex flex-col gap-4'>
			<Select
				label='Panel theme'
				variant='bordered'
				placeholder='Select a theme'
				selectedKeys={[settings.theme]}
				className='max-w-xs'
				onChange={(theme) => setSettings({ ...settings, theme: theme.target.value })}
				disabled={isFormLoading}
				disallowEmptySelection
			>
				{THEMES_OPTIONS.map((option) => (
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

export default DesignSettings
