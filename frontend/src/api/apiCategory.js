import { api } from './api'


export const apiCategory = {

	get: async (userId = '') => {
		return await api.get(`/category/${userId}`)

	},

	create: async (categoryData) => {
		return await api.post('/category', categoryData)

	},


	delete: async (id) => {
		return await api.delete(`/category/${id}`)

	},

	update: async (id, updates) => {
		return await api.patch(`/category/${id}`, updates)

	}
}

