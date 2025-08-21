const mongoose = require('mongoose')

const ClientAccountSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		created_date: {
			type: String || Number,
			required: true
		},
		user: {
			type: String,
			required: true

		},
	},
	{
		timestamps: true,
	}
)

const ClientAccount = mongoose.model('client-account', ClientAccountSchema)

module.exports = ClientAccount
