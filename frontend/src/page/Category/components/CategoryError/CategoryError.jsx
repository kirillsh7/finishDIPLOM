import { useDispatch, useSelector } from 'react-redux'
import { categoryErrorSelector, clearCategoryError } from '@store'
import styles from './category-error.module.css'
export const CategoryError = () => {
	const dispatch = useDispatch()
	const categoriesError = useSelector(categoryErrorSelector)

	return (
		categoriesError && (
			<div className={styles.errorNotification}>
				<div className={styles.errorContent}>
					<span>{categoriesError}</span>
					<button
						className={styles.closeButton}
						onClick={() => dispatch(clearCategoryError())}
					>
						&times;
					</button>
				</div>
			</div>
		)
	)
}
