import { ExtMute } from '@/pages/api/mutes'
import { Chip } from '@nextui-org/chip'

const Status = (value: ExtMute['status']) => {
	switch (value) {
		case 'ACTIVE':
			return (
				<Chip
					color='danger'
					size='sm'
					variant='flat'
					radius='sm'
				>
					Active
				</Chip>
			)
		case 'EXPIRED':
			return (
				<Chip
					color='success'
					size='sm'
					variant='flat'
					radius='sm'
				>
					Expired
				</Chip>
			)
		case 'UNMUTED':
			return (
				<Chip
					color='secondary'
					size='sm'
					variant='flat'
					radius='sm'
				>
					Removed
				</Chip>
			)
		default:
			return (
				<Chip
					color='secondary'
					size='sm'
					variant='flat'
					radius='sm'
				>
					Unknown
				</Chip>
			)
	}
}

export default Status
