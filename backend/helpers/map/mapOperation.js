module.exports = function mapOperation(operation) {
	return {

		id: operation.id,
		name: operation.name,
		amount: operation.amount,
		comment: operation.comment,
		category: operation.category,
		client_account: operation.client_account,
		created_date: operation.created_date

	}
}
