var express = require('express');
var router = express.Router();
var eth = require('../controllers/web3/eth/eth')

/* GET home page. */

//Middle Ware to be added
router.get('/getNodeStatus', eth.getNodeStatus);
router.post('/createWallet', eth.createWallet)

router.get('/getAccounts', eth.getAccounts)
router.post('/getBalance', eth.getBalance)
router.post('/lockAccount', eth.lockAccount)
router.post('/getBlock', eth.getBlock);
router.post('/getNetworkType', eth.getNetworkType);
router.post('/getCode', eth.getCode);
router.post('/isSyncing', eth.isSyncing);
router.post('/getWork', eth.getWork);
router.post('/submitWork', eth.submitWork);
router.post('/getPastLogs', eth.getPastLogs);
router.post('/estimateGas', eth.estimateGas);
router.post('/call', eth.call);
router.post('/signTransaction', eth.signTransaction);
router.post('/sign', eth.sign);
router.post('/sendSignedTransaction', eth.sendSignedTransaction);
router.post('/getTransactionReceipt', eth.getTransactionReceipt);
router.post('/getTransactionFromBlock', eth.getTransactionFromBlock);
router.post('/getTransaction', eth.getTransaction);
router.post('/getUncle', eth.getUncle);
router.post('/getBlockTransactionCount', eth.getBlockTransactionCount);


module.exports = router;