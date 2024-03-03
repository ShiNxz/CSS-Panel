import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { mutate } from 'swr'
import useManageServersStore from './store'
import axios from 'axios'
import serverSchema from '@/utils/schemas/serverSchema'

const ServerModal = () => {
	const open = useManageServersStore((state) => state.open)
	const edit = useManageServersStore((state) => state.edit)
	const setOpen = useManageServersStore((state) => state.setOpen)

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		if (isLoading) return

		setIsLoading(true)

		try {
			await axios(edit ? `/api/admin/servers/${edit.id}` : '/api/admin/servers', {
				method: edit ? 'PUT' : 'POST',
				data: form.values,
			})

			await mutate('/api/admin/servers')
			toast.success(edit ? `Succesfully edited server!` : `Succesfully created server!`)

			setOpen(false)
		} catch (error) {
			console.error(error)
			toast.error(`Failed to ${edit ? 'edit' : 'create'} server!`)
		}

		setIsLoading(false)
	}

	const form = useForm({
		initialValues: {
			address: edit ? edit.address : '',
			hostname: edit ? edit.hostname : '',
			rcon: edit ? edit.rcon : '',
		},
		validate: zodResolver(serverSchema),
	})

	useEffect(() => {
		form.setValues({
			address: edit ? edit.address : '',
			hostname: edit ? edit.hostname : '',
			rcon: edit ? edit.rcon : '',
		})
	}, [edit])

	return (
		<Modal
			isOpen={open}
			onOpenChange={isLoading ? undefined : setOpen}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<ModalHeader className='flex flex-col gap-1'>
							{edit ? 'Edit server' : 'Create new server'}
						</ModalHeader>
						<ModalBody>
							<Input
								{...form.getInputProps('hostname')}
								errorMessage={form.errors.hostname}
								label='Hostname'
								placeholder='My cs2 server'
								variant='bordered'
								disabled={isLoading}
								autoFocus
							/>
							<Input
								{...form.getInputProps('address')}
								errorMessage={form.errors.address}
								label='Address'
								placeholder='1.1.1.1:25565'
								type='text'
								variant='bordered'
								disabled={isLoading}
							/>
							<Input
								{...form.getInputProps('rcon')}
								errorMessage={form.errors.rcon}
								label='Rcon Password'
								placeholder='123456789'
								type='password'
								variant='bordered'
								disabled={isLoading}
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color='danger'
								variant='flat'
								onPress={onClose}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button
								color='primary'
								type='submit'
								isLoading={isLoading}
							>
								{edit ? 'Edit server' : 'Create new server'}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export default ServerModal
