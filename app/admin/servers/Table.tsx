'use client'

import type { SA_Server } from '@/utils/types/db/plugin'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useCallback } from 'react'
import { Spinner } from '@nextui-org/spinner'
import { Chip } from '@nextui-org/chip'
import { IconEdit, IconMessage, IconTrash } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import { toast } from 'react-hot-toast'
import fetcher from '@/utils/fetcher'
import useSWR, { mutate } from 'swr'
import useManageServersStore from './store'
import ConfirmationModal from '@/app/UI/General/DeleteModal'
import axios from 'axios'
import RconModal from './RconModal'

const ServersTable = () => {
	const setEdit = useManageServersStore((state) => state.setEdit)
	const deleteServer = useManageServersStore((state) => state.delete)
	const setDelete = useManageServersStore((state) => state.setDelete)
	const setRcon = useManageServersStore((state) => state.setRcon)

	const handleDeleteServer = async () => {
		if (!deleteServer) return

		try {
			await axios(`/api/admin/servers/${deleteServer.id}`, {
				method: 'DELETE',
			})

			toast.success(`Succesfully deleted server!`)
			await mutate('/api/admin/servers')
		} catch (error) {
			toast.error((error as any).response.data ?? `Failed to delete server!`)
		}

		setDelete(null)
	}

	const { data, isLoading } = useSWR<SA_Server[]>(`/api/admin/servers`, fetcher, {
		keepPreviousData: true,
	})

	const loadingState = isLoading || data?.length === 0 ? 'loading' : 'idle'

	const renderCell = useCallback((item: SA_Server, columnKey: any) => {
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

			case 'hostname':
			case 'address':
				return <div>{item[columnKey as keyof SA_Server]}</div>

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
							Edit Server
						</Button>
						<Button
							size='sm'
							variant='flat'
							color='danger'
							onClick={() => setDelete(item)}
						>
							<IconTrash size={16} />
							Delete Server
						</Button>
						<Button
							size='sm'
							variant='flat'
							color='default'
							onClick={() => setRcon(item.id)}
						>
							<IconMessage size={16} />
							RCON
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
					<TableColumn key='hostname'>Hostname</TableColumn>
					<TableColumn key='address'>Address</TableColumn>
					<TableColumn key='actions'>Actions</TableColumn>
				</TableHeader>
				<TableBody
					items={data ?? []}
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
				open={!!deleteServer}
				onAction={handleDeleteServer}
				onCancel={() => setDelete(null)}
				title='Delete server'
				text={
					<p>
						Are you sure you want to delete: <b>{deleteServer?.hostname}</b> server?
					</p>
				}
			/>
			<RconModal />
		</>
	)
}

export default ServersTable
