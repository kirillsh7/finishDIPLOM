import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { registerUser, errorSelector, loadingSelector } from '@store'
import { useChangeInput } from '@hooks'
import { createErrorMessage } from '@utils'
import { Input, Button } from '@components'
import styled from './register.module.css'

const registerSchema = yup.object().shape({
	login: yup
		.string()
		.required('Почта обязательна для входа')
		.email('Неправильно введен email'),
	password: yup
		.string()
		.required('Пароль обязателен для входа')
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
			'Пароль должен содержать не менее 8 символов и содержать как минимум одну букву и одну цифру'
		)
		.min(8, 'Длина пароля должна составлять не менее 8 символовg')
		.max(30, 'Длина пароля должна составлять не более 30 символов'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
})

export const Register = () => {
	const initialRegData = {
		login: '',
		password: '',
		confirmPassword: '',
	}
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [regData, setRegData] = useState(initialRegData)
	const changeInput = useChangeInput(setRegData)
	const [error, setError] = useState({})
	const errorAuth = useSelector(errorSelector)
	const isLoading = useSelector(loadingSelector)
	const isValid = Object.keys(error).length === 0
	const errorMessage = errorAuth || Object.values(error)[0]



	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const data = await registerSchema.validate(regData, { abortEarly: false })
			await dispatch(registerUser(data)).unwrap()
		} catch (err) {
			setError(createErrorMessage(err))
		}
	}

	const handleChange = e => {
		changeInput(e)
		setError({})
	}

	return (
		<div>
			<form action='' onSubmit={handleSubmit} className={styled.form}>
				<div className={styled.back} onClick={() => navigate(-1)}>
					<p>Назад</p>
				</div>
				<h1 className={styled.title}>Регистрация</h1>
				<div>
					<Input
						placeholder='Почта'
						name='login'
						value={regData.login}
						onChange={handleChange}
						autoComplete='off'
					/>
				</div>
				<div>
					<Input
						placeholder='Пароль'
						name='password'
						type='password'
						value={regData.password}
						autoComplete='off'
						onChange={handleChange}
					/>
				</div>
				<div>
					<Input
						placeholder='Подтвердите пароль'
						name='confirmPassword'
						type='password'
						value={regData.confirmPassword}
						onChange={handleChange}
					/>
				</div>
				{errorMessage && <p className={styled.error}>{errorMessage}</p>}
				<Button type='submit' disabled={!isValid || isLoading}>
					{isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
				</Button>
			</form>
		</div>
	)
}
