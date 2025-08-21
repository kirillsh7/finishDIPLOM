import { api } from './api'

const OPERATIONS_URL = '/operation'

export const apiOperations = {
	get: async (userId) => await api.get(`${OPERATIONS_URL}/${userId}`),
	create: async (data) => await api.post(OPERATIONS_URL, data),
	update: async (id, data) => await api.patch(`${OPERATIONS_URL}/${id}`, data),
	delete: async (id) => await api.delete(`${OPERATIONS_URL}/${id}`),
}