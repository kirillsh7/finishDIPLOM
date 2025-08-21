const Category = require('../models/Category')
async function addCategory(category) {
	const newCategory = await Category.create(category)
	return newCategory
}

function deleteCategory(id) {
	return Category.deleteOne({ _id: id })
}

async function getCategoryes(id) {
	const categories = await Category.find({ user: id })
	return categories


}

module.exports = { addCategory, deleteCategory, getCategoryes }
