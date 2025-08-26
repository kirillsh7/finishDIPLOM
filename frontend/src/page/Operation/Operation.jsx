import { useState } from 'react'
import { useSelector } from 'react-redux'
import { operationsItemsSelector, operationsLoadingSelector, operationsErrorSelector, deleteOperations, updateOperations } from '@store'
import { Modal, Table, Button } from '@components'
import { OperationForm } from './components'
import styled from './operation.module.css'

export const Operation = () => {
	const [showOperationForm, setShowOperationForm] = useState(false)
	const operations = useSelector(operationsItemsSelector)
	const loading = useSelector(operationsLoadingSelector)
	const errorServer = useSelector(operationsErrorSelector)
	const closeOperationForm = () => setShowOperationForm(false)

	const heading = [
		{ name: 'Сумма', key: 'amount' },
		{ name: 'Счет', key: 'client_account' },
		{ name: 'Категория', key: 'category' },
		{ name: 'Комментарий', key: 'comment', controls: 'edit' },
	]
	if (loading) return <h1>Loading...</h1>
	return (
		<div className={styled.operationPage}>
			<div className={styled.operationHeader}>
				<h1 className={styled.operationTitle}>Операции</h1>
				<Button
					className={styled.operationCreateButton}
					onClick={() => {
						setShowOperationForm(true)
					}}
				>
					Создать операцию
				</Button>
			</div>

			<div className={styled.operationList}>
				{errorServer ? <h1>{errorServer}</h1> : <Table
					items={operations}
					heading={heading}
					update={updateOperations}
					remove={deleteOperations}
				/>}

			</div>

			{showOperationForm && (
				<Modal isOpen={showOperationForm} onClose={closeOperationForm}>
					<OperationForm
						closeOperationForm={closeOperationForm}
					/>
				</Modal>
			)}
		</div>
	)
}
