const changerAccount = require('./changerAccount')
const changerAmount = require('./changerAmount')
const changerCategory = require('./changerCategory')
const hasOperationChanged = require('../hasOperationChanged')
const Operation = require('../../models/Operation')
const Category = require('../../models/Category')

const changeOperation = async (id, operation) => {
	try {

		const oldOperation = await Operation.findById(id)
		const isChanged = hasOperationChanged(oldOperation, operation)
		const { amount, category, client_account, comment } = isChanged

		if (amount || category || client_account || comment) {

			const { type: categoryTypeOld } = await Category.findById(oldOperation.category)
			const { type: categoryTypeNew } = await Category.findById(operation.category)

			let accounts

			if (client_account) {

				accounts = await changerAccount(oldOperation, categoryTypeOld, operation, categoryTypeNew)

			} else if (amount) {

				accounts = await changerAmount(categoryTypeOld, categoryTypeNew, oldOperation, operation)

			} else if (category) {

				accounts = await changerCategory(categoryTypeNew, operation)

			} else {

				accounts = {
					oldAccount: null,
					newAccount: null
				}

			}

			const newOperation = await Operation.findByIdAndUpdate(id, operation, {
				returnDocument: 'after',
				new: true
			})

			return {
				operation: newOperation,
				account: accounts
			}

		} else {
			return {
				operation,
				account: {
					oldAc: null,
					newAc: null
				}
			}
		}
	}
	catch (e) {
		throw new Error(e)
	}
}
module.exports = changeOperation