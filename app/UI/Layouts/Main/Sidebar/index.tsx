'use client'

import ROUTES from './Routes'
import Item from './Item'

const Sidebar = () => {
	return (
		<div className='flex flex-col min-w-[200px] pt-10'>
			{ROUTES.map((route) => (
				<Item
					{...route}
					key={route.name}
				/>
			))}
		</div>
	)
}

export default Sidebar
