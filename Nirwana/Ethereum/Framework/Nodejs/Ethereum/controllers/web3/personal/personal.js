var Tx = require("ethereumjs-tx");
var EventManager = require("../../../eventmaganer/EventManager");

//Creates an account
exports.newAccount = function(req, res, next) {
  if (req.app.locals.web3) {
    console.log(req.body);
    var result = {};
    let connectionObject = req.app.locals.web3;
    const password = req.body.password;
    connectionObject.eth.personal.newAccount(password, function(err, address) {
      if (err) {
        res.json({
          error: err,
          message: "Unable to create account",
          success: false
        });
      } else {
        console.log(address);
        result.address = address;

        res.json({
          data: result,
          message: "Account Created successfully",
          success: true
        });
      }
    });
  }
};

exports.unlockAccount = function(req, res, next) {
  var account = req.body.address;
  var password = req.body.password;

  web3.eth.personal.unlockAccount(account, password, function(error, result) {
    if (error) {
      res.json({
        error: error,
        message: "Account unloacked",
        success: true
      });
    } else {
      res.json({
        message: "Unloacked",
        success: true
      });
    }
  });
};

exports.lockAccount = function(req, res) {
  var account = req.body.accountAdd;

  web3.eth.personal.lockAccount(account).then(function(error, result) {
    if (error) {
      res.json({
        error: error,
        message: "Unable to lock account",
        success: true
      });
    } else {
      res.json({
        message: "Loacked",
        success: true
      });
    }
  });
};

//Creates an account
exports.sendTransaction = function(req, res, next) {
  if (req.app.locals.web3) {
    console.log(req.body);
    var result = {};
    let connectionObject = req.app.locals.web3;
    const password = req.body.password;
    connectionObject.eth.personal.sendTransaction(req.body, function(
      err,
      hash
    ) {
      if (err) {
        res.json({
          error: err,
          success: false
        });
      } else {
        res.json({
          data: hash,
          message: "Account Created successfully",
          success: true
        });
      }
    });
  }
};

//Creates an account
exports.getAccounts = function(req, res, next) {
  if (req.app.locals.web3) {
    console.log(req.body);
    let connectionObject = req.app.locals.web3;

    connectionObject.eth.personal.getAccounts(function(result) {
      res.json({
        data: result,
        success: true
      });
    });
  }
};

getAccounts;
