import type { Flag } from '@/utils/types/db/css'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { User as NextUIUser } from '@nextui-org/user'
import { IconLogout } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import { cn } from '@nextui-org/system'
import useAuth, { handleLogin, handleLogout } from '@/utils/hooks/useAuth'
import { Tooltip } from '@nextui-org/tooltip'

const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

const User = () => {
	const { user, admin } = useAuth()

	return user ? (
		<Dropdown>
			<DropdownTrigger>
				<NextUIUser
					as='button'
					avatarProps={{
						isBordered: true,
						src: user.photos[0].value,
						radius: 'sm',
						className: 'mr-1',
					}}
					className='transition-transform mr-4'
					description={
						admin ? (
							admin?.group ? (
								admin?.group.name
							) : typeof admin.flags !== 'string' && admin.flags.length > 1 ? (
								<Tooltip
									content={typeof admin.flags !== 'string' ? admin.flags.join('\n') : admin.flags}
									color='primary'
									className='whitespace-pre-wrap'
								>
									<div>{admin.flags.length} Flags</div>
								</Tooltip>
							) : (
								admin.flags[0]
							)
						) : (
							'Player'
						)
					}
					name={user.displayName}
					classNames={{
						name: 'text-default-900 font-medium',
						description: 'text-default-500',
					}}
				/>
			</DropdownTrigger>
			<DropdownMenu variant='faded'>
				{/* <DropdownItem
					key='new'
					shortcut='⌘N'
					description='Create a new file'
					startContent={<Icon360 className={iconClasses} />}
				>
					New file
				</DropdownItem>
				<DropdownItem
					key='copy'
					shortcut='⌘C'
					description='Copy the file link'
					startContent={<Icon360 className={iconClasses} />}
				>
					Copy link
				</DropdownItem>
				<DropdownItem
					key='edit'
					shortcut='⌘⇧E'
					showDivider
					description='Allows you to edit the file'
					startContent={<Icon360 className={iconClasses} />}
				>
					Edit file
				</DropdownItem> */}
				<DropdownItem
					key='logout'
					className='text-danger'
					color='danger'
					description='Logout from your steam account'
					startContent={<IconLogout className={cn(iconClasses, 'text-danger')} />}
					onClick={handleLogout}
				>
					Logout
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	) : (
		<Button
			color='primary'
			onClick={handleLogin}
		>
			Login
		</Button>
	)
}

export default User
