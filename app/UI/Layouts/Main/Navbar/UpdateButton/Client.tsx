'use client'

import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { useState } from 'react'
import useAuth from '@/utils/hooks/useAuth'
import Link from 'next/link'

const UpdateButtonClient = () => {
	const { admin } = useAuth()
	const [modal, setModal] = useState(false)

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
					onOpenChange={setModal}
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
											color='primary'
											onClick={onClose}
										>
											Update
										</Button>
									</Link>
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
