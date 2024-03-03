import { Switch } from '@nextui-org/switch'
import { cn } from '@nextui-org/system'

const AdvancedSwitch = ({ label, description, value, onChange, disabled }: AdvancedSwitchProps) => {
	return (
		<Switch
			classNames={{
				base: cn(
					'inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center',
					'justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
					'data-[selected=true]:border-primary'
				),
				wrapper: 'p-0 h-4 overflow-visible',
				thumb: cn(
					'w-6 h-6 border-2 shadow-lg',
					'group-data-[hover=true]:border-primary',
					//selected
					'group-data-[selected=true]:ml-6',
					// pressed
					'group-data-[pressed=true]:w-7',
					'group-data-[selected]:group-data-[pressed]:ml-4'
				),
			}}
			isSelected={value}
			onValueChange={onChange}
			disabled={disabled}
		>
			<div className='flex flex-col gap-1'>
				<p className='text-medium'>{label}</p>
				{description && <p className='text-tiny text-default-400'>{description}</p>}
			</div>
		</Switch>
	)
}

interface AdvancedSwitchProps {
	label: string
	description?: string
	value: boolean
	onChange: (value: boolean) => void
	disabled?: boolean
}

export default AdvancedSwitch
