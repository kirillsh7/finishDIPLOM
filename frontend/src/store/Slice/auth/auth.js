import { createSlice } from '@reduxjs/toolkit'
import { initializeAuth, logoutAuth, authUser, registerUser, updateUser } from '../../middleware'
import { createCustomAsyncReducer } from '../../helpers'
const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		user: null,
		userLogin: null,
		userCreatedDate: null,
		loading: true,
		error: null,
	},
	extraReducers: (builder) => {
		createCustomAsyncReducer(initializeAuth, {
			onFulfilled(state, action) {
				state.isAuthenticated = true
				state.user = action.payload.id
				state.userLogin = action.payload.login
				state.userCreatedDate = action.payload.created_date
				state.loading = false

			}
		})(builder),
			createCustomAsyncReducer(logoutAuth, {
				onFulfilled(state) {
					state.isAuthenticated = false
					state.user = null
					state.userLogin = null
					state.userCreatedDate = null
					state.loading = false
				}
			})(builder),
			createCustomAsyncReducer(authUser, {
				onFulfilled(state, action) {
					state.isAuthenticated = true
					state.user = action.payload.id
					state.userLogin = action.payload.login
					state.userCreatedDate = action.payload.created_date
					state.loading = false
				}
			})(builder),
			createCustomAsyncReducer(registerUser, {
				onFulfilled(state, action) {
					state.isAuthenticated = true
					state.user = action.payload.id
					state.userLogin = action.payload.login
					state.userCreatedDate = action.payload.created_date
					state.loading = false
				}
			})(builder),
			createCustomAsyncReducer(updateUser, {
				onFulfilled(state, action) {
					state.isAuthenticated = true
					state.user = action.payload.id
					state.userLogin = action.payload.login
					state.loading = false
				}
			})(builder)
	}


})


export default authSlice.reducer


