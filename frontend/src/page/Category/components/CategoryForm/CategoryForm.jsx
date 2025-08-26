import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CATEGORY_NAME, CATEGORY } from '@constants'
import { userSelector } from '@store'
import styled from './category-form.module.css'
import { Input, Button } from '@components'
export const CategoryForm = ({ handleCreate }) => {
	const user = useSelector(userSelector)
	const [categoryDataForm, setCategoryDataForm] = useState({
		name: '',
		type: CATEGORY.EXPENSES,
		user,
	})
	const handleSubmit = e => {
		e.preventDefault()
		handleCreate(categoryDataForm)
	}
	return (
		<form className={styled.form} onSubmit={handleSubmit}>
			<h1 className={styled.title}>Создание категории</h1>

			<div className={styled.formGroup}>
				<label htmlFor='categoryName' className={styled.label}>
					Название категории
				</label>
				<Input
					type='text'
					id='categoryName'
					className={styled.input}
					placeholder='Введите название'
					value={categoryDataForm.name}
					onChange={e =>
						setCategoryDataForm({ ...categoryDataForm, name: e.target.value })
					}
				/>
			</div>

			<div className={styled.formGroup}>
				<label htmlFor='categoryType' className={styled.label}>
					Тип категории
				</label>
				<select
					id='categoryType'
					value={categoryDataForm.type}
					onChange={e =>
						setCategoryDataForm({
							...categoryDataForm,
							type: Number(e.target.value),
						})
					}
					className={styled.select}
				>
					{Object.entries(CATEGORY_NAME).map(([key, value]) => (
						<option key={key} value={key}>
							{value}
						</option>
					))}
				</select>
			</div>

			<Button type='submit' className={styled.button}>
				Создать категорию
			</Button>
		</form>
	)
}
