const express = require('express')
const { register, login } = require('../../controllers/user')
const mapUser = require('../../helpers/map/mapUser')
const { verify } = require('../../helpers/token')
const router = express.Router({ mergeParams: true })
const errorMessage = require('../../helpers/errorMessage')

router.get('/auth/check', async (req, res) => {
	try {
		const token = req.cookies.token
		if (!token) throw new Error('No token')

		const decoded = verify(token)
		res.json({ error: null, data: { id: decoded.id, login: decoded.email, created_date: decoded.created_date } })

	} catch (err) {
		res.status(401).json({ error: 'Not authenticated', data: null })
	}
})
router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password)
		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, data: mapUser(user) })
	} catch (e) {
		res.send({ error: errorMessage(e.message) || 'Unknown error', data: null })
	}
})
router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password)
		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, data: mapUser(user) })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

router.post('/logout', (req, res) => {
	try {
		res
			.clearCookie('token')
			.send({ error: null, data: null })
	} catch (e) {
		res.send({ error: e.message || 'Unknown error', data: null })
	}
})

module.exports = router
