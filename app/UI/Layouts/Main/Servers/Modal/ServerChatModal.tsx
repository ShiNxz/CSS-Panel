'use client'

import type { SA_ChatLog } from '@/utils/types/db/plugin'
import { Modal, ModalContent, ModalBody, ModalFooter } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useEffect, useRef, useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import useSWR from 'swr'
import useServersStore from '../store'
import toast from 'react-hot-toast'
import axios from 'axios'
import fetcher from '@/utils/fetcher'

const ServerChatModal = () => {
	const chatModal = useServersStore((state) => state.chatModal)
	const { open, server } = chatModal
	const setChatModal = useServersStore((state) => state.setChatModal)

	const {
		data: messages,
		isLoading: isMessagesLoading,
		mutate,
	} = useSWR<SA_ChatLog[]>(open && server?.id ? `/api/servers/${server.id}/chat` : undefined, fetcher, {
		refreshInterval: 2000,
	})

	const [message, setMessage] = useState('')
	const [hideName, setHideName] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (isLoading || !server) return

		setIsLoading(true)
		setMessage('')

		try {
			await axios.post(`/api/servers/${server.id}/chat`, { message, hideName })
			await mutate()
			toast.success('Message sent!')
		} catch (error) {
			console.error(error)
		}

		setIsLoading(false)
	}

	// Always keep the chat to the bottom
	const ref = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (ref.current) {
			ref.current.scroll({ top: 1000 }) // todo doesnt work for some reason
		}
	}, [messages])

	return (
		server && (
			<Modal
				size='4xl'
				isOpen={open}
				onClose={() => setChatModal({ ...chatModal, open: false })}
				backdrop='transparent'
				placement='bottom'
				classNames={{
					base: `bg-cover bg-center bg-no-repeat`,
					body: 'min-h-[180px] max-h-[180px] overflow-y-scroll py-4 backdrop-filter backdrop-blur-sm relative',
					footer: 'backdrop-filter backdrop-blur-md border-t-2 border-foreground/20',
				}}
			>
				<ModalContent
					style={{
						backgroundImage: `url('/maps/${server.map}.webp')`,
					}}
				>
					{(_) =>
						server && (
							<form onSubmit={handleSendMessage}>
								<ModalBody>
									<div ref={ref}>
										{messages &&
											messages.length > 0 &&
											messages.map((message) => (
												<div key={message.id}>
													<b>
														{message.team ? '[TEAM] ' : ''}
														{message.playerName}:{' '}
													</b>
													{message.message}
												</div>
											))}
									</div>
								</ModalBody>
								<ModalFooter className='flex flex-row items-center gap-4'>
									<Input
										label='Type a message...'
										type='text'
										size='sm'
										value={message}
										variant='flat'
										onValueChange={(message) => setMessage(message)}
										disabled={isLoading || isMessagesLoading}
									/>

									<Tooltip
										content={
											<>
												Hide your name from the message
												<br />
												Currently: {hideName ? 'Your name is hidden' : 'Your name is visible'}
											</>
										}
										placement='top'
									>
										<Button
											variant='flat'
											size='lg'
											color='secondary'
											onClick={() => {
												setHideName(!hideName)
											}}
										>
											{hideName ? 'Hide Name' : 'Show Name'}
										</Button>
									</Tooltip>

									<Button
										isLoading={isLoading || isMessagesLoading}
										size='lg'
										type='submit'
										variant='solid'
										color='primary'
									>
										Send
									</Button>
								</ModalFooter>
							</form>
						)
					}
				</ModalContent>
			</Modal>
		)
	)
}

export default ServerChatModal
