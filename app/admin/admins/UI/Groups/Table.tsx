'use client'

import type { SA_AdminGroup } from '@/utils/types/db/plugin'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { formatDistanceToNow } from 'date-fns'
import { Spinner } from '@nextui-org/spinner'
import { Button } from '@nextui-org/button'
import { toast } from 'react-hot-toast'
import { Chip } from '@nextui-org/chip'
import useSWR, { mutate } from 'swr'
import fetcher from '@/utils/fetcher'
import ConfirmationModal from '@/app/UI/General/DeleteModal'
import useAuth from '@/utils/hooks/useAuth'
import useManageAdminGroupsStore from './Store'
import axios from 'axios'
import { Tooltip } from '@nextui-org/tooltip'

const AdminGroupsTable = () => {
	const { admin } = useAuth()

	const { data, isLoading } = useSWR<SA_AdminGroup[]>(`/api/admin/groups`, fetcher)

	const setEdit = useManageAdminGroupsStore((state) => state.setEdit)
	const deleteGroup = useManageAdminGroupsStore((state) => state.delete)
	const setDelete = useManageAdminGroupsStore((state) => state.setDelete)

	const handleDeleteAdminGroup = async () => {
		if (!deleteGroup) return

		try {
			await axios(`/api/admin/groups/${deleteGroup.id.replace('#', '')}`, {
				method: 'DELETE',
			})

			toast.success(`Succesfully deleted group!`)
			await mutate('/api/admin/groups')
			await mutate('/api/admin/admins')
		} catch (error) {
			toast.error((error as any).response.data ?? `Failed to delete group!`)
		}

		setDelete(null)
	}

	const loadingState = isLoading || !data ? 'loading' : 'idle'

	const renderCell = (item: SA_AdminGroup, columnKey: any) => {
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

			case 'name':
				return <div>{item.name}</div>

			case 'flags':
				return typeof item.flags !== 'string' ? (
					item.flags ? (
						item.flags.length > 2 ? (
							<Tooltip
								content={item.flags.join('\n')}
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
								{item.flags.join(', ')}
							</Chip>
						)
					) : (
						''
					)
				) : (
					item.flags
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

			case 'created':
				return <>{formatDistanceToNow(new Date(item['created'] || ''))} ago</>

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
							Edit Admin Group
						</Button>
						<Button
							size='sm'
							variant='flat'
							color='danger'
							onClick={() => setDelete(item)}
							isDisabled={isDisabled}
						>
							<IconTrash size={16} />
							Delete Admin Group
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
					<TableColumn key='name'>Name</TableColumn>
					<TableColumn key='flags'>Flags</TableColumn>
					<TableColumn key='immunity'>Immunity</TableColumn>
					<TableColumn key='created'>Created</TableColumn>
					<TableColumn key='actions'>Actions</TableColumn>
				</TableHeader>
				<TableBody
					loadingContent={<Spinner />}
					loadingState={loadingState}
					isLoading={loadingState === 'loading'}
					items={data ?? []}
				>
					{(item) => (
						<TableRow>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
					)}
				</TableBody>
			</Table>
			<ConfirmationModal
				open={!!deleteGroup}
				onAction={handleDeleteAdminGroup}
				onCancel={() => setDelete(null)}
				title='Delete group'
				text={
					<p>
						Are you sure you want to delete: <b>{deleteGroup?.name}</b> group?
					</p>
				}
			/>
		</>
	)
}

export default AdminGroupsTable
