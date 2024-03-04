'use client'

import type { TableType } from '../Mutes'
import type { API_BANS, ExtBan } from '@/pages/api/bans'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { IconBan, IconMessage, IconPlus, IconTrash } from '@tabler/icons-react'
import { useMemo, useState } from 'react'
import { Pagination } from '@nextui-org/pagination'
import { Progress } from '@nextui-org/progress'
import { Spinner } from '@nextui-org/spinner'
import { Tooltip } from '@nextui-org/tooltip'
import { usePathname } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Chip } from '@nextui-org/chip'
import { User } from '@nextui-org/user'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Status from './Status'
import Link from 'next/link'
import useContextMenu from '@/utils/hooks/useContextMenu'
import useAuth from '@/utils/hooks/useAuth'
import ContextMenu from '@/app/UI/General/ContextMenu'
import ConfirmationModal from '@/app/UI/General/ConfirmationModal'
import axios from 'axios'
import toast from 'react-hot-toast'
import GetDateTimeString from '@/utils/functions/GetDateTimeString'
import BanModal from './Modal'
import useActionStore, { commentSchema, reBanSchema } from './Store'
import { z } from 'zod'

const BansTable = ({ type }: { type: TableType }) => {
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(1)

	let rowsPerPage = 10
	const pathname = usePathname()
	if (pathname === '/') rowsPerPage = 5

	const {
		data,
		isLoading: isBansLoading,
		mutate,
	} = useSWR<API_BANS>(`/api/bans?page=${page}&rows=${rowsPerPage}`, fetcher, {
		keepPreviousData: true,
	})

	const pages = useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
	}, [data?.count, rowsPerPage])

	const { admin } = useAuth()
	const { x, y, open: contextMenuOpen, handleCloseMenu, handleOpen, info: selectedBan } = useContextMenu<ExtBan>()

	const action = useActionStore((state) => state.action)
	const setAction = useActionStore((state) => state.setAction)
	const details = useActionStore((state) => state.details)
	const setDetails = useActionStore((state) => state.setDetails)
	const isLoading = useActionStore((state) => state.isLoading)
	const setIsLoading = useActionStore((state) => state.setIsLoading)
	const reset = useActionStore((state) => state.reset)

	const handleAction = async () => {
		if (!action || isLoading || !selectedBan) return

		setIsLoading(true)

		try {
			await axios.post(`/api/bans/${selectedBan.id}`, {
				action,
				details,
			})

			await mutate()
			reset()
			toast.success(`Player ${action}ed successfully`)
		} catch (error) {
			toast.error(`Error ${action} player`)
		}

		setIsLoading(false)
	}

	const loadingState = isBansLoading ? 'loading' : 'idle'

	const renderCell = (item: ExtBan, columnKey: any) => {
		switch (columnKey) {
			case 'player_name':
				return (
					<Link
						href={`https://steamcommunity.com/profiles/${item.player_steamid}`}
						target='_blank'
						passHref
					>
						<User
							avatarProps={{ radius: 'lg', src: item.player_avatar || '' }}
							name={item.player_name}
						>
							{item.player_name?.slice(0, 10)}
						</User>
					</Link>
				)

			case 'status':
				return Status(item.status)

			case 'reason':
				return item.reason.length > 10 ? (
					<Tooltip
						content={item.reason}
						showArrow
					>
						<div className='text-xs font-light'>{item.reason.slice(0, 10)}</div>
					</Tooltip>
				) : (
					<div className='text-xs font-light'>{item.reason}</div>
				)

			case 'unban_reason':
				return item.unban_reason && item.unban_reason.length > 10 ? (
					<Tooltip
						content={item.unban_reason}
						showArrow
					>
						<div className='text-xs font-light'>{item.unban_reason?.slice(0, 10)}</div>
					</Tooltip>
				) : (
					<div className='text-xs font-light'>{item.unban_reason}</div>
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

			case 'admin_name':
				return item.admin_name ? (
					item.admin_name === 'Console' ? (
						<Chip
							color='danger'
							size='sm'
							variant='flat'
							radius='sm'
						>
							Console
						</Chip>
					) : (
						<Link
							href={`https://steamcommunity.com/profiles/${item.admin_steamid}`}
							target='_blank'
							passHref
						>
							<User
								avatarProps={{ radius: 'lg', src: item.admin_avatar || '' }}
								name={item.admin_name}
							>
								{item.admin_name}
							</User>
						</Link>
					)
				) : (
					<>-</>
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

				if (item.status === 'UNBANNED' || item.status === 'EXPIRED')
					return (
						<Progress
							color='success'
							value={100}
							isStriped
						/>
					)

				const currentDate = new Date()
				const startDate = new Date(item.created)
				const endDate = new Date(item.ends)
				const percentage = Math.round(
					((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
				)

				const minutesLeft = Math.round((endDate.getTime() - currentDate.getTime()) / 60000)

				const color = percentage < 50 ? 'warning' : percentage >= 100 ? 'success' : 'primary'

				return minutesLeft > 0 ? (
					<Tooltip
						content={`${minutesLeft} minutes left`}
						color={color}
						showArrow
					>
						<Progress
							color={color}
							value={percentage}
							isStriped
						/>
					</Tooltip>
				) : (
					<Progress
						color={color}
						value={percentage}
						isStriped
					/>
				)

			case 'comment': {
				return item.comment ? (
					item.comment.length > 10 ? (
						<Tooltip
							content={item.comment}
							showArrow
						>
							<div className='text-xs font-light'>{item.comment?.slice(0, 10)}</div>
						</Tooltip>
					) : (
						<div className='text-xs font-light'>{item.comment?.slice(0, 10)}</div>
					)
				) : (
					<>-</>
				)
			}

			default:
				return <></>
		}
	}

	// Normal Table
	let TableH = (
		<TableHeader>
			<TableColumn key='player_name'>Player</TableColumn>
			<TableColumn key='status'>Status</TableColumn>
			<TableColumn key='admin_name'>Admin</TableColumn>
			<TableColumn key='reason'>Reason</TableColumn>
			<TableColumn key='unban_reason'>Remove Reason</TableColumn>
			<TableColumn key='duration'>Duration</TableColumn>
			<TableColumn key='timeLeft'>Time left</TableColumn>
			<TableColumn key='comment'>Comment</TableColumn>
		</TableHeader>
	)

	switch (type) {
		case 'MANAGE':
			TableH = (
				<TableHeader>
					<TableColumn key='player_name'>Player</TableColumn>
					<TableColumn key='status'>Status</TableColumn>
					<TableColumn key='admin_name'>Admin</TableColumn>
					<TableColumn key='reason'>Reason</TableColumn>
					<TableColumn key='unban_reason'>Remove Reason</TableColumn>
					<TableColumn key='duration'>Duration</TableColumn>
					<TableColumn key='timeLeft'>Time left</TableColumn>
					<TableColumn key='comment'>Comment</TableColumn>
				</TableHeader>
			)
			break

		case 'SMALL':
			TableH = (
				<TableHeader>
					<TableColumn key='player_name'>Player</TableColumn>
					<TableColumn key='status'>Status</TableColumn>
					<TableColumn key='reason'>Reason</TableColumn>
					<TableColumn key='duration'>Duration</TableColumn>
					<TableColumn key='timeLeft'>Time left</TableColumn>
				</TableHeader>
			)
			break

		case 'NORMAL':
			TableH = (
				<TableHeader>
					<TableColumn key='player_name'>Player</TableColumn>
					<TableColumn key='status'>Status</TableColumn>
					<TableColumn key='admin_name'>Admin</TableColumn>
					<TableColumn key='reason'>Reason</TableColumn>
					<TableColumn key='unban_reason'>Remove Reason</TableColumn>
					<TableColumn key='duration'>Duration</TableColumn>
					<TableColumn key='timeLeft'>Time left</TableColumn>
				</TableHeader>
			)
			break
	}

	return (
		<>
			<Table
				topContent={
					<div className='flex flex-row justify-between'>
						<div className='text-start'>
							<h1 className='text-2xl font-bold'>Bans</h1>
							<code className='text-sm font-normal'>total: {data?.count || ''}</code>
						</div>
						{admin && (
							<>
								<Button
									size='sm'
									variant='flat'
									color='primary'
									onClick={() => setOpen(true)}
								>
									<IconPlus />
									New ban
								</Button>
								<BanModal
									open={open}
									setOpen={setOpen}
									mutate={mutate}
								/>
							</>
						)}
					</div>
				}
				bottomContent={
					<>
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
						{admin && type === 'MANAGE' && (
							<span className='text-sm'>Tip, your can right click on a player row for more actions</span>
						)}
					</>
				}
			>
				{TableH}
				<TableBody
					items={data?.results ?? []}
					loadingContent={<Spinner />}
					loadingState={loadingState}
				>
					{(item) => (
						<TableRow
							key={item.id}
							onContextMenu={(e) => (admin && handleOpen && handleOpen(e, item)) || undefined}
						>
							{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
			{admin && (
				<ContextMenu
					open={contextMenuOpen}
					x={x}
					y={y}
					handleCloseMenu={handleCloseMenu}
					items={[
						{
							category: 'Ban Actions',
							items: [
								{
									key: 'Comment',
									description: 'Write a comment on this ban, this will be visible to other admins',
									icon: IconMessage,
									color: 'default',
									onClick: () => {
										setAction('comment')
										setDetails({ comment: selectedBan?.comment || '' })
									},
								},
								{
									key:
										selectedBan?.status === 'UNBANNED' || selectedBan?.status === 'EXPIRED'
											? 'Reban'
											: 'Remove Ban (shorten)',
									description:
										selectedBan?.status === 'UNBANNED' || selectedBan?.status === 'EXPIRED'
											? `Reban the player`
											: 'Remove the player ban (shorten the duration)',
									icon: IconBan,
									color: 'default',
									onClick: () => {
										if (selectedBan?.status === 'UNBANNED' || selectedBan?.status === 'EXPIRED') {
											setAction('reban')
											setDetails({ reason: '', duration: '0' })
										} else {
											setAction('unban')
											setDetails({ reason: '' })
										}
									},
								},
								{
									key: 'Edit Ban',
									description: 'Edit the ban duration or reason',
									icon: IconMessage,
									color: 'primary',
									onClick: () => {
										setAction('edit')
										setDetails({
											reason: selectedBan?.reason || '',
											duration: selectedBan?.duration?.toString() || '0',
										})
									},
								},
								{
									key: 'Delete Ban',
									description: 'Delete the ban from the database (permanent action)',
									icon: IconTrash,
									color: 'danger',
									onClick: () => {
										setAction('delete')
									},
								},
							],
						},
					]}
				/>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'comment'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Save'
				>
					<div>Write a comment on this ban, this will be visible to other admins</div>
					<Input
						label='Comment'
						value={(details as z.infer<typeof commentSchema>)?.comment || ''}
						onValueChange={(comment) => setDetails({ comment })}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'unban'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Unban'
				>
					<div>You sure you want to unban the user?</div>
					<Input
						label='Reason'
						value={(details as z.infer<typeof reBanSchema>)?.reason || ''}
						onValueChange={(reason) => setDetails({ reason })}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'reban'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Reban'
				>
					<div>You sure you want to reban the user?</div>
					<Input
						label='Reason'
						value={(details as z.infer<typeof reBanSchema>)?.reason || ''}
						onValueChange={(reason) => setDetails({ ...(details as z.infer<typeof reBanSchema>), reason })}
					/>
					<Input
						label='Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof reBanSchema>)?.duration || ''}
						onValueChange={(duration) =>
							setDetails({ ...(details as z.infer<typeof reBanSchema>), duration })
						}
						description='Time in minutes, 0 = Permanent ban'
					/>

					<div className='flex flex-col text-xs'>
						<span>
							The ban will start again at <b>{GetDateTimeString()}</b>
						</span>
						<span>
							the ban will end at{' '}
							<b>
								{(details as z.infer<typeof reBanSchema>)?.duration === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date().getTime() +
											Number((details as z.infer<typeof reBanSchema>)?.duration) * 60000
									)
								)}
							</b>
						</span>
					</div>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'edit'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Edit'
				>
					<div>This will replace the ban duration or reason</div>
					<Input
						label='Ban Reason'
						value={(details as z.infer<typeof reBanSchema>)?.reason || ''}
						onValueChange={(reason) => setDetails({ ...(details as z.infer<typeof reBanSchema>), reason })}
					/>
					<Input
						label='Ban Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof reBanSchema>)?.duration || ''}
						onValueChange={(duration) =>
							setDetails({ ...(details as z.infer<typeof reBanSchema>), duration })
						}
						description='Time in minutes, this will be added to the current duration, 0 = Permanent ban (will replace the duration)'
					/>

					<div className='flex flex-col text-xs'>
						<span>
							The ban started at <b>{GetDateTimeString(selectedBan?.created)}</b>
						</span>
						<span>
							After the edit, the ban will end at{' '}
							<b>
								{(details as z.infer<typeof reBanSchema>)?.duration === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date(selectedBan?.created || '').getTime() +
											Number((details as z.infer<typeof reBanSchema>)?.duration) * 60000
									)
								)}
							</b>
						</span>
					</div>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'delete'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Delete'
				>
					<div>Are you sure you want to delete the ban? this action is permanent and cannot be undone</div>
				</ConfirmationModal>
			)}
		</>
	)
}

export default BansTable
