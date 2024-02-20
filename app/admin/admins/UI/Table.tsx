'use client'

import type { SA_Admin, SA_AdminGroup, SA_Server } from '@/utils/types/db/plugin'
import type { Flag } from '@/utils/types/db/css'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { Tooltip } from '@nextui-org/tooltip'
import { Spinner } from '@nextui-org/spinner'
import { Button } from '@nextui-org/button'
import { toast } from 'react-hot-toast'
import { Chip } from '@nextui-org/chip'
import useSWR, { mutate } from 'swr'
import fetcher from '@/utils/fetcher'
import ConfirmationModal from '@/app/UI/General/DeleteModal'
import useAuth from '@/utils/hooks/useAuth'
import useManageAdminsStore from './store'
import Link from 'next/link'
import axios from 'axios'

const AdminsTable = () => {
	const setServers = useManageAdminsStore((state) => state.setServers)
	const { admin } = useAuth()

	const { data, isLoading } = useSWR<{ admins: SA_Admin[]; servers: SA_Server[]; groups: SA_AdminGroup[] }>(
		`/api/admin/admins`,
		fetcher
	)

	useEffect(() => {
		data && setServers(data?.servers ?? [])
	}, [data, setServers])

	const setEdit = useManageAdminsStore((state) => state.setEdit)
	const deleteAdmin = useManageAdminsStore((state) => state.delete)
	const setDelete = useManageAdminsStore((state) => state.setDelete)

	const handleDeleteAdmin = async () => {
		if (!deleteAdmin) return

		try {
			await axios(`/api/admin/admins/${deleteAdmin.id}`, {
				method: 'DELETE',
			})

			toast.success(`Succesfully deleted admin!`)
			await mutate('/api/admin/admins')
			await mutate('/api/admin/groups')
		} catch (error) {
			toast.error((error as any).response.data ?? `Failed to delete admin!`)
		}

		setDelete(null)
	}

	const loadingState = isLoading || !data?.servers || !data?.admins ? 'loading' : 'idle'

	const renderCell = (item: SA_Admin, columnKey: any) => {
		switch (columnKey) {
			case 'id':
				return (
					<Chip
						variant='flat'
						size='sm'
					>
						{item.id}
					</Chip>
				)

			case 'group': {
				const group =
					typeof item.flags === 'string' && item.flags.startsWith('#')
						? data?.groups.find((g) => g.id === item.flags)
						: null

				return group ? (
					<>
						{group.name} ({group.id})
					</>
				) : (
					<>-</>
				)
			}

			case 'server': {
				if (!item.server_id) return <>ALL</>
				if (item.server_id.length > 1) {
					const servers = item.server_id.map(
						(id) => data?.servers.find((s) => s.id.toString() === id)?.hostname
					)

					return (
						<Tooltip
							content={servers.join('\n')}
							className='whitespace-pre-wrap'
							closeDelay={50}
							color='primary'
						>
							<Chip
								variant='flat'
								size='sm'
								color='primary'
							>
								{servers.length} Servers
							</Chip>
						</Tooltip>
					)
				}

				const server = data?.servers.find((s) => s.id == (item.server_id || 0))

				return (
					<Chip
						variant='flat'
						size='sm'
					>
						{server?.hostname ?? 'Unknown'}
					</Chip>
				)
			}

			case 'player_name':
				return <div>{item.player_name}</div>

			case 'player_steamid':
				return (
					<Link
						href={`https://steamcommunity.com/profiles/${item[columnKey as keyof SA_Admin]}`}
						target='_blank'
					>
						{item.player_steamid}
					</Link>
				)

			case 'flags':
				const group =
					typeof item.flags === 'string' && item.flags.startsWith('#')
						? data?.groups.find((group) => group.id === item.flags)
						: null

				const flags =
					(group && typeof group.flags !== 'string' ? group.flags.join(', ') : group?.flags) ||
					(item.flags as Flag[]).join(', ')

				return group ? (
					<Tooltip
						content={flags}
						closeDelay={50}
						color='secondary'
						className='whitespace-pre-wrap'
					>
						<Chip
							variant='flat'
							size='sm'
							color='secondary'
						>
							{group.flags.length} Flags from {group?.name}
						</Chip>
					</Tooltip>
				) : item.flags.length > 2 ? (
					<Tooltip
						content={(item.flags as Flag[]).join('\n')}
						closeDelay={50}
						color='primary'
						className='whitespace-pre-wrap'
					>
						<Chip
							variant='flat'
							size='sm'
							color='primary'
						>
							{item.flags.length} Flags
						</Chip>
					</Tooltip>
				) : (
					<Chip
						variant='flat'
						size='sm'
					>
						{(item.flags as Flag[]).join(', ')}
					</Chip>
				)

			case 'immunity':
				return (
					<Chip
						variant='flat'
						size='sm'
					>
						{item.immunity}
					</Chip>
				)

			case 'ends':
				return item['ends'] ? formatDistanceToNow(new Date(item['ends'])) : 'Never'

			case 'actions':
				const isDisabled = Number(admin!.immunity) <= Number(item.immunity)
				return (
					<div className='flex items-center gap-2'>
						<Button
							size='sm'
							variant='flat'
							color='primary'
							onClick={() => setEdit(item)}
							isDisabled={isDisabled}
						>
							<IconEdit size={16} />
							Edit Admin
						</Button>
						<Button
							size='sm'
							variant='flat'
							color='danger'
							onClick={() => setDelete(item)}
							isDisabled={isDisabled}
						>
							<IconTrash size={16} />
							Delete Admin
						</Button>
					</div>
				)

			default:
				return <>Error!</>
		}
	}

	return (
		<>
			<Table>
				<TableHeader>
					<TableColumn key='id'>ID</TableColumn>
					<TableColumn key='player_name'>Name</TableColumn>
					<TableColumn key='player_steamid'>SteamId</TableColumn>
					<TableColumn key='group'>Group</TableColumn>
					<TableColumn key='server'>Servers</TableColumn>
					<TableColumn key='immunity'>Immunity</TableColumn>
					<TableColumn key='flags'>Flags / Group</TableColumn>
					<TableColumn key='ends'>Ends</TableColumn>
					<TableColumn key='actions'>Actions</TableColumn>
				</TableHeader>
				<TableBody
					loadingContent={<Spinner />}
					loadingState={loadingState}
					isLoading={loadingState === 'loading'}
					items={data?.admins ?? []}
				>
					{(item) => (
						<TableRow>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
					)}
				</TableBody>
			</Table>
			<ConfirmationModal
				open={!!deleteAdmin}
				onAction={handleDeleteAdmin}
				onCancel={() => setDelete(null)}
				title='Delete admin'
				text={
					<p>
						Are you sure you want to delete: <b>{deleteAdmin?.player_name}</b> admin?
					</p>
				}
			/>
		</>
	)
}

export default AdminsTable
