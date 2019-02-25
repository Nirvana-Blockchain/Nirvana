var EventManager = require("../../../eventmaganer/EventManager");

/**
 * Get the code at a specific address.
 */
exports.resolver = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.resolver("ethereum.eth").then(
      contract => {
        console.log(contract);
        res.json({
          contract: contract,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.getAddress = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getAddress(req.ensName).then(
      address => {
        console.log(address);
        res.json({
          address: address,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setAddress = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setAddress(req.ensName, req.addressToSet, option)
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setAddress:transactionHash", hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        EventManager.emitEvent(
          "ENS:setAddress:confirmation",
          confirmationNumber
        );
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setAddress:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setAddress:error", error);
      });
  }
};

/**
 * Get the code at a specific address.
 */
exports.getPubkey = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getPubkey(req.ensName).then(
      address => {
        console.log(address);
        res.json({
          address: address,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setPubkey = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setPubkey(
        req.ensName,
        req.xCordinatePublicKey,
        req.yCordinatePublicKey,
        option
      )
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setPubkey:transactionHash", hash);
      })
      .on("confirmation", confirmationNumber => {
        EventManager.emitEvent(
          "ENS:setPubkey:confirmation",
          confirmationNumber
        );
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setPubkey:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setPubkey:error", error);
      });
  }
};

/**
 * Get the code at a specific address.
 */
exports.getText = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getText(req.ensName, req.key).then(
      address => {
        console.log(address);
        res.json({
          address: address,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setText = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setText(req.ensName, req.key, req.value, option)
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setText:transactionHash", hash);
      })
      .on("confirmation", confirmationNumber => {
        EventManager.emitEvent("ENS:setText:confirmation", confirmationNumber);
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setText:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setText:error", error);
      });
  }
};

/**
 * Get the code at a specific address.
 */
exports.getContent = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getContent(req.ensName).then(
      result => {
        console.log(result);
        res.json({
          result: result,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setContent = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setContent(req.ensName, req.hash, option)
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setContent:transactionHash", hash);
      })
      .on("confirmation", confirmationNumber => {
        EventManager.emitEvent(
          "ENS:setContent:confirmation",
          confirmationNumber
        );
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setContent:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setContent:error", error);
      });
  }
};

/**
 * Get the code at a specific address.
 */
exports.getMultihash = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getMultihash(req.ensName).then(
      result => {
        console.log(result);
        res.json({
          result: result,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setMultihash = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setMultihash(req.ensName, req.hash, option)
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setMultihash:transactionHash", hash);
      })
      .on("confirmation", confirmationNumber => {
        EventManager.emitEvent(
          "ENS:setMultihash:confirmation",
          confirmationNumber
        );
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setMultihash:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setMultihash:error", error);
      });
  }
};

/**
 * Get the code at a specific address.
 */
exports.getContenthash = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    connectionObject.eth.ens.getContenthash(req.ensName).then(
      result => {
        console.log(result);
        res.json({
          result: result,
          success: true
        });
      },
      function(error) {
        console.log(error);
        res.json({
          error: error,
          success: false
        });
      }
    );
  }
};

/**
 * Get the code at a specific address.
 */
exports.setContenthash = function(req, res) {
  if (req.app.locals.web3) {
    let connectionObject = req.app.locals.web3;
    var option = { from: req.fromAddress };
    if (req.gasPrice) {
      option.gasPrice = req.gasPrice;
    }

    if (req.gas) {
      option.gas = req.gas;
    }
    // Or using the event emitter
    connectionObject.eth.ens
      .setContenthash(req.ensName, req.hash, option)
      .on("transactionHash", hash => {
        EventManager.emitEvent("ENS:setContenthash:transactionHash", hash);
      })
      .on("confirmation", confirmationNumber => {
        EventManager.emitEvent(
          "ENS:setContenthash:confirmation",
          confirmationNumber
        );
      })
      .on("receipt", receipt => {
        EventManager.emitEvent("ENS:setContenthash:receipt", receipt);
      })
      .on("error", receipt => {
        EventManager.emitEvent("ENS:setContenthash:error", error);
      });
  }
};
