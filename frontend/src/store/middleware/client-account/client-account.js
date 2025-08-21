import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiClientAccount } from '@api'
export const getClientAccount = createAsyncThunk(
	'client-account/getClientAccount',
	async (user, { rejectWithValue }) => {
		try {
			return await apiClientAccount.get(user)
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const deleteClientAccount = createAsyncThunk(
	'client-account/deleteClientAccount',
	async (id, { rejectWithValue }) => {
		try {
			return await apiClientAccount.delete(id)

		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const createClientAccount = createAsyncThunk(
	'client-account/createClientAccount',
	async (data, { rejectWithValue }) => {
		try {

			const res = await apiClientAccount.create(data)
			return res
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

