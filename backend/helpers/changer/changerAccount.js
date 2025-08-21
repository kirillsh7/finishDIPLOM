const ClientAccount = require('../../models/ClientAccount')
const calculateAmount = require('../calculateAmount')
const changerAccount = async (oldOperation, categoryTypeOld, operation, categoryTypeNew) => {
	try {
		const clientAccountOld = await ClientAccount.findById(oldOperation.client_account)
		const clientAccountNew = await ClientAccount.findById(operation.client_account)
		const newAmountOld = calculateAmount(!categoryTypeOld, clientAccountOld.amount, oldOperation.amount)
		const newAmountNew = calculateAmount(categoryTypeNew, clientAccountNew.amount, operation.amount)
		if (newAmountOld < 0 || newAmountNew < 0) throw new Error('Недостаточно средств')
		await ClientAccount.updateOne({ _id: oldOperation.client_account }, { amount: newAmountOld })
		await ClientAccount.updateOne({ _id: operation.client_account }, { amount: newAmountNew })

		return {
			oldAccount: { amount: newAmountOld, id: oldOperation.client_account }, newAccount: { amount: newAmountNew, id: operation.client_account }

		}
	} catch (e) {
		throw new Error(e)
	}
}

module.exports = changerAccount