import { createSlice } from '@reduxjs/toolkit'
import { getClientAccount, deleteClientAccount, createClientAccount, createOperations, deleteOperations, updateOperations } from '../../middleware'
import { createCustomAsyncReducer } from '../../helpers'
const ClientAccountSlice = createSlice({
	name: 'client-account',
	initialState: {
		items: [],
		error: null,
		loading: true,
	},
	extraReducers: (builder) => {
		createCustomAsyncReducer(getClientAccount, {
			onFulfilled(state, action) {
				state.items = action.payload || []
				state.loading = false
				state.error = null
			}
		})(builder),
			createCustomAsyncReducer(deleteClientAccount, {
				onFulfilled(state, action) {
					state.items = state.items.filter(
						clientAccount => clientAccount.id !== action.payload
					)
					state.loading = false
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(createClientAccount, {
				onFulfilled(state, action) {
					state.items.push(action.payload)
					state.loading = false
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(createOperations, {
				onFulfilled(state, action) {
					const { id, amount } = action.payload.account
					state.items = state.items.map(clientAccount => {
						if (clientAccount.id === id) {
							return { ...clientAccount, amount }
						}
						return clientAccount
					})
					state.loading = false
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(deleteOperations, {
				onFulfilled(state, action) {
					const { id, amount } = action.payload.account
					state.items = state.items.map(clientAccount => {
						if (clientAccount.id === id) {
							return { ...clientAccount, amount }
						}
						return clientAccount
					})
					state.loading = false
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(updateOperations, {
				onFulfilled(state, action) {
					const { newAccount, oldAccount } = action.payload.account
					state.items = state.items.map(clientAccount => {
						if (newAccount !== null && clientAccount.id === newAccount.id) {
							return { ...clientAccount, amount: newAccount.amount }
						}
						if (oldAccount !== null && clientAccount.id === oldAccount.id) {
							return { ...clientAccount, amount: oldAccount.amount }
						}
						return clientAccount
					})
					state.loading = false
					state.error = null
				}
			})(builder)

	},
})

export default ClientAccountSlice.reducer
