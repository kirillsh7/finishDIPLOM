import { createSlice } from '@reduxjs/toolkit'
import { getOperations, deleteOperations, createOperations, updateOperations, deleteClientAccount } from '../../middleware'
import { createCustomAsyncReducer } from '../../helpers'
const OperationsSlice = createSlice({
	name: 'operations',
	initialState: {
		items: [],
		error: null,
		loading: true,
	},
	extraReducers: (builder) => {
		createCustomAsyncReducer(getOperations, {
			onFulfilled(state, action) {
				state.items = action.payload || []
				state.loading = false
				state.error = null
			}
		})(builder),
			createCustomAsyncReducer(deleteOperations, {
				onFulfilled(state, action) {
					state.items = state.items.filter(
						clientAccount => clientAccount.id !== action.payload.id
					)
					state.loading = false
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(createOperations, {

				onFulfilled(state, action) {
					state.items.push(action.payload.operation)
					state.loading = false
					state.error = null

				}
			})(builder),
			createCustomAsyncReducer(updateOperations, {
				onFulfilled(state, action) {
					const { operation } = action.payload
					state.items = state.items.map(el => {
						if (el.id === operation.id) {
							return operation
						}
						return el
					})
					state.loading = false
					state.error = null
				}
			})(builder), createCustomAsyncReducer(deleteClientAccount, {
				onFulfilled(state, action) {
					state.items = state.items.filter(operation => operation.client_account !== action.payload
					)
					state.loading = false
					state.error = null
				}
			})(builder)

	}

})

export default OperationsSlice.reducer
