'use client'

import { usePathname } from 'next/navigation'
import { ADMIN_TABS } from '../UI/Tabs'
import AdminCheck from '../UI/AdminCheck'
import MutesTable from '@/app/UI/Layouts/Main/Mutes'

const ManageMutes = () => {
	const path = usePathname()
	const route = ADMIN_TABS.find((t) => t.path === path)

	return (
		<AdminCheck flags={route?.permissions || []}>
			<MutesTable type='MANAGE' />
		</AdminCheck>
	)
}

export default ManageMutes
