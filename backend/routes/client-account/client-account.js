const express = require('express')
const {
	addClientAccount,
	deleteClientAccount,
	getClientAccounts,
	editClientAccount
} = require('../../controllers/client-account')
const authenticated = require('../../middlewares/authenticated')
const mapClientAccount = require('../../helpers/map/mapClientAccount')

const router = express.Router({ mergeParams: true })



router.get('/:id', authenticated, async (req, res) => {
	try {
		const clientAccount = await getClientAccounts(req.params.id)

		res.send({ error: null, data: clientAccount.map(mapClientAccount) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.post('/', authenticated, async (req, res) => {
	try {
		const newClientAccount = await addClientAccount(req.body)

		res.send({ error: null, data: mapClientAccount(newClientAccount) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})
router.patch('/:id', authenticated, async (req, res) => {
	try {
		const newClientAccount = await editClientAccount(req.params.id, req.body)

		res.send({ error: null, data: mapClientAccount(newClientAccount) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.delete(
	'/:id',
	authenticated,
	async (req, res) => {
		try {
			await deleteClientAccount(req.params.id)
			res.send({ error: null, data: req.params.id })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}
)


module.exports = router
