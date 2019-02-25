var EventManager = require('../../../eventmaganer/EventManager')


exports.doDeployNewContract = function (req, res) {

  // Reset the deployment results UI

  var result = {
    "transactionHash": "test",
    "contracttransactionhash": "",
    "confirmationNumber": "",
    "newContractInstance": "",
    "contractAddress": "test"
  };

  var abiDefinitionString = req.abiDefinitionString;  //document.getElementById('compiled_abidefinition').value;
  var abiDefinition = JSON.parse(abiDefinitionString);

  var bytecode = req.compiled_bytecode; // document.getElementById('compiled_bytecode').value;

  // 2. Create the params for deployment - all other params are optional, uses default
  web3.eth.coinbase = req.coinbase; //"0x47C310A31Bb5eB69f7321DdF85A42c837Cd8A8b8"; //deployeParam.acc_address;

  var params = {
    from: web3.eth.coinbase,
    gas: 4600000,
    gasPrice: '3'
  }

  var myContract = new web3.eth.Contract(abiDefinition);

  web3.eth.getGasPrice().then(function (gasPrice) {
    params.gasPrice = gasPrice;
    var contract = myContract.deploy({
      data: bytecode,
      //uint64 maxBalance, uint64 maxSupply, string coinName,uint8 decimalPlace,string simbol, uint unitToSell
      arguments: req.argArray//[1000000, 100000, 'KKII', 8, 'K', 100]
      //arguments: [deployeParam.max_bal, deployeParam.max_sup, deployeParam.coin_name, 8, deployeParam.symbol, deployeParam.unit_to_sup]
    });
    contract.estimateGas().then(function (gas) {
      params.gas = gas;
      contract.send(params, function (error, transactionHash) {
        if (error) {
          res.json({
            error: error,
            message: "Error in deploying contact",
            success: false
          })
        } else {
          res.json({
            transactionHash: transactionHash,
            success: false
          })
        }
        console.log("Transaction hash " + transactionHash);
      }).on('error', function (error) {
        console.log(error);
        EventManager.emitEvent('prebuild:error:contract', error)
      })
        .on('transactionHash', function (transactionHash) {
          EventManager.emitEvent('prebuild:transactionHash:contract', error)
        })
        .on('receipt', function (receipt) {
          console.log(receipt.contractAddress) // contains the new contract address
          EventManager.emitEvent('prebuild:receipt:contract', receipt)
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          EventManager.emitEvent('prebuild:confirmation:contract', confirmationNumber)
        });
    });

  }, function (error) {
    res.json({
      error: error,
      message: "Error in deploying contact",
      success: false
    })
  });
}






function doSendTransaction() {

  var transactionObject = createTransactionObjectJson();

  web3.eth.sendTransaction(transactionObject, function (error, result) {

    if (error) {
      toastr.error(error)
    } else {
      console.log(result);
      var etherscanLinkA = document.getElementById('etherscan_io_tx_link');
      etherscanLinkA.href = createEtherscanIoUrl('tx', result);
      etherscanLinkA.innerHTML = 'etherscan.io'
      toastr.success('Amount transferred successfully!')
    }
  });
}






