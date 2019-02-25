var Tx = require("ethereumjs-tx");
var EventManager = require("../../../eventmaganer/EventManager");

/**
 * Return the block data based on given block number
 */
exports.getBlock = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getBlock(req.body.blockNumber).then(
      function(data) {
        res.json({
          data: data,
          success: success
        });
      },
      function(error) {
        res.json({
          error: error,
          message:
            "Either the block does not exist or block number is invalide",
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.getCode = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getCode(req.body.address).then(
      function(data) {
        res.json({
          data: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          message: "Code you requested not found",
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.getNetworkType = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.net.getNetworkType().then(
      function(data) {
        res.json({
          data: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          message:
            "There is some error in fetching Network Type please check if node is running properly or not, may be your node is disconnected from other peers in network.",
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.isSyncing = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.net.isSyncing().then(
      function(data) {
        res.json({
          syncData: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          message: "Node is not syncing or there is some network error.",
          success: false
        });
      }
    );
  }
};

/**
 * Used for submitting a proof-of-work solution.
 */
exports.submitWork = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.net
      .submitWork(req.body.nonce, req.body.powHash, req.body.digest)
      .then(
        function(data) {
          res.json({
            submittedWork: data,
            success: true
          });
        },
        function(error) {
          res.json({
            error: error,
            message: "Node is not syncing or there is some network error.",
            success: false
          });
        }
      );
  }
};

/**
 * Used for submitting a proof-of-work solution.
 */
exports.getWork = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getWork().then(
      function(data) {
        res.json({
          submittedWork: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Gets past logs, matching the given options.
 *  Req body should be
 *  req.body = {
 *    fromBlock: 2355,
 *    toBlock:4522,
 *    address:"0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
 *    topics : ["0x033456732123ffff2342342dd12342434324234234fd234fd23fd4f23d4234"]
 *    }
 */
exports.getPastLogs = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getPastLogs(req.body).then(
      function(data) {
        res.json({
          pastLog: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Executes a message call or transaction and returns the amount of the gas used.
 *  Req body should be 
 *  
    req.body = {
        to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
        data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    }
 */
exports.estimateGas = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.estimateGas(req.body).then(
      function(data) {
        res.json({
          gasRequired: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Executes a message call transaction, which is directly executed in the VM of the node, but never mined into the blockchain.
 *  Req body should be 
 *  
    req.body = {
        to: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
        from: "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe", // contract address
        data: "0xc6888fa10000000000000000000000000000000000000000000000000000000000000003"
    }

    The returned data of the call, e.g. a smart contract functions return value.
 */
exports.call = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.call(req.body).then(
      function(data) {
        res.json({
          callData: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Signs a transaction. This account needs to be unlocked.
 *  Req body should be 
 *  
    req.body = {
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: "20000000000",
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}
    The RLP encoded transaction. The raw property can be used to send the transaction using web3.eth.sendSignedTransaction
 */
exports.signTransaction = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.signTransaction(req.body).then(
      function(data) {
        res.json({
          signTransaction: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Signs a transaction. This account needs to be unlocked.
 *  Req body should be 
 *  
    dataToSign = "Data that needs to be signed"
    address = by which data will be signed
    The RLP encoded transaction. The raw property can be used to send the transaction using web3.eth.sendSignedTransaction
 */
exports.sign = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.sign(req.body.dataToSign, req.body.address).then(
      function(data) {
        res.json({
          signDatas: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Signs a transaction. This account needs to be unlocked.
 *  Req body should be 
 *  
    dataToSign = "Data that needs to be signed"
    address = by which data will be signed
    The RLP encoded transaction. The raw property can be used to send the transaction using web3.eth.sendSignedTransaction
 */
exports.sendSignedTransaction = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var privateKey = new Buffer(req.body.transactionKey, "hex");

    var rawTx = req.body;
    var tx = new Tx(rawTx);
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    web3.eth
      .sendSignedTransaction("0x" + serializedTx.toString("hex"))
      .on("receipt", function(data) {
        EventManager.emitEvent("ETH:sendSignedTransaction:receipt", data);
      })
      .then(
        function(data) {
          res.json({
            signData: data,
            success: true
          });
        },
        function(error) {
          res.json({
            error: error,
            success: false
          });
        }
      );
  }
};

/**
 * Get the numbers of transactions sent from this address.
   The number of transactions sent from the given address.
 */
exports.getTransactionCount = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth
      .getTransactionCount(req.body.address, req.body.defalutBlock)
      .then(
        function(data) {
          res.json({
            transactionCount: data,
            success: true
          });
        },
        function(error) {
          res.json({
            error: error,
            success: false
          });
        }
      );
  }
};

/**
 * Get the numbers of transactions sent from this address.
   The number of transactions sent from the given address.
 */
exports.getTransactionReceipt = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getTransactionReceipt(req.body.tranHash).then(
      function(data) {
        res.json({
          receipt: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the numbers of transactions sent from this address.
   The number of transactions sent from the given address.

   req.body.string =  A block number or hash. Or the string "genesis", "latest" or "pending" as in the 
   req.body.index = The transactions index position.
 */
exports.getTransactionFromBlock = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth
      .getTransactionFromBlock(req.body.string, req.body.index)
      .then(
        function(data) {
          res.json({
            transectionData: data,
            success: true
          });
        },
        function(error) {
          res.json({
            error: error,
            success: false
          });
        }
      );
  }
};

/**
 * Returns a transaction matching the given transaction hash.
   The number of transactions sent from the given address.

   req.body.hash =  The transaction hash. 
  
 */
exports.getTransaction = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getTransaction(req.body.hash, req.body.index).then(
      function(data) {
        res.json({
          transectionData: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the numbers of transactions sent from this address.
   The number of transactions sent from the given address.

   req.body.string =  A block number or hash. Or the string "genesis", "latest" or "pending" as in the 
   req.body.index = The transactions index position.
   req.body.transectionHashArray = array of transectionObject [, returnTransactionObjects]

   the returned uncle. For a return value see web3.eth.getBlock().
 */
exports.getUncle = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getUncle(req.body.string, req.body.index).then(
      function(data) {
        res.json({
          data: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Returns the number of transaction in a given block.
   The number of transactions sent from the given address.

   req.body.string = The block number or hash. Or the string "genesis", "latest" or "pending" as in the default block parameter.
   

   The number of transactions in the given block.
 */
exports.getBlockTransactionCount = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getBlockTransactionCount(req.body.string).then(
      function(data) {
        res.json({
          data: data,
          success: true
        });
      },
      function(error) {
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

exports.getNodeStatus = function(req, res, next) {
  EventManager.initClientSocket();
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.net.isListening(function(error, result) {
      if (error) {
        res.json({
          error: error,
          success: false
        });
      } else {
        // Since connected lets get the count
        connectionObject.eth.net.getPeerCount(function(error, result) {
          if (error) {
            res.json({
              error: error,
              success: false
            });
          } else {
            res.json({
              peerCount: result,
              success: true
            });
            console.log("get_peer_count", "Peer Count: " + result, result == 0);
          }
        });
      }
    });
  }
};

exports.createWallet = function(req, res, next) {
  if (req.app.locals.web3) {
    console.log(req.body);
    let connectionObject = req.app.locals.web3;
    const number0fAccounts = req.body.number0fAccounts
      ? req.body.number0fAccounts
      : 1;
    const entropyString = req.body.secret
      ? req.body.secret
      : "54674321§3456764321§345674321§3453647544±±±§±±±!!!43534534534534";
    var wallet = connectionObject.eth.accounts.wallet.create(
      number0fAccounts,
      entropyString
    );
    console.log(wallet);
    res.json({
      success: true,
      data: wallet[0]
    });
  }
};

exports.getAccounts = function(req, res, next) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getAccounts(function(error, result) {
      if (error) {
        console.log(error);
      } else {
        //accounts = result;
        res.json({
          data: result,
          success: true
        });
        // You need to have at least 1 account to proceed
      }
    });
  }
};

exports.getBalance = function(req, res, next) {
  if (req.app.locals.web3) {
    let accountAdd = req.body.accountAdd;
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.getBalance(
      accountAdd,
      connectionObject.eth.defaultBlock,
      function(error, result) {
        // Convert the balance to ethers
        let bal = connectionObject.utils.fromWei(result, "ether");
        res.json({
          data: bal,
          success: true
        });
      }
    );
  }
};

exports.lockAccount = function(req, res, next) {
  if (req.app.locals.web3) {
    let account = req.body.account;
    let password = req.body.password;
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.personal.unlockAccount(account, password, function(
      error,
      result
    ) {
      // console.log(error,result)
      if (error) {
        res.json({
          message: "something went wrong"
        });

        //setData('lock_unlock_result', error, true);
      } else {
        // Result = True if unlocked, else false
        res.json({
          data: result,
          success: true
        });
      }
    });
  }
};

exports.unlockAccount = function(req, res, next) {
  if (req.app.locals.web3) {
    let account = req.body.account;
    let password = req.body.password;
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.personal.unlockAccount(account, password, function(
      error,
      result
    ) {
      // console.log(error,result)
      if (error) {
        res.json({
          message: "something went wrong"
        });

        //setData('lock_unlock_result', error, true);
      } else {
        // Result = True if unlocked, else false
        res.json({
          data: result,
          success: true
        });
      }
    });
  }
};

/**
 * Get the storage at a specific position of an address.
 */
exports.getStorageAt = function(req, res, next) {
  if (req.app.locals.web3) {
    web3.eth
      .getStorageAt(req.body.address, req.body.position, req.body.defalutBlock)
      .then(
        function(response) {
          res.json({
            data: response,
            success: true
          });
        },
        function(error) {
          res.json({
            data: error,
            success: false
          });
        }
      );
  }
};
/**
 * Return current gas price
 */
exports.getGasPrice = function(req, res, next) {
  if (req.app.locals.web3) {
    web3.eth.getGasPrice().then(
      function(response) {
        res.json({
          data: response,
          success: true
        });
      },
      function(error) {
        res.json({
          data: error,
          success: false
        });
      }
    );
  }
};

/**
 * Return current gas price
 */
exports.getHashrate = function(req, res, next) {
  if (req.app.locals.web3) {
    web3.eth.getHashrate().then(
      function(response) {
        res.json({
          data: response,
          success: true
        });
      },
      function(error) {
        res.json({
          data: error,
          success: false
        });
      }
    );
  }
};

/**
 * Return current gas price
 */
exports.isMining = function(req, res, next) {
  if (req.app.locals.web3) {
    web3.eth.isMining().then(
      function(response) {
        res.json({
          data: response,
          success: true
        });
      },
      function(error) {
        res.json({
          data: error,
          success: false
        });
      }
    );
  }
};
