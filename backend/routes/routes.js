const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth/auth'))
router.use('/category', require('./category/category'))
router.use('/client-account', require('./client-account/client-account'))
router.use('/operation', require('./operation/operation'))
router.use('/user', require('./user/user'))

module.exports = router
