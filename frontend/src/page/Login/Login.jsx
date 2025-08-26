import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { authUser, errorSelector, loadingSelector } from '@store'
import { Input, Button } from '@components'
import { useChangeInput } from '@hooks'
import styled from './login.module.css'
import { createErrorMessage } from '@utils'

const authSchema = yup.object().shape({
	login: yup
		.string()
		.required('Почта обязательна для входа')
		.email('Неправильно введен email'),
	password: yup
		.string()
		.required('Пароль обязателен для входа')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Password must be at least 8 characters long and contain at least one letter and one number'
		)
		.min(8, 'Password must be at least 8 characters long')
		.max(30, 'Password must be at most 30 characters long'),
})

export const Login = () => {
	const [authData, setAuthData] = useState({ login: '', password: '' })
	const [error, setError] = useState({})
	const changeInput = useChangeInput(setAuthData)
	const errorAuth = useSelector(errorSelector)
	const errorMessage = Object.values(error)[0] || errorAuth
	const isValid = Object.keys(error).length === 0
	const loading = useSelector(loadingSelector)
	const dispatch = useDispatch()

	const resetError = () => {
		setError({})
	}

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			const data = await authSchema.validate(authData, { abortEarly: false })
			await dispatch(authUser(data)).unwrap()

		} catch (err) {
			setError(createErrorMessage(err))
		}
	}

	const handleInput = e => {
		changeInput(e)
		resetError()
	}
	return (
		<div>
			<form onSubmit={handleSubmit} className={styled.form}>
				<h1>Авторизация</h1>
				<div>
					<Input
						placeholder='Почта'
						name='login'
						value={authData.login}
						onChange={handleInput}
					/>
				</div>
				<div>
					<Input
						placeholder='Пароль'
						name='password'
						type='password'
						value={authData.password}
						onChange={handleInput}
					/>
				</div>
				{errorMessage && <p className={styled.error}>{errorMessage}</p>}
				<Button type='submit' disabled={!isValid || loading}>
					{loading ? 'Загрузка...' : 'Войти'}
				</Button>
				<p>
					<Link to={'/register'}>Зарегистрироваться</Link>
				</p>
			</form>
		</div>
	)
}
