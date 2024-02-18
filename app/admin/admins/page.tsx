'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react'

import AdminsTable from './UI/Table'
import useManageAdminsStore from './UI/store'
import AdminModal from './UI/Modal'

import AdminGroupsTable from './UI/Groups/Table'
import useManageAdminGroupsStore from './UI/Groups/Store'
import AdminGroupModal from './UI/Groups/Modal'

const ManageAdmins = () => {
	const setOpen = useManageAdminsStore((state) => state.setOpen)
	const setGroupOpen = useManageAdminGroupsStore((state) => state.setOpen)

	return (
		<>
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
			<Card>
				<CardHeader className='text-2xl font-medium flex flex-row justify-between'>
					Manage Admin Groups
					<Button
						size='sm'
						variant='flat'
						color='primary'
						onClick={() => setGroupOpen(true)}
					>
						<IconPlus />
						Add new group
					</Button>
				</CardHeader>
				<CardBody>
					<AdminGroupsTable />
				</CardBody>
				<AdminGroupModal />
			</Card>
		</>
	)
}

export default ManageAdmins
