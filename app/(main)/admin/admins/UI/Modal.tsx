import type { SA_AdminGroup } from '@/utils/types/db/plugin'
import type { Flag } from '@/utils/types/db/css'
import { useForm, zodResolver } from '@mantine/form'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { toast } from 'react-hot-toast'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useEffect, useState } from 'react'
import { Checkbox } from '@nextui-org/checkbox'
import useSWR, { mutate } from 'swr'
import adminSchema, { FLAGS, adminFlags } from '@/utils/schemas/adminSchema'
import useManageAdminsStore from './store'
import fetcher from '@/utils/fetcher'
import axios from 'axios'
import useAuth from '@/utils/hooks/useAuth'

const AdminModal = () => {
	const open = useManageAdminsStore((state) => state.open)
	const edit = useManageAdminsStore((state) => state.edit)
	const setOpen = useManageAdminsStore((state) => state.setOpen)
	const servers = useManageAdminsStore((state) => state.servers)

	const { admin } = useAuth()

	const [allServers, setAllServers] = useState(edit ? !edit.server_id : true)
	const [isLoading, setIsLoading] = useState(false)

	const { data } = useSWR<{ groups: SA_AdminGroup[] }>(`/api/admin/admins`, fetcher)

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
			server_id: edit ? edit.server_id : null,
			flags: edit ? edit.flags : [],
			immunity: edit ? edit.immunity : '0',
		},
		validate: zodResolver(adminSchema),
	})

	useEffect(() => {
		form.setValues({
			player_name: edit ? edit.player_name : '',
			player_steamid: edit ? edit.player_steamid : '',
			server_id: edit ? edit.server_id : null,
			flags: edit ? edit.flags : [],
			immunity: edit ? edit.immunity : '0',
		})

		setAllServers(edit ? !edit.server_id : true)
	}, [edit])

	const selectedGroup =
		typeof form.values.flags === 'string' && form.values.flags.startsWith('#')
			? data?.groups.find((g) => g.id === form.values.flags) ?? undefined
			: undefined

	const selectedFlags = typeof form.values.flags !== 'string' ? form.values.flags.join(', ') : undefined

	const serversLabel = !form.values.server_id
		? 'All'
		: form.values.server_id.length > 1
		? form.values.server_id.length
		: servers.find((s) => s.id.toString() === form.values.server_id![0])?.hostname ?? 'None'

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
										Servers: {serversLabel}
									</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label='Servers'
									items={servers}
									closeOnSelect={false}
									selectionMode='multiple'
									selectedKeys={new Set([...(form.values.server_id ?? [])])}
									onSelectionChange={(servers) =>
										form.setFieldValue('server_id', Array.from(servers) as string[])
									}
									disallowEmptySelection
								>
									{(server) => (
										<DropdownItem
											key={server.id}
											id={server.id.toString()}
											color='default'
										>
											{server.hostname}
										</DropdownItem>
									)}
								</DropdownMenu>
							</Dropdown>
							<Dropdown>
								<DropdownTrigger>
									<Button variant='bordered'>Group: {selectedGroup?.name || 'unset'}</Button>
								</DropdownTrigger>
								<DropdownMenu
									aria-label='Flags'
									items={data?.groups ?? []}
								>
									{data?.groups.map((group) => (
										<DropdownItem
											key={group.id}
											id={group.id}
											color='default'
											onClick={() => form.setValues({ flags: group.id })}
										>
											{group.name} {form.values.flags === group.id && '(Selected)'}
										</DropdownItem>
									)) || <></>}
								</DropdownMenu>
							</Dropdown>
							<div className='grid grid-cols-2 gap-4'>
								<Dropdown>
									<DropdownTrigger>
										<Button variant='bordered'>
											Web Flags:{' '}
											{selectedGroup ? (
												<>
													{selectedGroup.flags.filter((f) => f.startsWith('@web/')).length ||
														0}{' '}
													(Group)
												</>
											) : (
												selectedFlags?.split(', ').filter((f) => f.startsWith('@web')).length ||
												0
											)}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label='Web Flags'
										items={FLAGS}
										closeOnSelect={false}
										selectionMode='multiple'
										selectedKeys={new Set([...(form.values.flags ?? [])])}
										onSelectionChange={(flags) =>
											form.setFieldValue(
												'flags',
												Array.from(flags).filter((f) =>
													adminFlags.includes(f as Flag)
												) as Flag[]
											)
										}
										disallowEmptySelection
									>
										{FLAGS.filter((f) => f.id.startsWith('@web/')).map((flag) => (
											<DropdownItem
												key={flag.id}
												id={flag.id}
												color='default'
											>
												{flag.id} - {flag.description}
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
								<Dropdown>
									<DropdownTrigger>
										<Button variant='bordered'>
											Admin Flags:{' '}
											{selectedGroup ? (
												<>
													{selectedGroup.flags.filter((f) => f.startsWith('@css/')).length ||
														0}{' '}
													(Group)
												</>
											) : (
												selectedFlags?.split(', ').filter((f) => f.startsWith('@css')).length ||
												0
											)}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label='Admin Flags'
										items={FLAGS}
										closeOnSelect={false}
										selectionMode='multiple'
										selectedKeys={new Set([...(form.values.flags ?? [])])}
										onSelectionChange={(flags) =>
											form.setFieldValue(
												'flags',
												Array.from(flags).filter((f) =>
													adminFlags.includes(f as Flag)
												) as Flag[]
											)
										}
										disallowEmptySelection
									>
										{FLAGS.filter((f) => f.id.startsWith('@css/')).map((flag) => (
											<DropdownItem
												key={flag.id}
												id={flag.id}
												color='default'
											>
												{flag.id} - {flag.description}
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
							</div>
							<span className='text-xs'>You can choose either pre defined group, or flags.</span>
							<Input
								value={form.values.immunity}
								onChange={(e) =>
									Number(e.target.value) < Number(admin?.immunity) &&
									Number(e.target.value) >= 0 &&
									form.setFieldValue('immunity', e.target.value)
								}
								errorMessage={form.errors.immunity}
								label='Immunity'
								placeholder={`Example, 99, max of ${Number(admin?.immunity) - 1}`}
								description={`Max of ${Number(admin?.immunity) - 1} (Your immunity - 1)`}
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
