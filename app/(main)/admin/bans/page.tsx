'use client'

import { usePathname } from 'next/navigation'
import { ADMIN_TABS } from '../UI/Tabs'
import AdminCheck from '../UI/AdminCheck'
import BansTable from '@/app/UI/Layouts/Main/Bans'

const ManageBans = () => {
	const path = usePathname()
	const route = ADMIN_TABS.find((t) => t.path === path)

	return (
		<AdminCheck flags={route?.permissions || []}>
			<BansTable type='MANAGE' />
		</AdminCheck>
	)
}

export default ManageBans
