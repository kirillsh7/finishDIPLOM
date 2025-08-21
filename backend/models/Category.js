const mongoose = require('mongoose')
const category = require('../constants/category')

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: Number,
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

const Category = mongoose.model('category', CategorySchema)

module.exports = Category
