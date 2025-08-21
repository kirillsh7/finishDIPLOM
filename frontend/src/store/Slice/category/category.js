import { createSlice } from '@reduxjs/toolkit'
import {
	getCategory,
	deleteCategory,
	createCategory,
} from '../../middleware'
import { createCustomAsyncReducer } from '../../helpers'

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		items: [],
		error: null,
		loading: true,
	}, reducers: {
		clearCategoryError(state) {
			state.error = null
		}
	},
	extraReducers: builder => {
		createCustomAsyncReducer(getCategory, {
			onFulfilled(state, action) {
				state.loading = false
				state.items = action.payload || []
				state.error = null
			}
		})(builder),
			createCustomAsyncReducer(deleteCategory, {
				onFulfilled(state, action) {
					state.loading = false
					state.items = state.items.filter(
						category => category.id !== action.meta.arg
					)
					state.error = null
				}
			})(builder),
			createCustomAsyncReducer(createCategory, {
				onFulfilled(state, action) {
					state.loading = false
					state.items.push({
						...action.payload,
					})
					state.error = null
				}
			})(builder)


	},
})
export const { clearCategoryError } = categorySlice.actions
export default categorySlice.reducer
