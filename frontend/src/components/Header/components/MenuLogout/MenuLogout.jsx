import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutAuth, userLoginSelector } from '@store'
import { Button } from '@components'
import styled from '../../header.module.css'
export const MenuLogout = () => {
	const dispatch = useDispatch()
	const userLogin = useSelector(userLoginSelector)

	return (
		<div>
			{userLogin && (
				<div className={styled.logout}>
					<Link to={'/user'}>
						<p className='hover:text-blue-900 hover:underline'>{userLogin}</p>
					</Link>

					<Button
						className={styled.button}
						onClick={() => dispatch(logoutAuth())}
					>
						Выход
					</Button>
				</div>
			)}
		</div>
	)
}
