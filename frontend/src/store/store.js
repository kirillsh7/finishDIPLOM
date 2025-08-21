import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer, CategoryReducer, ClientAccountReducer, OperationsReducer } from './Slice'
const store = configureStore({
	reducer: {
		auth: AuthReducer,
		category: CategoryReducer,
		clientAccount: ClientAccountReducer,
		operations: OperationsReducer
	},
})
export default store