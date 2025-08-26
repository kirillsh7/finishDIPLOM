import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useChangeInput } from '@hooks'
import styled from '../../operation.module.css'
import { Input, Button } from '@components'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector, categoryItemsSelector, clientAccountItemsSelector, createOperations } from '@store'

export const OperationForm = ({ closeOperationForm }) => {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()
	const category = useSelector(categoryItemsSelector)
	const clientAccount = useSelector(clientAccountItemsSelector)
	const [newOperation, setNewOperation] = useState({
		category: category[0]?.id,
		client_account: clientAccount[0]?.id,
		name: '',
		amount: '',
		comment: '',
		created_date: Date.now(),
		user
	})
	const handleInput = useChangeInput(setNewOperation)

	const handleSubmit = async e => {
		try {
			e.preventDefault()
			await dispatch(createOperations(newOperation)).unwrap()
			closeOperationForm()
		}
		catch (err) {
			console.log(err)
		}
	}

	return (
		<div className={styled.operationFormOverlay}>
			<div className={styled.operationForm}>

				<h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
					Новая операция
				</h2>
				<form onSubmit={e => handleSubmit(e)}>
					<Input
						placeholder='Назкание операции'
						name='name'
						value={newOperation.name}
						onChange={handleInput}
						required
					/>
					<Input
						type='number'
						placeholder='Сумма'
						name='amount'
						value={newOperation.amount}
						onChange={handleInput}
						required
					/>
					<div
						style={{
							display: 'flex',
							gap: '10px',
							marginBottom: '15px',
							flexDirection: 'column',
						}}
					>
						{category.length > 0 ? (
							<select
								name='category'
								value={newOperation.category}
								onChange={handleInput}
								required
							>
								{category.map(category => {
									return (
										<option key={category.id} value={category.id}>
											{category.name}
										</option>
									)
								})}
							</select>
						) : (
							<Link className={styled.link} to={'/category'}>
								Создать категорию
							</Link>
						)}
						{clientAccount.length > 0 ? (
							<select
								name='client_account'
								value={newOperation.client_account}
								onChange={handleInput}
								required
							>
								{clientAccount.map(account => (
									<option key={account.id} value={account.id}>
										{account.name}
									</option>
								))}
							</select>
						) : (
							<Link className={styled.link} to={'/client-account'}>
								Создать счет
							</Link>
						)}
					</div>
					<textarea
						name='comment'
						placeholder='Комментарий (необязательно)'
						value={newOperation.comment}
						onChange={handleInput}

					/>
					<Button type='submit'>Создать операцию</Button>
				</form>
			</div>
		</div>
	)
}
