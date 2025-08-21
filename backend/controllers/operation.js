const Operation = require('../models/Operation')
const Category = require('../models/Category')
const ClientAccount = require('../models/ClientAccount')
const calculateAmount = require('../helpers/calculateAmount')
// const hasOperationChanged = require('../helpers/hasOperationChanged')
// const changerAccount = require('../helpers/changer/changerAccount')
// const changerAmount = require('../helpers/changer/changerAmount')
const changeOperation = require('../helpers/changer/changeOperation')
async function addOperation(operation) {
	const category = await Category.findById(operation.category)
	const clientAccount = await ClientAccount.findById(operation.client_account)
	const newAmount = calculateAmount(category.type, clientAccount.amount, operation.amount)
	if (newAmount < 0) throw new Error('Недостаточно средств')
	await ClientAccount.updateOne({ _id: operation.client_account }, { amount: newAmount })
	const newOperation = await Operation.create(operation)
	return { operation: newOperation, account: { amount: newAmount, id: operation.client_account } }
}

async function editOperation(id, operation) {
	const newData = changeOperation(id, operation)
	return newData
}

async function deleteOperation(id) {
	const operation = await Operation.findById(id)
	const clientAccount = await ClientAccount.findById(operation.client_account)
	const category = await Category.findById(operation.category)
	let newAmount = calculateAmount(!category.type, clientAccount.amount, operation.amount)
	if (newAmount < 0) {
		newAmount = 0
	}
	await ClientAccount.updateOne({ _id: operation.client_account }, { amount: newAmount })

	await Operation.deleteOne({ _id: id })
	return { id: id, account: { amount: newAmount, id: operation.client_account } }
}

async function getOperations(id) {
	const operations = await Operation.find({ user: id })
	return operations
}

module.exports = { addOperation, editOperation, deleteOperation, getOperations }
