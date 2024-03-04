import { Listbox, ListboxItem, ListboxSection } from '@nextui-org/listbox'
import { TablerIconsProps } from '@tabler/icons-react'
import { useRef } from 'react'
import useOnClickOutside from '@/utils/hooks/useOnClickOutside'
import { motion } from 'framer-motion'

const ContextMenu = ({ open, x, y, handleCloseMenu, items }: ContextMenuProps) => {
	const contextMenuRef = useRef<HTMLDivElement>(null)
	useOnClickOutside(contextMenuRef, handleCloseMenu)

	return (
		open && (
			<motion.div
				className='w-full max-w-[260px] border-small px-1 py-0.5 rounded-small bg-background/40 backdrop-blur-lg border-default-200 absolute z-[20000]'
				style={{
					left: x,
					top: y,
				}}
				ref={contextMenuRef}
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.08 }}
			>
				<Listbox
					variant='flat'
					aria-label='Listbox menu with sections'
					items={items}
				>
					{items.map(({ category, items }) => (
						<ListboxSection
							key={category}
							title={category}
						>
							{items.map(({ key, description, icon, color, onClick }) => {
								const Icon = icon

								return (
									<ListboxItem
										key={key}
										description={<span className='text-foreground-700'>{description}</span>}
										startContent={<Icon />}
										color={color || 'default'}
										onClick={() => {
											onClick && onClick()
											handleCloseMenu()
										}}
									>
										{key}
									</ListboxItem>
								)
							})}
						</ListboxSection>
					))}
				</Listbox>
			</motion.div>
		)
	)
}

interface ContextMenuProps {
	open: boolean
	x: number
	y: number
	items: ContextMenuCategory[]
	handleCloseMenu: () => void
}

interface ContextMenuCategory {
	category: string
	items: ContextMenuItem[]
}

interface ContextMenuItem {
	key: string
	description: string
	icon: (props: TablerIconsProps) => JSX.Element
	color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
	onClick?: () => void
}

export default ContextMenu
