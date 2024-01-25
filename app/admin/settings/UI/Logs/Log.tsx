import type { CSSP_LogExtended } from '@/utils/types/db/panel'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { Divider } from '@nextui-org/divider'
import { formatDistanceToNow } from 'date-fns'

const Log = ({ admin, message, title, time }: CSSP_LogExtended) => {
	return (
		<Card fullWidth>
			{admin && (
				<>
					<CardHeader className='flex gap-3'>
						<Image
							alt={admin.user?.personaname || admin.player_name}
							height={40}
							radius='sm'
							src={admin.user?.avatarmedium}
							width={40}
						/>
						<div className='flex flex-col'>
							<p className='text-md font-medium'>{admin.user?.personaname || admin.player_name}</p>
							<p className='text-small text-default-500'>Flags</p>
						</div>
					</CardHeader>
					<Divider />
				</>
			)}
			<CardBody>
				<h4 className='text-lg font-medium'>{title}</h4>
				<p className='text-sm'>{message}</p>
			</CardBody>
			<Divider />
			<CardFooter className='text-sm'>{formatDistanceToNow(time) + ' ago'}</CardFooter>
		</Card>
	)
}

export default Log
