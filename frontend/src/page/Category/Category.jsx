import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CategoryError, CategoryForm, CategoryList } from './components'
import { Modal, Button } from '@components'
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
	const handleCreate = async data => {
		try {
			await dispatch(createCategory(data)).unwrap()
			setIsModalOpen(false)

		} catch (err) {
			console.log(err)
			setIsModalOpen(false)
		}
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
					<Button
						type='button'
						className={styles.createCategory}
						onClick={() => setIsModalOpen(true)}
					>
						Создать категорию
					</Button>
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
