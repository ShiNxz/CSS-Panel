'use client'

import ROUTES from './Routes'
import Item from './Item'
import useAuth from '@/utils/hooks/useAuth'

const Sidebar = () => {
	const { admin } = useAuth()

	return (
		<div className='flex flex-col min-w-[200px] pt-10'>
			{ROUTES.map((route) => {
				if (route.admin) {
					if (!admin) return

					if (route.flag) {
						const routeFlag = route.flag
						const adminFlags = admin.flags

						if (!adminFlags.includes(routeFlag)) return
					}
				}

				return (
					<Item
						{...route}
						key={route.name}
					/>
				)
			})}
		</div>
	)
}

export default Sidebar
