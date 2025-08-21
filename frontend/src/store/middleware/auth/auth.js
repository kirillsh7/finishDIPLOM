import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiAuth, apiUser } from '@api'

export const initializeAuth = createAsyncThunk(
	'auth/initialize',
	async (_, { rejectWithValue }) => {
		try {
			return await apiAuth.get()
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)

export const logoutAuth = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			await apiAuth.logout()
			return null
		} catch (err) {
			return rejectWithValue(err.message)
		}
	}
)
export const authUser = createAsyncThunk('auth/authUser', async ({ login, password }, { rejectWithValue }) => {
	try {
		return await apiAuth.login(login, password)
	} catch (err) {
		return rejectWithValue(err.message)
	}
})

export const registerUser = createAsyncThunk('auth/registerUser', async ({ login, password }, { rejectWithValue }) => {
	try {
		return await apiAuth.register(login, password)
	} catch (err) {
		return rejectWithValue(err.message)
	}
})
export const updateUser = createAsyncThunk('auth/updateUser', async ({ id, data }, { rejectWithValue }) => {
	try {
		return await apiUser.update(id, data)
	} catch (err) {
		return rejectWithValue(err.message)
	}
})