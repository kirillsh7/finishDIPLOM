import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { loadingSelector, initializeAuth, getCategory, userSelector, getClientAccount, getOperations } from '@store'
import {
	Category,
	Home,
	Operation,
	User,
	ClientAccount,
	HistoryOperation,
	Login,
	Register,
} from '@page'

import { MainLayout } from '@layout'
import { GuestRoute, ProtectedRoute } from '@routes'
import './index.css'
function App() {
	const user = useSelector(userSelector)
	const dispatch = useDispatch()
	const loadedAuth = useSelector(loadingSelector)

	useEffect(() => {
		dispatch(initializeAuth())
	}, [dispatch])
	useEffect(() => {
		if (user) {
			dispatch(getCategory(user)),
				dispatch(getClientAccount(user)),
				dispatch(getOperations(user))
		}
	}, [user, dispatch])
	if (loadedAuth) return <div>Загрузка...</div>
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route element={<MainLayout />}>
						<Route path='/' element={<Home />} />
						<Route path='/category' element={<Category />} />
						<Route path='/client-account' element={<ClientAccount />} />
						<Route path='/operation' element={<Operation />} />
						<Route path='/history-operation' element={<HistoryOperation />} />
						<Route path='/user' element={<User />} />
					</Route>
				</Route>

				<Route element={<GuestRoute />}>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>

				<Route path='*' element={<p style={{ textAlign: 'center', marginTop: '50px', fontSize: '24px' }}>Старница не найдена</p>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App