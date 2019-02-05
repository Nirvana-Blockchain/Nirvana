var express = require('express');
var router = express.Router();
var personal = require('../controllers/web3/subscribe/')

/* GET home page. */
router.post('/unlockAccount', personal.unlockAccount);

module.exports = router;
