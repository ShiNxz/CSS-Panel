'use client'

import type { SA_Admin, SA_Server } from '@/utils/types/db/plugin'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useCallback, useEffect } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { Chip } from '@nextui-org/chip'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'
import fetcher from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import useManageAdminsStore from './store'
import ConfirmationModal from '@/app/UI/General/DeleteModal'
import axios from 'axios'
import Link from 'next/link'

const AdminsTable = () => {
	const setServers = useManageAdminsStore((state) => state.setServers)

	const { data, isLoading } = useSWR<{ admins: SA_Admin[]; servers: SA_Server[] }>(`/api/admin/admins`, fetcher, {
		keepPreviousData: true,
	})

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
		} catch (error) {
			toast.error((error as any).response.data ?? `Failed to delete admin!`)
		}

		setDelete(null)
	}

	const loadingState = isLoading || !data?.servers || data?.admins?.length === 0 ? 'loading' : 'idle'

	const renderCell = useCallback((item: SA_Admin, columnKey: any) => {
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

			case 'role':
				return <>Future</>

			case 'server': {
				if (!item.server_id) return <>ALL</>
				console.log(data?.servers)
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
				return <div>{item[columnKey as keyof SA_Admin]}</div>

			case 'player_steamid':
				return (
					<Link
						href={`https://steamcommunity.com/profiles/${item[columnKey as keyof SA_Admin]}`}
						target='_blank'
					>
						{item[columnKey as keyof SA_Admin]}
					</Link>
				)

			case 'flags':
			case 'immunity':
				return (
					<Chip
						variant='flat'
						size='sm'
					>
						{item[columnKey as keyof SA_Admin]}
					</Chip>
				)

			case 'ends':
				return item['ends'] ? formatDistanceToNow(new Date(item['ends'])) : 'Never'

			case 'actions':
				return (
					<div className='flex items-center gap-2'>
						<Button
							size='sm'
							variant='flat'
							color='primary'
							onClick={() => setEdit(item)}
						>
							<IconEdit size={16} />
							Edit Admin
						</Button>
						<Button
							size='sm'
							variant='flat'
							color='danger'
							onClick={() => setDelete(item)}
						>
							<IconTrash size={16} />
							Delete Admin
						</Button>
					</div>
				)

			default:
				return <>Error!</>
		}
	}, [])

	return (
		<>
			<Table>
				<TableHeader>
					<TableColumn key='id'>ID</TableColumn>
					<TableColumn key='player_name'>Name</TableColumn>
					<TableColumn key='player_steamid'>SteamId</TableColumn>
					<TableColumn key='role'>Role</TableColumn>
					<TableColumn key='server'>Server / Group</TableColumn>
					<TableColumn key='immunity'>Immunity</TableColumn>
					<TableColumn key='flags'>Flags</TableColumn>
					<TableColumn key='ends'>Ends</TableColumn>
					<TableColumn key='actions'>Actions</TableColumn>
				</TableHeader>
				<TableBody
					items={data?.admins ?? []}
					loadingContent={<Spinner />}
					loadingState={loadingState}
				>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
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
