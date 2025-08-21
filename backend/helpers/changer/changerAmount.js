const ClientAccount = require('../../models/ClientAccount')
const calculateAmount = require('../calculateAmount')
const changerAmount = async (typeOld, typeNew, oldOperation, newOperation,) => {
	try {
		const clientAccountOld = await ClientAccount.findById(oldOperation.client_account)

		const removeOldAmount = calculateAmount(!typeOld, clientAccountOld.amount, oldOperation.amount)
		const newAmount = calculateAmount(typeNew, removeOldAmount, newOperation.amount)
		if (newAmount < 0) throw new Error('Недостаточно средств')
		await ClientAccount.updateOne({ _id: oldOperation.client_account }, { amount: newAmount })

		return {

			oldAccount: { amount: newAmount, id: oldOperation.client_account }, newAccount: null

		}

	} catch (e) { throw new Error(e) }
}

module.exports = changerAmount