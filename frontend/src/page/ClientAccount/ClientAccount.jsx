import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Modal, Table } from '@components'
import { clientAccountItemsSelector, clientAccountLoadingSelector, clientAccountErrorSelector, deleteClientAccount } from '@store'

import { ClientAccountForm } from './components'
import './client-account.css'
export const ClientAccount = () => {
	const accounts = useSelector(clientAccountItemsSelector)
	const loading = useSelector(clientAccountLoadingSelector)
	const error = useSelector(clientAccountErrorSelector)


	const [showAddForm, setShowAddForm] = useState(false)

	const onClose = () => {

		setShowAddForm(false)

	}
	const heading = [
		{ name: 'Название', type: 'text', key: 'name' },
		{ name: 'Тип', type: 'text', key: 'type' },
		{ name: 'Сумма', type: 'number', key: 'amount' },
		{ name: 'Дата', type: 'date', key: 'created_date', controls: 'delete' },
	]

	return (<>
		{error && <p>{error}</p>}
		<div className='accounts-page'>
			{loading && <h1>Loading...</h1>}
			<div className='accounts-header'>
				<h1 className='accounts-title'>Мои счета</h1>

				<button
					className='add-account-btn'
					onClick={() => setShowAddForm(!showAddForm)}
				>
					Добавить счет
				</button>
			</div>

			{showAddForm && (
				<Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
					<ClientAccountForm
						onClose={onClose}
					/>
				</Modal>
			)}
			<div className='accounts-list'>
				{accounts.length === 0 ? (
					<p>У вас пока нет счетов</p>
				) : (
					<Table
						heading={heading}
						items={accounts}
						remove={deleteClientAccount}
					/>
				)}
			</div>
		</div>
	</>
	)
}
