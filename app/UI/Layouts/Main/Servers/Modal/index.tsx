'use client'

import type { PlayerInfo, SafeServerInfo } from '@/utils/functions/query/ServerQuery'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { User } from '@nextui-org/user'
import { Chip } from '@nextui-org/chip'
import { IconBan, IconCrown } from '@tabler/icons-react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { mutate } from 'swr'
import { z } from 'zod'
import { Select, SelectItem } from '@nextui-org/select'
import { MUTE_OPTIONS } from '../../Mutes'
import useContextMenu from '@/utils/hooks/useContextMenu'
import ContextMenu from '@/app/UI/General/ContextMenu'
import Link from 'next/link'
import useServersStore from '../store'
import useAuth from '@/utils/hooks/useAuth'
import ConfirmationModal from '../../../../General/ConfirmationModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import useActionStore, { serverBanSchema, serverKickSchema, serverMuteSchema } from './Store'
import GetDateTimeString from '@/utils/functions/GetDateTimeString'

const ServerModal = () => {
	const modal = useServersStore((state) => state.modal)
	const setModal = useServersStore((state) => state.setModal)
	const setChatModal = useServersStore((state) => state.setChatModal)

	const action = useActionStore((state) => state.action)
	const setAction = useActionStore((state) => state.setAction)
	const details = useActionStore((state) => state.details)
	const setDetails = useActionStore((state) => state.setDetails)
	const isLoading = useActionStore((state) => state.isLoading)
	const setIsLoading = useActionStore((state) => state.setIsLoading)
	const reset = useActionStore((state) => state.reset)

	const { admin } = useAuth()

	const { open, server } = modal
	const handleClose = () => setModal({ ...modal, open: false })

	const handleAction = async () => {
		if (!action || isLoading || !server || !details || !selectedPlayer) return

		setIsLoading(true)

		try {
			await axios.post(`/api/servers/${server.id}/action`, {
				action,
				userId: selectedPlayer.userId,
				details,
			})

			await new Promise((resolve) => setTimeout(resolve, 4000))
			const newInfo = await mutate<SafeServerInfo>(`/api/servers/${server.id}`)
			if (newInfo) setModal({ ...modal, server: newInfo })
			toast.success(`Player ${action}ed successfully`)
			reset()
		} catch (error) {
			toast.error(`Error ${action}ing player`)
		}

		setIsLoading(false)
	}

	const {
		x,
		y,
		open: contextMenuOpen,
		handleCloseMenu,
		handleOpen,
		info: selectedPlayer,
	} = useContextMenu<PlayerInfo>()

	const renderCell = (player: PlayerInfo, columnKey: keyof PlayerInfo) => {
		switch (columnKey) {
			case 'userId':
				return (
					<Chip
						color='primary'
						size='sm'
					>
						#{player.userId}
					</Chip>
				)

			case 'playerName':
				return (
					<Link
						href={`https://steamcommunity.com/profiles/${player.steam64}`}
						target='_blank'
					>
						<User
							avatarProps={{ radius: 'lg', src: player.avatar }}
							name={player.playerName}
							classNames={{
								name: 'flex flex-col gap-2',
							}}
						>
							{player.playerName}
							<span>{player.admin ? '(Admin)' : ''}</span>
						</User>
					</Link>
				)

			case 'steam64':
				return (
					<Link
						href={`https://steamcommunity.com/profiles/${player.steam64}`}
						target='_blank'
						className='underline decoration-blue-500'
					>
						{player.steam64}
					</Link>
				)

			case 'kills':
				return <span>{player.kills || 0}</span>

			case 'deaths':
				return <span>{player.deaths || 0}</span>

			case 'mvps':
				return <span>{player.mvps || 0}</span>

			case 'score':
				return <span>{player.score}</span>

			case 'ping':
				return (
					<span>
						{player.ping}
						<span className='text-foreground/80'>ms</span>
					</span>
				)

			case 'admin':
				return <span>{player.admin ? <IconCrown size={20} /> : '-'}</span>

			default:
				return <></>
		}
	}

	return (
		<Modal
			size='4xl'
			isOpen={open}
			onOpenChange={() => {
				if (contextMenuOpen) return
				if (action) return
				handleClose()
			}}
		>
			<ModalContent>
				{(onClose) =>
					server && (
						<>
							<ModalHeader className='flex flex-col text-center gap-1'>
								<h2>{server.hostname}</h2>
								<span className='font-normal text-foreground-700 text-sm'>
									{server.map}
									<br />
									{typeof server.players === 'number' ? server.players : server.players.length}/
									{server.maxPlayers} Players
								</span>
							</ModalHeader>
							<ModalBody>
								<Table>
									<TableHeader>
										<TableColumn key='userId'>#</TableColumn>
										<TableColumn key='playerName'>Player</TableColumn>
										<TableColumn key='steam64'>SteamID</TableColumn>
										<TableColumn key='kills'>Kills</TableColumn>
										<TableColumn key='deaths'>Deaths</TableColumn>
										<TableColumn key='mvps'>MVP</TableColumn>
										<TableColumn key='score'>Score</TableColumn>
										<TableColumn key='ping'>Ping</TableColumn>
										<TableColumn key='admin'>Admin</TableColumn>
									</TableHeader>
									<TableBody items={typeof server.players !== 'number' ? server.players : []}>
										{(item) => (
											<TableRow
												key={item.userId}
												onContextMenu={(e) =>
													(admin && handleOpen && handleOpen(e, item)) || undefined
												}
											>
												{(columnKey) => (
													<TableCell>
														{renderCell(item, columnKey as keyof PlayerInfo)}
													</TableCell>
												)}
											</TableRow>
										)}
									</TableBody>
								</Table>
								{admin && (
									<span className='text-sm'>
										Tip, your can right click on a player row for more actions, such as kick, ban,
										and more!
									</span>
								)}
							</ModalBody>
							<ModalFooter>
								{admin && (
									<Button
										color='secondary'
										variant='flat'
										onPress={() => setChatModal({ open: true, server })}
									>
										Open Chat
									</Button>
								)}
								<Button
									color='danger'
									variant='flat'
									onPress={onClose}
								>
									Close
								</Button>
								<Link
									href={`steam://connect/${server.address}`}
									passHref
								>
									<Button color='primary'>Connect</Button>
								</Link>
							</ModalFooter>
						</>
					)
				}
			</ModalContent>
			{admin && (
				<ConfirmationModal
					open={action === 'kick'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Kick'
				>
					<div>Are you sure you want to kick {selectedPlayer?.playerName}?</div>
					<Input
						placeholder='Reason'
						value={(details as z.infer<typeof serverKickSchema>) || ''}
						onValueChange={(reason) => setDetails(reason)}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'ban'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Ban'
				>
					<div>Are you sure you want to ban {selectedPlayer?.playerName}?</div>
					<Input
						placeholder='Reason'
						value={(details as z.infer<typeof serverBanSchema>)?.reason || ''}
						onValueChange={(reason) =>
							setDetails({ ...(details as z.infer<typeof serverBanSchema>), reason })
						}
					/>
					<Input
						placeholder='Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof serverBanSchema>)?.duration?.toString() || ''}
						onValueChange={(duration) =>
							setDetails({ ...(details as z.infer<typeof serverBanSchema>), duration: Number(duration) })
						}
						description='Time in minutes, 0 = Permanent ban'
					/>

					<div className='flex flex-col text-xs'>
						<span>
							The ban will start at <b>{GetDateTimeString()}</b>
						</span>
						<span>
							the ban will end at{' '}
							<b>
								{(details as z.infer<typeof serverBanSchema>)?.duration?.toString() === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date().getTime() +
											Number((details as z.infer<typeof serverBanSchema>)?.duration) * 60000
									)
								)}
							</b>
						</span>
					</div>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'mute'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Mute'
				>
					<div>Are you sure you want to mute {selectedPlayer?.playerName}?</div>
					<Input
						placeholder='Reason'
						value={(details as z.infer<typeof serverMuteSchema>)?.reason || ''}
						onValueChange={(reason) =>
							setDetails({ ...(details as z.infer<typeof serverMuteSchema>), reason })
						}
					/>
					<Select
						label='Type'
						placeholder='Select the mute type'
						selectedKeys={[(details as z.infer<typeof serverMuteSchema>)?.type]}
						onChange={(newType) =>
							setDetails({
								...(details as z.infer<typeof serverMuteSchema>),
								type: newType.target.value as z.infer<typeof serverMuteSchema>['type'],
							})
						}
						disallowEmptySelection
					>
						{MUTE_OPTIONS.map((option) => (
							<SelectItem
								key={option.value}
								value={option.value}
							>
								{option.name}
							</SelectItem>
						))}
					</Select>
					<Input
						placeholder='Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof serverMuteSchema>)?.duration?.toString() || ''}
						onValueChange={(duration) =>
							setDetails({ ...(details as z.infer<typeof serverMuteSchema>), duration: Number(duration) })
						}
						description='Time in minutes, 0 = Permanent mute'
					/>

					<div className='flex flex-col text-xs'>
						<span>
							The mute will start again at <b>{GetDateTimeString()}</b>
						</span>
						<span>
							the mute will end at{' '}
							<b>
								{(details as z.infer<typeof serverMuteSchema>)?.duration?.toString() === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date().getTime() +
											Number((details as z.infer<typeof serverMuteSchema>)?.duration) * 60000
									)
								)}
							</b>
						</span>
					</div>
				</ConfirmationModal>
			)}
			{admin && (
				<ContextMenu
					open={contextMenuOpen}
					x={x}
					y={y}
					handleCloseMenu={handleCloseMenu}
					items={[
						{
							category: 'Player Actions',
							items: [
								{
									key: 'Kick',
									description: 'Kick the player from the server',
									icon: IconBan,
									color: 'default',
									onClick: () => {
										setAction('kick')
										setDetails('')
									},
								},
								{
									key: 'Ban',
									description: 'Ban the player from the server for specific time',
									icon: IconBan,
									color: 'danger',
									onClick: () => {
										setAction('ban')
										setDetails({ duration: 0, reason: '' })
									},
								},
								{
									key: 'Mute',
									description: 'Mute the player for specific time',
									icon: IconBan,
									color: 'danger',
									onClick: () => {
										setAction('mute')
										setDetails({ duration: 0, reason: '', type: 'MUTE' })
									},
								},
							],
						},
					]}
				/>
			)}
		</Modal>
	)
}

export default ServerModal
