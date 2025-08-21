import { useSelector } from 'react-redux'
import { operationsItemsSelector, operationsLoadingSelector, operationsErrorSelector } from '@store'
import { Table } from '@components'

export const HistoryOperation = () => {
	const operations = useSelector(operationsItemsSelector)
	const loading = useSelector(operationsLoadingSelector)
	const error = useSelector(operationsErrorSelector)


	const heading = [
		{ name: 'Дата', key: 'created_date' },
		{ name: 'Имя ', key: 'name' },
		{ name: 'Комментарий', key: 'comment' },
		{ name: 'Счет', key: 'client_account' },
		{ name: 'Категория', key: 'category' },
		{ name: 'Сумма', key: 'amount' },
	]
	if (loading) return <h1>Loading...</h1>
	return (
		<div >
			{error && <h1>{error}</h1>}
			{!error && <Table
				items={operations}
				heading={heading}
			/>}
		</div>



	)
}
