import { formatLocalizedDate } from '@utils'
export const tarnsformData = (newOperation, categories, accounts, user) => {
	return {
		...newOperation,
		comment: newOperation.comment || '',
		created_date: formatLocalizedDate(),
		category: categories.find(
			category => category.id === newOperation.category
		),
		client_account: accounts.find(
			account => account.id === newOperation.client_account
		),
		user,
	}
}