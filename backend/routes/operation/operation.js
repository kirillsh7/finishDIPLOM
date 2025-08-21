const express = require('express')
const {
	addOperation,
	editOperation,
	deleteOperation,
	getOperations
} = require('../../controllers/operation')
const authenticated = require('../../middlewares/authenticated')
const mapOperation = require('../../helpers/map/mapOperation')

const router = express.Router({ mergeParams: true })



router.get('/:id', authenticated, async (req, res) => {
	try {
		const operation = await getOperations(req.params.id)

		res.send({ error: null, data: operation.map(mapOperation) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.post('/', authenticated, async (req, res) => {
	try {
		const { account, operation } = await addOperation(req.body)
		console
		res.send({ error: null, data: { account, operation: mapOperation(operation) } })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})
router.patch(
	'/:id',
	authenticated,
	async (req, res) => {
		try {
			const { operation, account } = await editOperation(req.params.id, req.body)
			res.send({ error: null, data: { account, operation: mapOperation(operation) } })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}
)
router.delete(
	'/:id',
	authenticated,
	async (req, res) => {
		try {
			const response = await deleteOperation(req.params.id)
			res.send({ error: null, data: response })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}

)


module.exports = router
