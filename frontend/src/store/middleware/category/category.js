import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiCategory } from '@api'
export const getCategory = createAsyncThunk(
	'category/getCategories',
	async (user, { rejectWithValue }) => {
		try {
			return await apiCategory.get(user)
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const deleteCategory = createAsyncThunk(
	'category/deleteCategories',
	async (id, { rejectWithValue }) => {
		try {
			await apiCategory.delete(id)
			return id
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)

export const createCategory = createAsyncThunk(
	'category/createCategories',
	async (data, { rejectWithValue }) => {
		try {
			return await apiCategory.create(data)
		} catch (e) {
			return rejectWithValue(e.message)
		}
	}
)
