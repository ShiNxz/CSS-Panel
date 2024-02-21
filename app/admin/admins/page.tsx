'use client'

import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Code } from '@nextui-org/code'
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
					<p className='text-sm mb-6'>
						Admin groups are used to make pre-defined permissions for admins, you can assign an admin to a
						group and whenever you change the group permissions, the admin will automatically get the new
						permissions.
						<br />
						Note that you can also assign a group to an admin by using the command <Code size='sm'>css_addadmin [steam64] [name] [groupId] [immunity - 0]</Code>
					</p>
					<AdminGroupsTable />
				</CardBody>
				<AdminGroupModal />
			</Card>
		</>
	)
}

export default ManageAdmins
