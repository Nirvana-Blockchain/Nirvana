var express = require('express');
var router = express.Router();
var subscribe = require('../controllers/web3/subscribe/subscribe')

/* GET home page. */
router.post('/unlockAccount', subscribe.subscribeLogs);
router.post('/unlockAccount', subscribe.subscribePendingTransaction);
router.post('/unlockAccount', subscribe.subscribeNewBlockHeaders);
router.post('/unlockAccount', subscribe.subscribeSyncing);
router.post('/unlockAccount', subscribe.unsubscribe);


module.exports = router;
