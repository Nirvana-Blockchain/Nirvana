var express = require('express');
var router = express.Router();
var personal = require('../controllers/web3/personal/personal')

/* GET home page. */

//Middle Ware to be added
router.post('/unlockAccount', personal.unlockAccount);
router.post('/newAccount', personal.newAccount)
router.post('/lockAccount', personal.lockAccount)


module.exports = router;