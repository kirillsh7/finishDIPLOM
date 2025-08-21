import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useChangeInput } from '@hooks'
import { useDispatch } from 'react-redux'
import { categoryItemsSelector, clientAccountItemsSelector } from '@store'
import { formatLocalizedDate } from '@utils'
import { EditControl } from '../../../EditControl/EditControl'
import { EditableTableCell } from '../../../EditableTableCell/EditableTableCell'
import { useLocation } from 'react-router-dom'
import {
	formatAmount,
	findOperation,
} from '@utils'

export const TableBody = ({ data, ...props }) => {
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(null)
	const category = useSelector(categoryItemsSelector)
	const clientAccount = useSelector(clientAccountItemsSelector)
	const selectData = { category, client_account: clientAccount }
	const [editForm, setEditForm] = useState({})
	const changeInput = useChangeInput(setEditForm)
	const isClient = useLocation().pathname === '/client-account'
	const { heading, items } = props
	const editControlClose = () => {
		setIsEdit({})
	}
	const operationsMap = data?.map(item => {
		const dateFormat = Number(item.created_date)
			? (formatLocalizedDate(Number(item.created_date)))
			: (item.created_date)
		if (isClient) {
			return { ...item, created_date: dateFormat }
		} else {

			return {
				...item,
				client_account: clientAccount.find(acc => acc.id === item.client_account).name,
				category: category.find(cat => cat.id === item.category).name,
				created_date: dateFormat,
			}
		}


	})
	const handleEdit = id => {
		const item = findOperation(items, id)
		setIsEdit(id)
		setEditForm(item)


	}
	const saveEdited = id => {
		dispatch(props.update({ id, data: editForm }))
		setIsEdit(null)
	}

	const removeOperation = id => {
		dispatch(props.remove(id))
	}

	return (
		<tbody>

			{data && operationsMap.map((el, rowIndex) => {
				return (
					<tr key={el.id} style={{ borderBottom: '1px solid #eee' }}>
						{heading.map(({ key, controls }, colIndex) => {
							const uniqueKey = `${el.id || 'temp'}-${key}-${rowIndex}-${colIndex}`
							return (
								<EditableTableCell
									isEdit={isEdit === el.id}
									name={key}
									key={uniqueKey}
									value={isEdit === el.id ? editForm[key] : el[key]}
									onChange={changeInput}
									formatAmount={formatAmount}
									selectData={selectData[key]}
									controls={
										controls ? (
											<EditControl
												controls={controls}
												isEdit={isEdit}
												id={el.id}
												handleEdit={handleEdit.bind(null, el.id)}
												editControlClose={editControlClose}
												removeOperation={removeOperation.bind(null, el.id)}
												saveEdited={saveEdited.bind(null, el.id)}
											/>
										) : null
									}
								/>
							)
						})}
					</tr>
				)
			})}
			{!data && <tr><td>Нет операций</td></tr>}
		</tbody>
	)
}
