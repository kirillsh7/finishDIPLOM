const Category = require('../models/Category')
const Operation = require('../models/Operation')
async function addCategory(category) {
	const newCategory = await Category.create(category)
	return newCategory
}

async function deleteCategory(id) {
	await Operation.deleteMany({ category: id })
	return Category.deleteOne({ _id: id })
}

async function getCategoryes(id) {
	const categories = await Category.find({ user: id })
	return categories


}

module.exports = { addCategory, deleteCategory, getCategoryes }
