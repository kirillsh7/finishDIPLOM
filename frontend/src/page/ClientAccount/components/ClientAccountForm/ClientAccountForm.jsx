import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createClientAccount, userSelector } from '@store'
import { useChangeInput } from '@hooks'
import { Input, Button } from '@components'
export const ClientAccountForm = ({ onClose }) => {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()
	const initialAccaunt = {
		name: '',
		type: '',
		amount: '',
		created_date: Date.now(),
		user: user,
	}
	const [error, setError] = useState('')
	const [newAccount, setNewAccount] = useState(initialAccaunt)
	const handleInputChange = useChangeInput(setNewAccount)

	const handleSubmit = async e => {
		try {
			e.preventDefault()
			await dispatch(createClientAccount(newAccount)).unwrap()
			setNewAccount(initialAccaunt)
			onClose()
		} catch (err) {
			setError("Проблемы при создании счета: " + err)
		}
	}

	return (
		<form className='add-account-form' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Название счета:</label>
				<Input
					type='text'
					name='name'
					value={newAccount.name}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Тип счета:</label>
				<Input
					type='text'
					name='type'
					value={newAccount.type}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Сумма:</label>
				<Input
					type='number'
					name='amount'
					value={newAccount.amount}
					onChange={handleInputChange}
					required
				/>
			</div>
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<Button type='submit' className='submit'>
				Добавить
			</Button>
		</form>
	)
}
