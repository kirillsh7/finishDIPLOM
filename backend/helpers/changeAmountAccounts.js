const ClientAccount = require('../models/ClientAccount')

const changeAmountAccount = async (oldClientAccount, newClientAccount,) => {
	try {
		const newAmount = newClientAccount.amount
		const oldAmount = oldClientAccount.amount
		await ClientAccount.updateOne({ _id: newClientAccount.id }, { amount: newAmount })
		await ClientAccount.updateOne({ _id: oldClientAccount.id }, { amount: oldAmount })
	} catch (e) {
		throw new Error(e)
	}
}
module.exports = { changeAmountAccount }