module.exports = function mapClientAccount(clientAccount) {
	return {
		id: clientAccount.id,
		name: clientAccount.name,
		type: clientAccount.type,
		amount: clientAccount.amount,
		created_date: clientAccount.created_date,
		user: clientAccount.user,

	}
}
