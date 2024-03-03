'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, Tab } from '@nextui-org/tabs'
import { Flag } from '@/utils/types/db/css'

const AdminTabs = () => {
	const pathname = usePathname()
	const router = useRouter()

	return (
		<Tabs
			aria-label='Admin-tabs'
			selectedKey={pathname}
			onSelectionChange={(e) => router.push(e as string)}
			items={ADMIN_TABS}
		>
			{(item) => (
				<Tab
					key={item.path}
					title={item.title}
				/>
			)}
		</Tabs>
	)
}

export default AdminTabs

export const ADMIN_TABS: Tab[] = [
	{
		path: '/admin',
		title: 'Statistics',
		permissions: [],
	},
	{
		path: '/admin/admins',
		title: 'Manage Admins',
		permissions: ['@web/root', '@css/root', '@web/admins'],
	},
	{
		path: '/admin/servers',
		title: 'Manage Servers',
		permissions: ['@web/root', '@css/root', '@web/servers'],
	},
	{
		path: '/admin/bans',
		title: 'Manage Bans',
		permissions: ['@web/root', '@css/root', '@web/bans'],
	},
	{
		path: '/admin/mutes',
		title: 'Manage Mutes',
		permissions: ['@web/root', '@css/root', '@web/mutes'],
	},
	{
		path: '/admin/logs',
		title: 'Logs',
		permissions: ['@web/root', '@css/root', '@web/logs'],
	},
	{
		path: '/admin/settings',
		title: 'Panel Settings',
		permissions: ['@web/root', '@css/root'],
	},
]

interface Tab {
	path: string
	title: string
	permissions: Flag[]
}
