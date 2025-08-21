const express = require('express')
const {
	addCategory,
	deleteCategory,
	getCategoryes

} = require('../../controllers/category')
const authenticated = require('../../middlewares/authenticated')
const mapCategory = require('../../helpers/map/mapCategory')

const router = express.Router({ mergeParams: true })



router.get('/:id', authenticated, async (req, res) => {
	try {
		const category = await getCategoryes(req.params.id)

		res.send({ error: null, data: category.map(mapCategory) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.post('/', authenticated, async (req, res) => {
	try {
		const newCategory = await addCategory(req.body)

		res.send({ error: null, data: mapCategory(newCategory) })
	}
	catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.delete(
	'/:id',
	authenticated,
	async (req, res) => {
		try {
			await deleteCategory(req.params.id)
			res.send({ error: null, data: req.params.id })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}
)


module.exports = router
