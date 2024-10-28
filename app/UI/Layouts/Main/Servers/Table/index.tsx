'use client'

import type { SafeServerInfo } from '@/utils/functions/query/ServerQuery'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { Button } from '@nextui-org/button'
import { IconCopy, IconPlayerPlay, IconShield, IconShieldX } from '@tabler/icons-react'
import { Tooltip } from '@nextui-org/tooltip'
import { Spinner } from '@nextui-org/spinner'
import { toast } from 'react-hot-toast'
import { useCallback } from 'react'
import useServersStore from '../store'
import fetcher from '@/utils/fetcher'
import Link from 'next/link'
import useSWR from 'swr'
import ServerModal from '../Modal'
import ServerChatModal from '../Modal/ServerChatModal'

/**
 * This is a table that shows all the servers, currently it uses swr to fetch **all the data** from the server
 * which is bad, we want to change it to ssr soon and for each row - server, fetch its own data, but as NextUI is dumb sometimes, we cant.
 * todo.
 */
const ServersTable = () => {
	const { data, isLoading, error } = useSWR<SafeServerInfo[]>('/api/servers', fetcher)
	const setModal = useServersStore((state) => state.setModal)

	const loadingState = isLoading || data?.length === 0 ? 'loading' : 'idle'

	const handleOpen = (server: SafeServerInfo) => setModal({ open: true, server })

	const renderCell = useCallback((server: SafeServerInfo, columnKey: any) => {
		const { game, map, maxPlayers, players, vac, address, playersPercentage, hostname } = server

		/**
		 * If the players prop is a number, it means that the server info isn't from RCON
		 */
		const isRconStatus = typeof players !== 'number'
		const isFull = typeof players === 'number' ? players === maxPlayers : players.length === maxPlayers

		const handleCopy = () => {
			if (isFull) return toast.error('Server is full!')

			navigator.clipboard.writeText(address)
			toast.success('Copied to clipboard!')
		}

		switch (columnKey) {
			case 'hostname':
				return <span>{hostname}</span>

			case 'game':
				return <span>{game}</span>

			case 'map':
				return <span>{map}</span>

			case 'players':
				return (
					<span>
						{isRconStatus ? players.length : players}/{maxPlayers}
					</span>
				)

			case 'vac':
				return vac !== null ? (
					<Tooltip
						content={vac ? 'The server is secured by VAC' : 'Not VAC Secured'}
						showArrow
					>
						<Button
							className='text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2'
							variant='light'
							radius='full'
							size='sm'
							isIconOnly
						>
							{vac ? <IconShield size={20} /> : <IconShieldX />}
						</Button>
					</Tooltip>
				) : (
					<></>
				)

			case 'actions':
				return (
					<div className='flex flex-row gap-2'>
						<Button
							onClick={handleCopy}
							color='secondary'
							variant='flat'
							size='sm'
						>
							<IconCopy size={16} />
							{address}
						</Button>
						<Link
							href={`steam://connect/${address}`}
							passHref
						>
							<Button
								color='primary'
								variant='solid'
								size='sm'
							>
								<IconPlayerPlay size={16} />
								Connect
							</Button>
						</Link>
					</div>
				)

			default:
				return <></>
		}
	}, [])

	return (
		<>
			<Table
				topContent={
					<div className='text-start'>
						<h1 className='text-2xl font-bold'>Servers</h1>
						<code className='text-sm font-normal'>total: {data?.length || 0}</code>
					</div>
				}
			>
				<TableHeader>
					<TableColumn key='hostname'>Server Name</TableColumn>
					<TableColumn key='game'>Game</TableColumn>
					<TableColumn key='map'>Map</TableColumn>
					<TableColumn key='players'>Players</TableColumn>
					<TableColumn key='vac'>VAC</TableColumn>
					<TableColumn key='actions'>Actions</TableColumn>
				</TableHeader>
				<TableBody
					items={data || []}
					loadingContent={<Spinner />}
					loadingState={loadingState}
				>
					{error ? (
						<TableRow>
							<TableCell colSpan={6}>
								<div className='text-center'>Error fetching servers</div>
							</TableCell>
						</TableRow>
					) : (
						(server) => (
							<TableRow
								key={server.address}
								className='cursor-pointer'
								onClick={() => handleOpen(server)}
							>
								{(columnKey) => (
									<TableCell>{renderCell(server, columnKey as keyof SafeServerInfo)}</TableCell>
								)}
							</TableRow>
						)
					)}
				</TableBody>
			</Table>
			<ServerModal />
			<ServerChatModal />
		</>
	)
}

export default ServersTable
