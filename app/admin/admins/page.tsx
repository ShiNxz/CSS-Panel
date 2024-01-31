'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'
import AdminsTable from './UI/Table'
import useManageAdminsStore from './UI/store'
import AdminModal from './UI/Modal'

const ManageAdmins = () => {
	const setOpen = useManageAdminsStore((state) => state.setOpen)

	return (
		<Card>
			<CardHeader className='text-2xl font-medium flex flex-row justify-between'>
				Manage Admins
				<Button
					size='sm'
					variant='flat'
					color='primary'
					onClick={() => setOpen(true)}
				>
					<IconPlus />
					Add new Admin
				</Button>
			</CardHeader>
			<CardBody>
				<AdminsTable />
			</CardBody>
			<AdminModal />
		</Card>
	)
}

export default ManageAdmins
