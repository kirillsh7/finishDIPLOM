import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import { ToggleInput, Button } from '@components'
import { createErrorMessage } from '@utils'
import { useChangeInput } from '@hooks'
import { userSelector, updateUser, loadingSelector, userCreatedDateSelector, userLoginSelector, errorSelector } from '@store'
import { formatLocalizedDate } from '@utils'
import styled from './user.module.css'

export const User = () => {
	const dispatch = useDispatch()
	const [isEdit, setIsEdit] = useState(false)
	const userId = useSelector(userSelector)
	const userLogin = useSelector(userLoginSelector)
	const userCreatedDate = useSelector(userCreatedDateSelector)
	const [userInfo, setUserInfo] = useState({
		login: userLogin,

	})
	const changeInput = useChangeInput(setUserInfo)
	const errorServer = useSelector(errorSelector)
	const loading = useSelector(loadingSelector)
	const [errorValidate, setErrorValidate] = useState({})

	const handleChangeInput = (e) => {
		setErrorValidate({})
		changeInput(e)
		if (e.target.value === '') {
			const newUserInfo = userInfo
			delete newUserInfo[e.target.name]
			console.log(newUserInfo)
			setUserInfo(newUserInfo)
		}
	}

	const changeSchema = yup.object().shape({

		login: yup
			.string()
			.email('Неправильно введен email'),

		password: yup
			.string()
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must be at least 8 characters long and contain at least one letter and one number'
			)
			.min(8, 'Password must be at least 8 characters long')
			.max(30, 'Password must be at most 30 characters long'),

		newPassword: yup
			.string()
			.test('newPassword-required', 'New password is required when changing password', function (value) {
				const { password } = this.parent
				if (password && password.length > 0) {
					return value && value.length > 0
				}
				return true
			})
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
				'Password must be at least 8 characters long and contain at least one letter and one number'
			)
			.min(8, 'Password must be at least 8 characters long')
			.max(30, 'Password must be at most 30 characters long')

	})

	const submitEditUser = async () => {
		try {
			setErrorValidate({})
			const validation = await changeSchema.validate(userInfo, { abortEarly: false })
			await dispatch(updateUser({ id: userId, data: validation })).unwrap()
			setUserInfo({ login: validation?.login })
			setIsEdit(false)
		} catch (e) {
			setErrorValidate(createErrorMessage(e))
		}
	}

	const handleClose = () => {
		setIsEdit(false)
		setErrorValidate({})
	}
	if (loading) return <div>Loading...</div>


	return (

		<div className={styled.container}>
			<div className={styled.buttons}>
				<h1>Профиль пользователя</h1>
				{!isEdit
					? <Button id="edit-btn" className={styled.button} onClick={() => setIsEdit(!isEdit)}>
						Изменить данные
					</Button>
					: (<>
						<Button id="button" className={styled.button} onClick={submitEditUser}>Сохранить</Button>
						<Button id="button" onClick={handleClose}>&times;</Button>
					</>)
				}


			</div>
			<div className={styled.userInfo}>


				<div className={styled.infoRow}>
					<div className={styled.infoLabel}>Логин (email):</div>
					<ToggleInput isEdit={isEdit} name="login" value={userInfo?.login} onChange={handleChangeInput} />
				</div>

				<div className={styled.infoRow}>
					<div className={styled.infoLabel}>
						{isEdit ? 'Старый пароль' : 'Пароль'}
					</div>
					<ToggleInput isEdit={isEdit} name="password" type="password" value={userInfo?.password} onChange={handleChangeInput} required />
				</div>
			</div>

			{isEdit && <div className={styled.infoRow}>
				<div className={styled.infoLabel}>
					Новый пароль
				</div>
				<ToggleInput isEdit={isEdit} name="newPassword" type="password" value={userInfo?.newPassword} onChange={handleChangeInput} required />
			</div>}

			{errorServer && <div className={styled.error}>{errorServer}</div>}
			{errorValidate && <div className={styled.error}>{Object.values(errorValidate)[0]}</div>}
			<div className={styled.registeredAt}>
				Зарегистрирован: {formatLocalizedDate(userCreatedDate)}
			</div>
		</div>
	)

}