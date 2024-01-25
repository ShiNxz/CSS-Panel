'use client'

import type { API_BANS, ExtBan } from '@/pages/api/bans'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useCallback, useMemo, useState } from 'react'
import { Pagination } from '@nextui-org/pagination'
import { Progress } from '@nextui-org/progress'
import { Spinner } from '@nextui-org/spinner'
import { Tooltip } from '@nextui-org/tooltip'
import { User } from '@nextui-org/user'
import { Chip } from '@nextui-org/chip'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Status from './Status'

const BansTable = () => {
	const [page, setPage] = useState(1)
	const [rowsPerPage] = useState(10)

	const { data, isLoading } = useSWR<API_BANS>(`/api/bans?page=${page}&rows=${rowsPerPage}`, fetcher, {
		keepPreviousData: true,
	})

	const pages = useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
	}, [data?.count, rowsPerPage])

	const loadingState = isLoading || data?.results.length === 0 ? 'loading' : 'idle'

	const renderCell = useCallback((item: ExtBan, columnKey: any) => {
		switch (columnKey) {
			case 'player_name':
				return (
					<User
						avatarProps={{ radius: 'lg', src: '' }}
						name={item.player_name}
					>
						{item.player_name}
					</User>
				)

			case 'status':
				return Status(item.status)

			case 'reason':
				return (
					<Tooltip
						content={item.reason}
						showArrow
					>
						<div className='text-xs font-light'>{item.reason.slice(0, 25)}</div>
					</Tooltip>
				)

			case 'duration':
				return (
					<Chip
						color='primary'
						size='sm'
						variant='flat'
						radius='sm'
					>
						{item.duration === 0 ? 'Permanent' : `${item.duration} minutes`}
					</Chip>
				)

			case 'timeLeft':
				const duration = item.duration
				if (duration === 0) {
					return (
						<Chip
							color='danger'
							size='sm'
							variant='flat'
							radius='sm'
						>
							Permanent
						</Chip>
					)
				}

				const currentDate = new Date()
				const startDate = new Date(item.created)
				const endDate = new Date(item.ends)
				const percentage = Math.round(
					((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
				)

				const color = percentage < 50 ? 'warning' : percentage >= 100 ? 'success' : 'primary'

				return (
					<Progress
						color={color}
						value={percentage}
						isStriped
					/>
				)

			// case 'actions':
			// 	return (
			// 		<div className='relative flex items-center gap-2'>
			// 			<Tooltip content='Details'>
			// 				<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
			// 					<EyeIcon />
			// 				</span>
			// 			</Tooltip>
			// 			<Tooltip content='Edit user'>
			// 				<span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
			// 					<EditIcon />
			// 				</span>
			// 			</Tooltip>
			// 			<Tooltip
			// 				color='danger'
			// 				content='Delete user'
			// 			>
			// 				<span className='text-lg text-danger cursor-pointer active:opacity-50'>
			// 					<DeleteIcon />
			// 				</span>
			// 			</Tooltip>
			// 		</div>
			// 	)
			default:
				return <></>
		}
	}, [])

	return (
		<Table
			topContent={
				<div className='text-start'>
					<h1 className='text-2xl font-bold'>Bans</h1>
					<code className='text-sm font-normal'>total: {data?.count || ''}</code>
				</div>
			}
			bottomContent={
				pages > 0 ? (
					<div className='flex w-full justify-center'>
						<Pagination
							color='primary'
							page={page}
							total={pages}
							onChange={(page) => setPage(page)}
							size='sm'
							isCompact
							showControls
							showShadow
						/>
					</div>
				) : null
			}
		>
			<TableHeader>
				<TableColumn key='player_name'>Player</TableColumn>
				<TableColumn key='status'>Status</TableColumn>
				<TableColumn key='reason'>Reason</TableColumn>
				<TableColumn key='duration'>Duration</TableColumn>
				<TableColumn key='timeLeft'>Time left</TableColumn>
			</TableHeader>
			<TableBody
				items={data?.results ?? []}
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
	)
}

export default BansTable
