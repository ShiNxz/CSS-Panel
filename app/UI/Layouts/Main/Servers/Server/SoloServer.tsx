'use client'

import type { SafeServerInfo } from '@/utils/functions/query/ServerQuery'
import type { SA_Server } from '@/utils/types/db/plugin'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Card, CardBody } from '@nextui-org/card'
import { Progress } from '@nextui-org/progress'
import { IconCopy, IconExclamationCircle, IconPlayerPlay, IconShield, IconShieldX } from '@tabler/icons-react'
import { Tooltip } from '@nextui-org/tooltip'
import { Spinner } from '@nextui-org/spinner'
import { cn } from '@nextui-org/system'
import { toast } from 'react-hot-toast'
import useServersStore from '../store'
import fetcher from '@/utils/fetcher'
import Link from 'next/link'
import useSWR from 'swr'

const SoloServer = ({ id, hostname, address }: SA_Server) => {
	const { data, isLoading, error } = useSWR<SafeServerInfo>(`/api/servers/${id}`, fetcher)
	const setModal = useServersStore((state) => state.setModal)

	if (isLoading)
		return (
			<Card
				className='border-none bg-content1'
				shadow='sm'
				onClick={() => open(`steam://connect/${address}`, '_self')}
				isBlurred
				isPressable
			>
				<CardBody>
					<div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
						<div className='relative col-span-6 md:col-span-4 h-full'>
							<Image
								alt='de_dust2'
								className={cn(
									'object-cover h-full bg-center',
									isLoading ? 'animate-pulse grayscale-[10]' : isLoading
								)}
								classNames={{
									wrapper: 'h-full',
								}}
								shadow='md'
								src='https://files.bo3.gg/uploads/news/16425/title_image/960x480-bc5c4f8a10a0b845105bcab657d4bd58.webp'
								height='100%'
								width='100%'
							/>
						</div>

						<div className='flex flex-col col-span-6 md:col-span-8'>
							<div className='flex justify-between items-start'>
								<div className='flex flex-col gap-0'>
									<h3 className='font-semibold text-foreground/90'>{hostname}</h3>
									<p className='text-small text-foreground/80'>Loading...</p>
								</div>

								<Button
									className='text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2'
									variant='light'
									radius='full'
									size='sm'
									isIconOnly
								>
									<Spinner size='sm' />
								</Button>
							</div>

							<div className='flex flex-col mt-3 gap-1'>
								<Progress
									color='warning'
									size='sm'
									isIndeterminate
									isStriped
								/>
								<div className='flex justify-between'>
									<p className='text-small'>-</p>
								</div>
							</div>

							<div className='flex w-full items-center justify-between mt-4'>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(address)
										toast.success('Copied to clipboard!')
									}}
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
						</div>
					</div>
				</CardBody>
			</Card>
		)

	if (error || !data)
		return (
			<Card
				className='border-none bg-content1'
				shadow='sm'
				onClick={() => open(`steam://connect/${address}`, '_self')}
				isBlurred
				isPressable
			>
				<CardBody>
					<div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
						<div className='relative col-span-6 md:col-span-4 h-full'>
							<Image
								alt='de_dust2'
								className='object-cover h-full bg-center grayscale-[10]'
								classNames={{
									wrapper: 'h-full',
								}}
								shadow='md'
								src='https://files.bo3.gg/uploads/news/16425/title_image/960x480-bc5c4f8a10a0b845105bcab657d4bd58.webp'
								height='100%'
								width='100%'
							/>
						</div>

						<div className='flex flex-col col-span-6 md:col-span-8'>
							<div className='flex justify-between items-start'>
								<div className='flex flex-col gap-0'>
									<h3 className='font-semibold text-foreground/90'>{hostname}</h3>
									<p className='text-small text-foreground/80'>Failed to load server info</p>
								</div>

								<Button
									className='text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2'
									variant='light'
									radius='full'
									size='sm'
									isIconOnly
								>
									<IconExclamationCircle />
								</Button>
							</div>

							<div className='flex flex-col mt-3 gap-1'>
								<Progress
									color='danger'
									size='sm'
									isStriped
								/>
								<div className='flex justify-between'>
									<p className='text-small'>-</p>
								</div>
							</div>

							<div className='flex w-full items-center justify-between mt-4'>
								<Button
									onClick={() => {
										navigator.clipboard.writeText(address)
										toast.success('Copied to clipboard!')
									}}
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
						</div>
					</div>
				</CardBody>
			</Card>
		)

	const { game, map, maxPlayers, players, vac } = data
	const playersPercentage = ((typeof players === 'number' ? players : players.length) / maxPlayers) * 100
	const handleOpen = () => setModal({ open: true, server: data })

	/**
	 * If the players prop is a number, it means that the server info isn't from RCON
	 */
	const isRconStatus = typeof players !== 'number'
	const isFull = typeof players === 'number' ? players === maxPlayers : players.length === maxPlayers

	const handleConnect = () => (isFull ? toast.error('Server is full!') : open(`steam://connect/${address}`, '_self'))

	const handleCopy = () => {
		if (isFull) return toast.error('Server is full!')

		navigator.clipboard.writeText(address)
		toast.success('Copied to clipboard!')
	}

	return (
		<Card
			className='border-none bg-content1'
			shadow='sm'
			onClick={isRconStatus ? handleOpen : handleConnect}
			isBlurred
			isPressable
		>
			<CardBody>
				<div className='grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center'>
					<div className='relative col-span-6 md:col-span-4 h-full'>
						<Image
							alt={map}
							className='object-cover h-full bg-center'
							classNames={{
								wrapper: 'h-full',
							}}
							shadow='md'
							src='https://files.bo3.gg/uploads/news/16425/title_image/960x480-bc5c4f8a10a0b845105bcab657d4bd58.webp'
							height='100%'
							width='100%'
						/>
					</div>

					<div className='flex flex-col col-span-6 md:col-span-8'>
						<div className='flex justify-between items-start'>
							<div className='flex flex-col gap-0'>
								<h3 className='font-semibold text-foreground/90'>{hostname}</h3>
								<p className='text-small text-foreground/80'>{game}</p>
							</div>
							{vac !== null && (
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
							)}
						</div>

						<div className='flex flex-col mt-3 gap-1'>
							<Progress
								color='primary'
								value={playersPercentage}
								size='sm'
								isStriped
								isIndeterminate={false}
							/>
							<div className='flex justify-between'>
								<p className='text-small'>
									{map} • {isRconStatus ? players.length : players}/{maxPlayers} Players
								</p>
							</div>
						</div>

						<div className='flex w-full items-center justify-between mt-4'>
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
					</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default SoloServer
