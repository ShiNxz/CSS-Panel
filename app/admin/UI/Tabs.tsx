'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Tabs, Tab } from '@nextui-org/tabs'

const AdminTabs = () => {
	const pathname = usePathname()
	const router = useRouter()

	return (
		<Tabs
			aria-label='Admin-tabs'
			selectedKey={pathname}
			onSelectionChange={(e) => router.push(e as string)}
			items={TABS}
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

const TABS = [
	{
		path: '/admin',
		title: 'Statistics',
	},
	{
		path: '/admin/admins',
		title: 'Manage Admins',
	},
	{
		path: '/admin/servers',
		title: 'Manage Servers',
	},
	{
		path: '/admin/bans',
		title: 'Manage Bans',
	},
	{
		path: '/admin/mutes',
		title: 'Manage Mutes',
	},
	{
		path: '/admin/logs',
		title: 'Logs',
	},
	{
		path: '/admin/settings',
		title: 'Panel Settings',
	},
]
