import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CategoryError, CategoryForm, CategoryList } from './components'
import { Modal } from '@components'
import {
	deleteCategory,
	createCategory,
	categoryItemsSelector,
	categoryLoadingSelector,
} from '@store'
import styles from './category.module.css'
export const Category = () => {
	const dispatch = useDispatch()
	const categories = useSelector(categoryItemsSelector)
	const categoriesLoading = useSelector(categoryLoadingSelector)
	const [isModalOpen, setIsModalOpen] = useState(false)


	const handleDelete = id => {
		dispatch(deleteCategory(id))
	}
	const handleCreate = data => {
		dispatch(createCategory(data))
		setIsModalOpen(false)
	}


	if (categoriesLoading) {
		return <div> Загрузка...</div>
	}
	return (
		<>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<CategoryForm handleCreate={handleCreate} />
			</Modal>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1 className={styles.title}>Мои категории</h1>
					<button
						type='button'
						className={styles.createCategory}
						onClick={() => setIsModalOpen(true)}
					>
						Создать категорию
					</button>
				</div>
				<CategoryError />
				{categories.length === 0 ? (
					<div className={styles.empty}>Категории не найдены</div>
				) : (
					<div className={styles.grid}>
						<CategoryList categories={categories} handleDelete={handleDelete} />
					</div>
				)}
			</div>
		</>
	)
}
