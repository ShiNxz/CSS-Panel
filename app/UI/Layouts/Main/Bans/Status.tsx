import { ExtBan } from '@/pages/api/bans'
import { Chip } from '@nextui-org/chip'

const Status = (value: ExtBan['status']) => {
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
		case 'UNBANNED':
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
