import type { Icon } from '@tabler/icons-react'
import { Card, CardBody } from '@nextui-org/card'

const StatsBox = ({ title, value, icon }: Props) => {
	const Icon = icon

	return (
		<Card>
			<CardBody className='flex flex-row justify-between items-center px-6 py-4'>
				<div className='flex flex-col'>
					<span className='bg-gradient-to-tr from-primary-500 to-secondary-500 text-transparent bg-clip-text font-bold text-4xl w-fit'>
						{FormatNumber(Number(value))}
					</span>
					<span className='text-default-800 text-sm'>{title}</span>
				</div>
				<Icon
					size={40}
					className='text-default-800'
				/>
			</CardBody>
		</Card>
	)
}

const FormatNumber = (number: number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')

interface Props {
	title: string
	value: string | number
	icon: Icon
}

export default StatsBox
