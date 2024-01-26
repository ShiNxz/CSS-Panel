'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'
import ServersTable from './Table'
import useManageServersStore from './store'
import ServerModal from './Modal'

const ManageServers = () => {
	const setOpen = useManageServersStore((state) => state.setOpen)

	return (
		<Card>
			<CardHeader className='text-2xl font-medium flex flex-row justify-between'>
				Manage Servers
				<Button
					size='sm'
					variant='flat'
					color='primary'
					onClick={() => setOpen(true)}
				>
					<IconPlus />
					Add new server
				</Button>
			</CardHeader>
			<CardBody>
				<ServersTable />
			</CardBody>
			<ServerModal />
		</Card>
	)
}

export default ManageServers
