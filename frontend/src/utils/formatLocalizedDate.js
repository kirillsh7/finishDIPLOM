export const formatLocalizedDate = (date) =>
	new Date(date)
		.toLocaleDateString('ru', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' })
		.replace('г.', 'года')
