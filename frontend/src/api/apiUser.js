import { api } from './api'

const USER_URL = '/user'

export const apiUser = {
	update: async (id, data) => await api.patch(`${USER_URL}/${id}`, data)

}