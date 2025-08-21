import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticatedSelector, loadingSelector } from '@store'
export const GuestRoute = () => {
	const isAuthenticated = useSelector(isAuthenticatedSelector)

	const loading = useSelector(loadingSelector)
	if (loading) return <div>Загрузка...</div>
	if (isAuthenticated) {
		return <Navigate to='/' replace />
	}
	return <Outlet />


}
