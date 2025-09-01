import { Input } from '../Input/Input'
import styles from './EditableCell.module.css'

export const EditableTableCell = ({
	isEdit,
	name,
	value,
	onChange,
	formatAmount,
	controls,
	selectData,
}) => {
	const currentValueName = typeof value === 'object' ? value.name : value

	const isNumber = !isNaN(value) && isFinite(value) && value !== ''
	return (
		<td className={styles.cell}>
			<div className={`${styles.container} ${controls ? styles.withControls : ''}`}>
				{isEdit ? (
					selectData ? (
						<select
							name={name}
							value={currentValueName}
							onChange={onChange}
							className={styles.select}
						>
							{selectData.map(item => (
								<option key={item.id} value={item.id} >
									{item.name}
								</option>
							))}
						</select>
					) : (
						<Input
							name={name}
							value={currentValueName}
							onChange={onChange}
							className={styles.input}
						/>
					)
				) : isNumber ? (
					<div className={styles.valueContainer}>
						<p>{name === 'amount' ? formatAmount(currentValueName) : currentValueName}</p>
					</div>
				) : (
					<div className={styles.valueContainer}>{currentValueName}</div>
				)}
				{controls}
			</div>
		</td>
	)
}