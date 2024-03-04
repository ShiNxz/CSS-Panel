'use client'

import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useState } from 'react'
import useAuth from '@/utils/hooks/useAuth'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const UpdateButtonClient = () => {
	const { admin } = useAuth()
	const [modal, setModal] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	const handleUpdate = async () => {
		setIsLoading(true)

		try {
			await axios.post('/api/update')
			toast.success('Panel updated successfully!\nRefresh the page to see the changes.')
			router.refresh()
		} catch (e) {
			console.error(e)
			toast.error('An error occurred while updating the panel.')
		}

		setIsLoading(false)
	}

	return (
		admin && (
			<>
				<Button
					size='sm'
					variant='faded'
					color='primary'
					className='ml-6'
					onClick={() => setModal(true)}
				>
					Update Available!
				</Button>
				<Modal
					isOpen={modal}
					onOpenChange={!isLoading ? setModal : () => {}}
					placement='top'
				>
					<ModalContent>
						{(onClose) => (
							<>
								<ModalHeader>Update CSS-Panel</ModalHeader>
								<ModalBody>There is a new update available for CSS-Panel!</ModalBody>
								<ModalFooter>
									<Link
										href='https://csspanel.dev/docs/updating'
										target='_blank'
										passHref
									>
										<Button
											variant='solid'
											color='default'
											onClick={onClose}
											isDisabled={isLoading}
										>
											Documentation
										</Button>
									</Link>

									<Button
										variant='solid'
										color='primary'
										onClick={handleUpdate}
										isLoading={isLoading}
									>
										Update
									</Button>
								</ModalFooter>
							</>
						)}
					</ModalContent>
				</Modal>
			</>
		)
	)
}

export default UpdateButtonClient
