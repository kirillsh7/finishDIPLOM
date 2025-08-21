const ClientAccount = require('../models/ClientAccount')
const Operation = require('../models/Operation')
async function addClientAccount(post) {
	const newClientAccount = await ClientAccount.create(post)
	return newClientAccount
}

async function deleteClientAccount(id) {
	await Operation.deleteMany({ client_account: id })
	return await ClientAccount.deleteOne({ _id: id })
}

async function getClientAccounts(id) {
	const clientAccount = await ClientAccount.find({ user: id })
	return clientAccount


}
async function editClientAccount(id, clientAccount) {
	const newOperation = await ClientAccount.findByIdAndUpdate(id, clientAccount, {
		returnDocument: 'after',
		new: true
	})
	return newOperation
}


module.exports = { addClientAccount, deleteClientAccount, getClientAccounts, editClientAccount }
