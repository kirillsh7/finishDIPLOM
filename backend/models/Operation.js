const mongoose = require('mongoose')
const OperationSchema = new mongoose.Schema({
	category: {
		type: String,
		required: true
	},
	client_account: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	amount: {
		type: Number,
		required: true,
	},
	comment: {
		type: String,
	},
	created_date: {
		type: String || Number,
		required: true
	},
	user: {
		type: String,
	},

}, {
	timestamps: true
})

const Operation = mongoose.model('Operation', OperationSchema)

module.exports = Operation