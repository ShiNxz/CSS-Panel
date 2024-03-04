import type { Flag } from '@/utils/types/db/css'
import { useForm, zodResolver } from '@mantine/form'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { mutate } from 'swr'
import { FLAGS } from '@/utils/schemas/adminSchema'
import useManageAdminsStore from './Store'
import axios from 'axios'
import adminGroupSchema from '@/utils/schemas/adminGroupSchema'
import useAuth from '@/utils/hooks/useAuth'

const AdminGroupModal = () => {
	const open = useManageAdminsStore((state) => state.open)
	const edit = useManageAdminsStore((state) => state.edit)
	const setOpen = useManageAdminsStore((state) => state.setOpen)

	const { admin } = useAuth()

	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		if (isLoading) return

		setIsLoading(true)

		try {
			await axios(edit ? `/api/admin/groups/${edit.id.replace('#', '')}` : '/api/admin/groups', {
				method: edit ? 'PUT' : 'POST',
				data: form.values,
			})

			await mutate('/api/admin/groups')
			await mutate('/api/admin/admins')
			toast.success(edit ? `Succesfully edited group!` : `Succesfully created group!`)

			setOpen(false)
		} catch (error) {
			console.error(error)
			toast.error(`Failed to ${edit ? 'edit' : 'create'} group!`)
		}

		setIsLoading(false)
	}

	const form = useForm({
		initialValues: {
			id: edit ? edit.id : '#',
			name: edit ? edit.name : '',
			flags: edit ? edit.flags : (['@css/generic'] as Flag[]),
			immunity: edit ? edit.immunity.toString() : '0',
		},
		validate: zodResolver(adminGroupSchema),
	})

	useEffect(() => {
		form.setValues({
			id: edit ? edit.id : '#',
			name: edit ? edit.name : '',
			flags: edit ? edit.flags : (['@css/generic'] as Flag[]),
			immunity: edit ? edit.immunity.toString() : '0',
		})
	}, [edit])

	useEffect(() => {
		if (form.values.name) {
			form.setValues({
				id: `#${form.values.name.toLowerCase().replace(/\s/g, '-')}`,
			})
		}
	}, [form.values.name])

	return (
		<Modal
			isOpen={open}
			onOpenChange={isLoading ? undefined : setOpen}
		>
			<ModalContent>
				{(onClose) => (
					<form onSubmit={form.onSubmit(handleSubmit)}>
						<ModalHeader className='flex flex-col gap-1'>
							{edit ? 'Edit group' : 'Create new group'}
						</ModalHeader>
						<ModalBody>
							<Input
								{...form.getInputProps('name')}
								errorMessage={form.errors.name}
								label='Group Name'
								placeholder='Example, Admins'
								variant='bordered'
								disabled={isLoading}
								autoFocus
							/>
							<Input
								{...form.getInputProps('id')}
								errorMessage={form.errors.id}
								label='Group ID'
								placeholder='Example, #admins'
								type='text'
								variant='bordered'
								disabled={isLoading}
							/>
							<div className='grid grid-cols-2 gap-4'>
								<Dropdown>
									<DropdownTrigger>
										<Button variant='bordered'>
											Web Flags: {form.values.flags.filter((f) => f.startsWith('@web')).length}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label='Web Flags'
										items={FLAGS.filter((f) => f.id.startsWith('@web'))}
										closeOnSelect={false}
										selectionMode='multiple'
										selectedKeys={new Set([...form.values.flags])}
										onSelectionChange={(flags) =>
											form.setFieldValue('flags', Array.from(flags) as Flag[])
										}
										disallowEmptySelection
									>
										{(flag) => (
											<DropdownItem
												key={flag.id}
												id={flag.id}
												color='default'
											>
												{flag.id} - {flag.description}
											</DropdownItem>
										)}
									</DropdownMenu>
								</Dropdown>
								<Dropdown>
									<DropdownTrigger>
										<Button variant='bordered'>
											Admin Flags: {form.values.flags.filter((f) => f.startsWith('@css')).length}
										</Button>
									</DropdownTrigger>
									<DropdownMenu
										aria-label='Admin Flags'
										items={FLAGS.filter((f) => f.id.startsWith('@css'))}
										closeOnSelect={false}
										selectionMode='multiple'
										selectedKeys={new Set([...form.values.flags])}
										onSelectionChange={(flags) =>
											form.setFieldValue('flags', Array.from(flags) as Flag[])
										}
										disallowEmptySelection
									>
										{(flag) => (
											<DropdownItem
												key={flag.id}
												id={flag.id}
												color='default'
											>
												{flag.id} - {flag.description}
											</DropdownItem>
										)}
									</DropdownMenu>
								</Dropdown>
							</div>
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
								{edit ? 'Edit admin group' : 'Create admin group'}
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export default AdminGroupModal
