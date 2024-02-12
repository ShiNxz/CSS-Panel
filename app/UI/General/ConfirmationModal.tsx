import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'

const ConfirmationModal = ({ open, children, action, handleClose, isLoading, actionText }: Props) => {
	return (
		<Modal
			isOpen={open}
			onOpenChange={(!isLoading && handleClose) || undefined}
			classNames={{
				backdrop: 'z-[20000]',
				wrapper: 'z-[20000]',
			}}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>Confirmation</ModalHeader>
						<ModalBody>{children}</ModalBody>
						<ModalFooter>
							<Button
								color='primary'
								variant='light'
								onPress={onClose}
								isLoading={isLoading}
							>
								Cancel
							</Button>
							<Button
								color='primary'
								onPress={action}
								isLoading={isLoading}
							>
								{actionText || 'Confirm'}
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

interface Props {
	open: boolean
	children?: React.ReactNode
	action: () => void
	handleClose: () => void
	isLoading?: boolean
	actionText?: string
}

export default ConfirmationModal
