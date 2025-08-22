import axios from 'axios'
const URL = import.meta.env.VITE_BASE_URL
const config = {
	baseURL: URL,
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	withCredentials: true
}

export const api = axios.create(config)
api.interceptors.response.use(
	(response) => {
		// console.log(response.data)
		const { error, data } = response.data

		if (error) {
			return Promise.reject(new Error(error))
		}

		return data
	},
	(error) => {
		const message = error.response?.data?.error || error.message
		return Promise.reject(new Error(message))
	}

)
