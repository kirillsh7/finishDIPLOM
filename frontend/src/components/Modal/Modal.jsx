import styled from './modal.module.css'
import { Button } from '@components'
export const Modal = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null
	const onCloseOverlay = e => {
		if (e.target !== e.currentTarget) return
		onClose()
	}
	return (
		<div className={styled.modalOverlay} onClick={onCloseOverlay}>
			<div className={styled.modal}>
				<Button className={styled.modalClose} onClick={onClose}>
					&times;
				</Button>
				<div className={styled.modalContent}>{children}</div>
			</div>
		</div>
	)
}
