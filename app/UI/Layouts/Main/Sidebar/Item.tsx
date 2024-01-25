'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Route } from './Routes'
import { usePathname } from 'next/navigation'
import { cn } from '@nextui-org/system'

const Item = ({ name, icon: Icon, path }: Route) => {
	const pathname = usePathname()
	const active = pathname === path

	return (
		<Link href={path}>
			<div
				className={cn(
					'px-6 py-4 text-sm flex items-center content-center duration-200',
					'hover:bg-slate-500/5 text-foreground',
					'cursor-pointer relative gap-2 hover:pl-8'
				)}
			>
				{active && (
					<motion.span
						layoutId='underline'
						className={`absolute left-0 h-full w-1 [box-shadow:_0_0_10px_hsl(var(--css-primary))]`}
						style={{
							backgroundColor: 'hsl(var(--css-primary))',
						}}
					/>
				)}

				{Icon && <Icon size={18} />}
				<span>{name}</span>
			</div>
		</Link>
	)
}

export default Item
