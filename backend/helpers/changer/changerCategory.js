const ClientAccount = require('../../models/ClientAccount')
const calculateAmount = require('../calculateAmount')
const changerCategory = async (type, operation) => {
	try {

		const clientAccountOld = await ClientAccount.findById(operation.client_account)
		const newAmount = calculateAmount(type, clientAccountOld.amount, operation.amount)
		if (newAmount < 0) throw new Error('Недостаточно средств')
		await ClientAccount.updateOne({ _id: operation.client_account }, { amount: newAmount })
		return {

			oldAccount: { amount: newAmount, id: operation.client_account }, newAccount: null

		}
	} catch (e) {
		throw new Error(e.message)
	}
}

module.exports = changerCategory