
var Tx = require('ethereumjs-tx');
var EventManager = require('../../../eventmaganer/EventManager')

//Creates an account
exports.newAccount = function (req, res, next) {
    if (req.app.locals.web3) {
        console.log(req.body)
        var result = {}
        let connectionObject = req.app.locals.web3
        const password = req.body.password
        connectionObject.eth.personal.newAccount(password, function (err, address) {

            if (err) {
                res.json({
                    error: err,
                    message: "Unable to create account",
                    sucess: false
                })

            } else {
                console.log(address)
                result.address = address;

                res.json({
                    data: result,
                    message: "Account Created Sucessfully",
                    sucess: true
                })
            }
        });
    }
}


/**
* Unlocks the account
* UNLOCK/LOCK not supported in TestRPC
* Ignored in MetaMask
*/

exports.unlockAccount = function (req, res, next) {

    var account = req.body.accountAdd;
    var password = req.body.password;

    web3.eth.personal.unlockAccount(account, password, function (error, result) {

        if (error) {
            res.json({
                error: error,
                message: "Account Created Sucessfully",
                sucess: true
            })
        } else {
            res.json({
                message: "Unloacked",
                sucess: true
            })
        }
    });
}