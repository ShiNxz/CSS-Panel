'use client'

import type { PlayerInfo } from '@/utils/functions/query/ServerQuery'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { User } from '@nextui-org/user'
import { Chip } from '@nextui-org/chip'
import { IconBan, IconCrown } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { Input } from '@nextui-org/input'
import { mutate } from 'swr'
import useContextMenu from '@/utils/hooks/useContextMenu'
import ContextMenu from '@/app/UI/General/ContextMenu'
import Link from 'next/link'
import useServersStore from '../store'
import useAuth from '@/utils/hooks/useAuth'
import ConfirmationModal from '../../../../General/ConfirmationModal'
import axios from 'axios'
import toast from 'react-hot-toast'

const ServerModal = () => {
	const modal = useServersStore((state) => state.modal)
	const setModal = useServersStore((state) => state.setModal)
	const setChatModal = useServersStore((state) => state.setChatModal)

	const [kickPlayer, setKickPlayer] = useState({
		open: false,
		isLoading: false,
		reason: '',
	})

	const [banPlayer, setBanPlayer] = useState({
		open: false,
		isLoading: false,
		reason: '',
		duration: '0',
	})

	const { admin } = useAuth()

	const { open, server } = modal
	const handleClose = () => setModal({ ...modal, open: false })

	const handleKickPlayer = async () => {
		if (!kickPlayer.open || kickPlayer.isLoading || !server || !selectedPlayer) return

		setKickPlayer((prev) => ({ ...prev, isLoading: true }))

		try {
			await axios.post(`/api/servers/${server.id}/action`, {
				action: 'kick',
				userId: selectedPlayer.userId,
				details: kickPlayer.reason,
			})

			await mutate(`/api/servers/${server.id}`)
			setKickPlayer((prev) => ({ ...prev, open: false, reason: '' }))
			toast.success('Player kicked successfully')
		} catch (error) {
			toast.error('Error kicking player')
		}

		setKickPlayer((prev) => ({ ...prev, isLoading: false }))
	}

	const handleBanPlayer = async () => {
		if (!banPlayer.open || banPlayer.isLoading || !server || !selectedPlayer) return

		setBanPlayer((prev) => ({ ...prev, isLoading: true }))

		try {
			await axios.post(`/api/servers/${server.id}/action`, {
				action: 'ban',
				userId: selectedPlayer.userId,
				details: { reason: banPlayer.reason, duration: Number(banPlayer.duration) },
			})

			await mutate(`/api/servers/${server.id}`)
			setBanPlayer((prev) => ({ ...prev, open: false, reason: '' }))
			toast.success('Player banned successfully')
		} catch (error) {
			toast.error('Error kicking player')
		}

		setBanPlayer((prev) => ({ ...prev, isLoading: false }))
	}

	const {
		x,
		y,
		open: contextMenuOpen,
		handleCloseMenu,
		handleOpen,
		info: selectedPlayer,
	} = useContextMenu<PlayerInfo>()

	const renderCell = useCallback((player: PlayerInfo, columnKey: keyof PlayerInfo) => {
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
				return <span>{player.admin ? <IconCrown /> : '-'}</span>

			default:
				return <></>
		}
	}, [])

	return (
		<Modal
			size='4xl'
			isOpen={open}
			onOpenChange={() => {
				if (contextMenuOpen) return
				if (kickPlayer.open) return
				handleClose()
			}}
		>
			<ModalContent>
				{(onClose) =>
					server && (
						<>
							<ModalHeader className='flex flex-col text-center gap-1'>
								<h2>{server.hostname}</h2>
								<span className='font-normal text-foreground-700'>
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
								{/* {admin && (
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
								</Link> */}
							</ModalFooter>
						</>
					)
				}
			</ModalContent>
			{admin && (
				<ConfirmationModal
					open={kickPlayer.open}
					handleClose={() => setKickPlayer({ ...kickPlayer, open: false })}
					action={handleKickPlayer}
					isLoading={kickPlayer.isLoading}
					actionText='Kick'
				>
					<div>Are you sure you want to kick {selectedPlayer?.playerName}?</div>
					<Input
						placeholder='Reason'
						value={kickPlayer.reason}
						onValueChange={(reason) => setKickPlayer({ ...kickPlayer, reason })}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={banPlayer.open}
					handleClose={() => setBanPlayer({ ...banPlayer, open: false })}
					action={handleBanPlayer}
					isLoading={banPlayer.isLoading}
					actionText='Ban'
				>
					<div>Are you sure you want to ban {selectedPlayer?.playerName}?</div>
					<Input
						placeholder='Reason'
						value={banPlayer.reason}
						onValueChange={(reason) => setBanPlayer({ ...banPlayer, reason })}
					/>
					<Input
						placeholder='Time (in minutes)'
						type='number'
						value={banPlayer.duration}
						onValueChange={(duration) => setBanPlayer({ ...banPlayer, duration })}
					/>
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
							category: 'Player Actions (Coming Soon!)',
							items: [
								{
									key: 'Kick',
									description: 'Kick the player from the server',
									icon: IconBan,
									color: 'default',
									onClick: () => setKickPlayer({ ...kickPlayer, open: true }),
								},
								{
									key: 'Ban',
									description: 'Ban the player from the server for specific time',
									icon: IconBan,
									color: 'danger',
									onClick: () => setBanPlayer({ ...banPlayer, open: true }),
								},
								{
									key: 'Mute',
									description: 'Mute the player for specific time',
									icon: IconBan,
									color: 'danger',
									onClick: () => toast.error('Coming soon!'),
								},
								{
									key: 'Warn',
									description: 'Warn the player',
									icon: IconBan,
									color: 'warning',
									onClick: () => toast.error('Coming soon!'),
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
