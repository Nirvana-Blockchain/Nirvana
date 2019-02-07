var express = require('express');
var router = express.Router();
var ens = require('../controllers/web3/ens/ens')


router.post('/registry', ens.registry)
router.post('/resolver', ens.resolver)
router.post('/getAddress', ens.getAddress)
router.post('/setAddress', ens.setAddress)
router.post('/getPubkey', ens.getPubkey)
router.post('/setPubkey', ens.setPubkey)
router.post('/setText', ens.setText)
router.post('/getContent', ens.getContent)
router.post('/setContent', ens.setContent)
router.post('/getMultihash', ens.getMultihash)
router.post('/getContenthash', ens.getContenthash)
router.post('/setContenthash', ens.setContenthash)



module.exports = router;