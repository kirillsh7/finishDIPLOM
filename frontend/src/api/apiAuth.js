import { api } from './api'
export const apiAuth = {
	get: async () => await api.get('/auth/check'),
	register: async (login, password) =>
		await api.post('/register', { login, password }),

	login: async (login, password) =>
		await api.post('/login', { login, password }),

	logout: async () =>
		await api.post('/logout'),
}