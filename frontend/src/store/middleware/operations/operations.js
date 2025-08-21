import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiOperations } from '@api'
export const getOperations = createAsyncThunk(
	'operations/getOperations',
	async (user, { rejectWithValue }) => {
		try {
			return await apiOperations.get(user)
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const deleteOperations = createAsyncThunk(
	'operations/deleteOperations',
	async (id, { rejectWithValue }) => {
		try {
			return await apiOperations.delete(id)

		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const createOperations = createAsyncThunk(
	'operations/createOperations',
	async (data, { rejectWithValue }) => {
		try {
			return await apiOperations.create(data)

		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const updateOperations = createAsyncThunk(
	'operations/updateOperations',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const res = await apiOperations.update(id, data)
			console.log(res)
			return res
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)