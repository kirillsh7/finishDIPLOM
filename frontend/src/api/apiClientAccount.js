import { api } from './api'

export const apiClientAccount = {
	get: async (userId = '') => {
		return await api.get(`/client-account/${userId}`)

	},


	create: async (data) => {
		return await api.post('/client-account', data)

	},



	delete: async (id) => await api.delete(`/client-account/${id}`)



}