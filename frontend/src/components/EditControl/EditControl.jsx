import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import styles from './EditControl.module.css'

export const EditControl = ({
	controls,
	isEdit,
	id,
	handleEdit,
	editControlClose,
	removeOperation,
	saveEdited,
}) => {
	return (
		<div className={styles.container}>
			{controls === 'edit' ? (
				isEdit === id ? (
					<div className={styles.editControls}>
						<AiOutlineCheckCircle size={20} onClick={saveEdited} />
						<AiOutlineCloseCircle size={20} onClick={editControlClose} />
					</div>
				) : (
					<MdEdit size={20} onClick={handleEdit} />
				)
			) : null}

			<MdDelete size={20} onClick={removeOperation} />
		</div>
	)
}