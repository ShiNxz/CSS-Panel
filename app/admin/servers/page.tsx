'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { ADMIN_TABS } from '../UI/Tabs'
import ServersTable from './Table'
import useManageServersStore from './store'
import ServerModal from './Modal'
import AdminCheck from '../UI/AdminCheck'

const ManageServers = () => {
	const setOpen = useManageServersStore((state) => state.setOpen)
	const path = usePathname()
	const route = ADMIN_TABS.find((t) => t.path === path)

	return (
		<AdminCheck flags={route?.permissions || []}>
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
		</AdminCheck>
	)
}

export default ManageServers
