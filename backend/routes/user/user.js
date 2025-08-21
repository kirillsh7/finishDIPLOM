const express = require('express')
const {
	updateUser, getUser
} = require('../../controllers/user')
const authenticated = require('../../middlewares/authenticated')
const mapUser = require('../../helpers/map/mapUser')
const router = express.Router({ mergeParams: true })

router.get(
	'/:id',
	authenticated,

	async (req, res) => {
		try {
			const user = await getUser(req.params.id)

			res.send({ error: null, data: mapUser(user) })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}
)

router.patch(
	'/:id',
	authenticated,

	async (req, res) => {
		try {

			const { user, token } = await updateUser(req.params.id, req.body)

			res
				.cookie('token', token, { httpOnly: true })
				.send({ error: null, data: mapUser(user) })
		} catch (e) {
			res.send({ error: e.message || 'Unknown error', data: null })
		}
	}
)


module.exports = router
