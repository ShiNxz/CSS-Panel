'use client'

import type { PlayerInfo, SafeServerInfo } from '@/pages/api/servers'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { User } from '@nextui-org/user'
import { Chip } from '@nextui-org/chip'
import { IconBan } from '@tabler/icons-react'
import { useCallback } from 'react'
import useContextMenu from '@/utils/hooks/useContextMenu'
import ContextMenu from '@/app/UI/General/ContextMenu'
import Link from 'next/link'
import useServersStore from './store'
import useAuth from '@/utils/hooks/useAuth'

const ServerModal = () => {
	const modal = useServersStore((state) => state.modal)
	const setModal = useServersStore((state) => state.setModal)

	const { admin } = useAuth()

	const { open, server } = modal
	const handleClose = () => setModal({ ...modal, open: false })

	const { x, y, open: contextMenuOpen, handleCloseMenu, handleOpen } = useContextMenu()

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

			default:
				return <></>
		}
	}, [])

	return (
		<Modal
			size='4xl'
			isOpen={open}
			onOpenChange={() => {
				handleCloseMenu()
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
												onContextMenu={(admin && handleOpen) || undefined}
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
							</ModalBody>
							<ModalFooter>
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
									color: 'danger',
								},
								{
									key: 'Ban',
									description: 'Ban the player from the server for specific time',
									icon: IconBan,
									color: 'danger',
								},
								{
									key: 'Mute',
									description: 'Mute the player for specific time',
									icon: IconBan,
									color: 'danger',
								},
								{
									key: 'Warn',
									description: 'Warn the player',
									icon: IconBan,
									color: 'warning',
								},
							],
						},
					]}
				/>
			)}
		</Modal>
	)
}

interface Props {
	open: boolean
	server: SafeServerInfo | null
	handleClose: () => void
}

export default ServerModal
