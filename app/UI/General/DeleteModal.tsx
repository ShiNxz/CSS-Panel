import { Button } from '@nextui-org/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal'

const ConfirmationModal = ({ open, title, text, onAction, onCancel }: Props) => {
	return (
		<Modal
			isOpen={open}
			onOpenChange={onCancel}
		>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
						<ModalBody>{text}</ModalBody>
						<ModalFooter>
							<Button
								color='default'
								variant='flat'
								onPress={onClose}
							>
								Cancel
							</Button>
							<Button
								color='primary'
								type='submit'
								onClick={onAction}
							>
								{title}
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
	title: string
	text: string | JSX.Element
	onAction: () => void
	onCancel: () => void
}

export default ConfirmationModal
