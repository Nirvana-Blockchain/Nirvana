var express = require('express')
var router = express.Router()
var authController = require('../controller/AuthenticateUser')
router.post('/authorize',authController.authenticateUser)
module.exports = router
