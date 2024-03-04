'use client'

import type { API_MUTES, ExtMute } from '@/pages/api/mutes'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/table'
import { useMemo, useState } from 'react'
import { Select, SelectItem } from '@nextui-org/select'
import { Pagination } from '@nextui-org/pagination'
import { Progress } from '@nextui-org/progress'
import { Spinner } from '@nextui-org/spinner'
import { Tooltip } from '@nextui-org/tooltip'
import { User } from '@nextui-org/user'
import { Input } from '@nextui-org/input'
import { Chip } from '@nextui-org/chip'
import { usePathname } from 'next/navigation'
import { IconBan, IconMessage, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from '@nextui-org/button'
import fetcher from '@/utils/fetcher'
import useSWR from 'swr'
import Status from './Status'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import GetDateTimeString from '@/utils/functions/GetDateTimeString'
import useAuth from '@/utils/hooks/useAuth'
import useContextMenu from '@/utils/hooks/useContextMenu'
import ContextMenu from '@/app/UI/General/ContextMenu'
import ConfirmationModal from '@/app/UI/General/ConfirmationModal'
import MuteModal from './Modal'
import useActionStore, { commentSchema, editMuteSchema, reMuteSchema, unMuteSchema } from './Store'
import { z } from 'zod'

export type TableType = 'SMALL' | 'NORMAL' | 'MANAGE'
export const MUTE_OPTIONS = [
	{
		name: 'Gag (Chat)',
		value: 'GAG',
	},
	{
		name: 'Mute (Voice)',
		value: 'MUTE',
	},
	{
		name: 'Silence (Both)',
		value: 'SILENCE',
	},
]

const MutesTable = ({ type }: { type: TableType }) => {
	const [open, setOpen] = useState(false)
	const [page, setPage] = useState(1)
	let rowsPerPage = 10
	const pathname = usePathname()
	if (pathname === '/') rowsPerPage = 5

	const {
		data,
		isLoading: isMutesLoading,
		mutate,
	} = useSWR<API_MUTES>(`/api/mutes?page=${page}&rows=${rowsPerPage}`, fetcher, {
		keepPreviousData: true,
	})

	const pages = useMemo(() => {
		return data?.count ? Math.ceil(data.count / rowsPerPage) : 0
	}, [data?.count, rowsPerPage])

	const { admin } = useAuth()
	const { x, y, open: contextMenuOpen, handleCloseMenu, handleOpen, info: selectedMute } = useContextMenu<ExtMute>()

	const action = useActionStore((state) => state.action)
	const setAction = useActionStore((state) => state.setAction)
	const details = useActionStore((state) => state.details)
	const setDetails = useActionStore((state) => state.setDetails)
	const isLoading = useActionStore((state) => state.isLoading)
	const setIsLoading = useActionStore((state) => state.setIsLoading)
	const reset = useActionStore((state) => state.reset)

	const handleAction = async () => {
		if (!action || isLoading || !selectedMute) return

		setIsLoading(true)

		try {
			await axios.post(`/api/mutes/${selectedMute.id}`, {
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

	const loadingState = isMutesLoading ? 'loading' : 'idle'

	const renderCell = (item: ExtMute, columnKey: any) => {
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

			case 'unmute_reason':
				return item.unmute_reason && item.unmute_reason.length > 10 ? (
					<Tooltip
						content={item.unmute_reason}
						showArrow
					>
						<div className='text-xs font-light'>{item.unmute_reason?.slice(0, 10)}</div>
					</Tooltip>
				) : (
					<div className='text-xs font-light'>{item.unmute_reason}</div>
				)

			case 'type':
				return (
					<Chip
						color='secondary'
						size='sm'
						variant='flat'
						radius='sm'
					>
						{item.type}
					</Chip>
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

				if (item.status === 'UNMUTED' || item.status === 'EXPIRED')
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
				const percentage =
					Math.round(
						((currentDate.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) *
							100
					) || 0

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
						<div className='text-xs font-light'>{item.comment}</div>
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
			<TableColumn key='type'>Type</TableColumn>
			<TableColumn key='reason'>Reason</TableColumn>
			<TableColumn key='unmute_reason'>Remove Reason</TableColumn>
			<TableColumn key='duration'>Duration</TableColumn>
			<TableColumn key='timeLeft'>Time left</TableColumn>
		</TableHeader>
	)

	switch (type) {
		case 'MANAGE':
			TableH = (
				<TableHeader>
					<TableColumn key='player_name'>Player</TableColumn>
					<TableColumn key='status'>Status</TableColumn>
					<TableColumn key='admin_name'>Admin</TableColumn>
					<TableColumn key='type'>Type</TableColumn>
					<TableColumn key='reason'>Reason</TableColumn>
					<TableColumn key='unmute_reason'>Remove Reason</TableColumn>
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
					<TableColumn key='type'>Type</TableColumn>
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
					<TableColumn key='type'>Type</TableColumn>
					<TableColumn key='reason'>Reason</TableColumn>
					<TableColumn key='unmute_reason'>Remove Reason</TableColumn>
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
							<h1 className='text-2xl font-bold'>Mutes</h1>
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
									New mute
								</Button>
								<MuteModal
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
							category: 'Mute Actions',
							items: [
								{
									key: 'Comment',
									description: 'Write a comment on this mute, this will be visible to other admins',
									icon: IconMessage,
									color: 'default',
									onClick: () => {
										setAction('comment')
										setDetails({ comment: selectedMute?.comment || '' })
									},
								},
								{
									key:
										selectedMute?.status === 'UNMUTED' || selectedMute?.status === 'EXPIRED'
											? 'Re-mute'
											: 'Remove Mute (shorten)',
									description:
										selectedMute?.status === 'UNMUTED' || selectedMute?.status === 'EXPIRED'
											? `Re-mute the player`
											: 'Remove the player mute (shorten the duration)',
									icon: IconBan,
									color: 'default',
									onClick: () => {
										if (selectedMute?.status === 'UNMUTED' || selectedMute?.status === 'EXPIRED') {
											setAction('remute')
											setDetails({
												reason: '',
												duration: '0',
												type: 'MUTE',
											})
										} else {
											setAction('unmute')
											setDetails({ reason: '' })
										}
									},
								},
								{
									key: 'Edit Mute',
									description: 'Edit the mute duration or reason',
									icon: IconMessage,
									color: 'primary',
									onClick: () => {
										setAction('edit')
										setDetails({
											reason: selectedMute?.reason || '',
											duration: selectedMute?.duration.toString() || '0',
											type: selectedMute?.type || 'MUTE',
										})
									},
								},
								{
									key: 'Delete Mute',
									description: 'Delete the mute from the database (permanent action)',
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
					<div>Write a comment on this mute, this will be visible to other admins</div>
					<Input
						label='Comment'
						value={(details as z.infer<typeof commentSchema>)?.comment || ''}
						onValueChange={(comment) => setDetails({ comment })}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'unmute'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Unmute'
				>
					<div>You sure you want to unmute the user?</div>
					<Input
						label='Reason'
						value={(details as z.infer<typeof unMuteSchema>)?.reason || ''}
						onValueChange={(reason) => setDetails({ reason })}
					/>
				</ConfirmationModal>
			)}
			{admin && (
				<ConfirmationModal
					open={action === 'remute'}
					handleClose={reset}
					action={handleAction}
					isLoading={isLoading}
					actionText='Remute'
				>
					<div>You sure you want to remute the user?</div>
					<Input
						label='Reason'
						value={(details as z.infer<typeof reMuteSchema>)?.reason || ''}
						onValueChange={(reason) => setDetails({ ...(details as z.infer<typeof reMuteSchema>), reason })}
					/>
					<Select
						label='Type'
						placeholder='Select the mute type'
						selectedKeys={[(details as z.infer<typeof reMuteSchema>)?.type]}
						onChange={(newType) =>
							setDetails({
								...(details as z.infer<typeof reMuteSchema>),
								type: newType.target.value as z.infer<typeof reMuteSchema>['type'],
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
						label='Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof reMuteSchema>)?.duration || ''}
						onValueChange={(duration) =>
							setDetails({
								...(details as z.infer<typeof reMuteSchema>),
								duration,
							})
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
								{(details as z.infer<typeof reMuteSchema>)?.duration === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date().getTime() +
											Number((details as z.infer<typeof reMuteSchema>)?.duration) * 60000
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
					<div>This will replace the mute duration or reason</div>
					<Input
						label='Mute Reason'
						value={(details as z.infer<typeof editMuteSchema>)?.reason}
						onValueChange={(reason) =>
							setDetails({
								...(details as z.infer<typeof editMuteSchema>),
								reason,
							})
						}
					/>
					<Select
						label='Type'
						placeholder='Select the mute type'
						selectedKeys={[(details as z.infer<typeof editMuteSchema>)?.type]}
						onChange={(newType) =>
							setDetails({
								...(details as z.infer<typeof editMuteSchema>),
								type: newType.target.value as z.infer<typeof editMuteSchema>['type'],
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
						label='Mute Time (in minutes)'
						type='number'
						value={(details as z.infer<typeof editMuteSchema>)?.duration || ''}
						onValueChange={(duration) =>
							setDetails({
								...(details as z.infer<typeof editMuteSchema>),
								duration,
							})
						}
						description='Time in minutes, this will be added to the current duration, 0 = Permanent mute (will replace the duration)'
					/>

					<div className='flex flex-col text-xs'>
						<span>
							The mute started at <b>{GetDateTimeString(selectedMute?.created)}</b>
						</span>
						<span>
							After the edit, the mute will end at{' '}
							<b>
								{(details as z.infer<typeof editMuteSchema>)?.duration === '0' ? (
									<b className='text-red-700'>Permanent</b>
								) : (
									GetDateTimeString(
										new Date(selectedMute?.created || '').getTime() +
											Number((details as z.infer<typeof editMuteSchema>)?.duration) * 60000
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
					<div>Are you sure you want to delete the mute? this action is permanent and cannot be undone</div>
				</ConfirmationModal>
			)}
		</>
	)
}

export default MutesTable
