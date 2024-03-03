import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { Autocomplete, AutocompleteItem } from '@nextui-org/autocomplete'
import useManageServersStore from './store'
import axios from 'axios'

const COMMANDS = ['changelevel', 'sa_kick', 'sa_ban']

const RconModal = () => {
	const rcon = useManageServersStore((state) => state.rcon)
	const setRcon = useManageServersStore((state) => state.setRcon)
	const [messages, setMessages] = useState<Message[]>([])

	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	// 'Tab' key bind to choose the first option
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | KeyboardEvent) => {
		switch (e.key) {
			case 'Tab':
				// @ts-ignore
				e.continuePropagation()
				e.preventDefault()

				// Choose the first relevant option
				const filteredCommands = COMMANDS.filter((command) => command.toLowerCase().startsWith(message))

				if (filteredCommands.length > 0) setMessage(filteredCommands[0])

				break

			case 'ArrowUp':
				// @ts-ignore
				e.continuePropagation()
				e.preventDefault()

				// Get the last user commands
				const lastCommands = messages.filter((message) => message.type === 'USER')

				// Every time the user presses the 'ArrowUp' key, we will get the previous command
				const lastCommand = lastCommands[lastCommands.length - 1]

				// If there is a previous command, we will set it as the current command
				if (lastCommand) setMessage(lastCommand.message)

				break
			case 'Enter':
				handleSubmit()

				break
		}
	}

	const handleSubmit = async () => {
		if (isLoading) return
		if (!message) return toast.error('Please write a command!')
		if (message.length < 2) return toast.error('Command is too short!')

		setIsLoading(true)
		setMessages((prev) => [...prev, { message, type: 'USER' }])

		try {
			const response = await axios(`/api/admin/servers/${rcon}`, {
				method: 'POST',
				data: { message },
			})

			setMessages((prev) => [
				...prev,
				{ message: response?.data?.response ? response.data.response : 'Unknown Response', type: 'SERVER' },
			])

			setMessage('')
		} catch (error) {
			console.error(error)
			toast.error(`Failed to send command!`)
		}

		setIsLoading(false)
	}

	return (
		<Modal
			isOpen={!!rcon}
			onOpenChange={isLoading ? undefined : () => setRcon(null)}
			size='2xl'
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>RCON Panel</ModalHeader>
						<ModalBody className='py-4'>
							<ul className='space-y-2 max-h-96 overflow-y-auto'>
								{messages.map((message) => (
									<li
										className='ms-auto flex justify-end gap-x-2 sm:gap-x-4'
										key={message.message}
									>
										<div
											className={`grow ${
												message.type === 'USER' ? 'text-start' : 'text-end'
											} space-y-3`}
										>
											<div
												className={`inline-block ${
													message.type === 'USER' ? 'bg-blue-600' : 'bg-orange-500'
												} rounded-2xl p-2 px-4 shadow-sm`}
											>
												<p className='text-sm text-white'>{message.message}</p>
											</div>
										</div>
									</li>
								))}
							</ul>

							<Autocomplete
								label='Command'
								variant='faded'
								defaultItems={COMMANDS.map((item) => ({
									label: item,
									value: item,
								}))}
								startContent={<span className='text-sm text-slate-500'>$</span>}
								placeholder='Write a command or use the autocomplete'
								description='Press "Tab" to autocomplete'
								inputValue={message || ''}
								onInputChange={setMessage}
								onSelectionChange={(item) => setMessage(item as string)}
								isLoading={isLoading}
								onKeyDown={handleKeyDown}
								allowsCustomValue
								autoFocus
								fullWidth
							>
								{(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
							</Autocomplete>
						</ModalBody>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

interface Message {
	message: string
	type: 'USER' | 'SERVER'
}

export default RconModal
