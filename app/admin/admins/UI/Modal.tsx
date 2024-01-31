import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Checkbox } from '@nextui-org/checkbox'
import { mutate } from 'swr'
import useManageAdminsStore from './store'
import axios from 'axios'
import adminSchema, { adminFlags } from '@/utils/schemas/adminSchema'

const AdminModal = () => {
	const open = useManageAdminsStore((state) => state.open)
	const edit = useManageAdminsStore((state) => state.edit)
	const setOpen = useManageAdminsStore((state) => state.setOpen)
	const servers = useManageAdminsStore((state) => state.servers)

	const [allServers, setAllServers] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		if (isLoading) return

		setIsLoading(true)

		try {
			await axios(edit ? `/api/admin/admins/${edit.id}` : '/api/admin/admins', {
				method: edit ? 'PUT' : 'POST',
				data: { ...form.values, server_id: allServers ? null : form.values.server_id },
			})

			await mutate('/api/admin/admins')
			toast.success(edit ? `Succesfully edited admin!` : `Succesfully created admin!`)

			setOpen(false)
		} catch (error) {
			console.error(error)
			toast.error(`Failed to ${edit ? 'edit' : 'create'} admin!`)
		}

		setIsLoading(false)
	}

	const form = useForm({
		initialValues: {
			player_name: edit ? edit.player_name : '',
			player_steamid: edit ? edit.player_steamid : '',
			server_id: edit ? Number(edit.server_id) : 0,
			flags: edit ? (edit.flags as string) : '@css/root',
			immunity: edit ? edit.immunity : '0',
		},
		validate: zodResolver(adminSchema),
	})

	console.log({ errors: form.errors })

	useEffect(() => {
		form.setValues({
			player_name: edit ? edit.player_name : '',
			player_steamid: edit ? edit.player_steamid : '',
			server_id: edit ? Number(edit.server_id) : 0,
			flags: edit ? edit.flags : '@css/root',
			immunity: edit ? edit.immunity : '0',
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
							{edit ? 'Edit admin' : 'Create new admin'}
						</ModalHeader>
						<ModalBody>
							<Input
								{...form.getInputProps('player_name')}
								errorMessage={form.errors.player_name}
								label='Admin Name'
								placeholder='John Doe'
								variant='bordered'
								disabled={isLoading}
								autoFocus
							/>
							<Input
								{...form.getInputProps('player_steamid')}
								errorMessage={form.errors.player_steamid}
								label='SteamId (64)'
								placeholder='76561198000000000'
								type='text'
								variant='bordered'
								disabled={isLoading}
							/>

							<Checkbox
								isSelected={allServers}
								onValueChange={setAllServers}
							>
								All Servers
							</Checkbox>
							<Dropdown>
								<DropdownTrigger>
									<Button
										variant='bordered'
										isDisabled={allServers}
									>
										Server:{' '}
										{servers.find((s) => s.id === form.values.server_id)?.hostname ?? 'None'}
									</Button>
								</DropdownTrigger>
								<DropdownMenu aria-label='Servers'>
									{servers.map((server) => (
										<DropdownItem
											key={server.id}
											id={server.id.toString()}
											color='default'
											onClick={() => form.setValues({ server_id: server.id })}
										>
											{server.hostname}
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
							<Dropdown>
								<DropdownTrigger>
									<Button variant='bordered'>Flags: {form.values.flags}</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label='Flags'
									items={adminFlags}
								>
									{adminFlags.map((flag) => (
										<DropdownItem
											key={flag}
											id={flag}
											color='default'
											onClick={() => form.setValues({ flags: flag })}
										>
											{flag}
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
							<Input
								{...form.getInputProps('immunity')}
								errorMessage={form.errors.immunity}
								label='Immunity'
								placeholder='Example, 99'
								type='number'
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
								{edit ? 'Edit admin' : 'Create admin'}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export default AdminModal
