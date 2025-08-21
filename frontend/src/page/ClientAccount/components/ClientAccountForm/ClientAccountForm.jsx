import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createClientAccount, userSelector } from '@store'
import { useChangeInput } from '@hooks'
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
	const [newAccount, setNewAccount] = useState(initialAccaunt)
	const handleInputChange = useChangeInput(setNewAccount)

	const handleSubmit = e => {
		e.preventDefault()
		dispatch(createClientAccount(newAccount))
		setNewAccount(initialAccaunt)
		onClose()
	}

	return (
		<form className='add-account-form' onSubmit={handleSubmit}>
			<div className='form-group'>
				<label>Название счета:</label>
				<input
					type='text'
					name='name'
					value={newAccount.name}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Тип счета:</label>
				<input
					type='text'
					name='type'
					value={newAccount.type}
					onChange={handleInputChange}
					required
				/>
			</div>
			<div className='form-group'>
				<label>Сумма:</label>
				<input
					type='number'
					name='amount'
					value={newAccount.amount}
					onChange={handleInputChange}
					required
				/>
			</div>
			<button type='submit' className='submit'>
				Добавить
			</button>
		</form>
	)
}
