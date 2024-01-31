import { Flag } from '@/utils/types/db/css'
import { IconBan, IconDashboard, IconMicrophone, IconServer, type Icon } from '@tabler/icons-react'

const ROUTES: Route[] = [
	{
		name: 'Dashboard',
		path: '/',
		icon: IconDashboard,
	},
	{
		name: 'Servers',
		path: '/servers',
		icon: IconServer,
	},
	{
		name: 'Bans',
		path: '/bans',
		icon: IconBan,
	},
	{
		name: 'Mutes / Gags',
		path: '/mutes',
		icon: IconMicrophone,
	},
	{
		name: 'Admin Panel',
		path: '/admin',
		icon: IconServer,
		admin: true,
		flag: '@css/root',
	},
]

export interface Route {
	path: string
	name: string
	icon: Icon
	admin?: boolean
	flag?: Flag
}

export default ROUTES
