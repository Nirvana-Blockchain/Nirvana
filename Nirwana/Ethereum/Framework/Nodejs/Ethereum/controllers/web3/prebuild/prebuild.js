function doDeployNewContract(req, res) {

  // Reset the deployment results UI

  var result = {
    "transactionHash": "test",
    "contracttransactionhash": "",
    "confirmationNumber": "",
    "newContractInstance": "",
    "contractAddress": "test"
  };

  var abiDefinitionString = document.getElementById('compiled_abidefinition').value;
  var abiDefinition = JSON.parse(abiDefinitionString);

  var bytecode = document.getElementById('compiled_bytecode').value;

  // 2. Create the params for deployment - all other params are optional, uses default
  web3.eth.coinbase = "0x47C310A31Bb5eB69f7321DdF85A42c837Cd8A8b8"; //deployeParam.acc_address;

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
      arguments: [1000000, 100000, 'KKII', 8, 'K', 100]
      //arguments: [deployeParam.max_bal, deployeParam.max_sup, deployeParam.coin_name, 8, deployeParam.symbol, deployeParam.unit_to_sup]
    });
    contract.estimateGas().then(function (gas) {
      params.gas = gas;
      contract.send(params, function (error, transactionHash) {
        if (error) {
          console.log(error);
        }
        console.log("Transaction hash " + transactionHash);
      }).on('error', function (error) {
        console.log(error);
      })
        .on('transactionHash', function (transactionHash) {
          setEtherscanIoLink('contracttransactionhash_link', 'tx', transactionHash);
          result.transactionHash = transactionHash;
        })
        .on('receipt', function (receipt) {
          console.log(receipt.contractAddress) // contains the new contract address
        })
        .on('confirmation', function (confirmationNumber, receipt) {
          console.log(confirmationNumber);
          console.log(receipt);
        });
    });

  }, function (error) {

  });
}


/**
 * Create new Account 
 */
function createAccount(callback, tempaddress, password) {
  // password = mynewaccount
  var result = {
    "address": "",
    "signTransection": ""
  };
  web3.eth.personal.newAccount(password, function (err, address) {
    result.address = address;
    // Passphrase = testimpetus password = mynewaccount
    web3.eth.personal.sign(tempaddress, address, password).then(function (signTransection) {
      result.signTransection = signTransection;
      callback(result);
    }, function (error) {

    });
  });
  // console.log(result);
  return result;
}


/**
* Get the balances of all accounts.
*/
function doGetBalances(accounts) {
  var accounts = [];
  accounts[0] = '0x08195F52eeCff9251994F0195C0AA5214B4fb014';
  // Remove the balances if they already exist
  //removeAllChildItems('account_balances_list');

  // Add the balances as the list items
  for (var i = 0; i < accounts.length; i++) {

    // var bal = web3.eth.getBalance(accounts[i]);
    web3.eth.getBalance(accounts[i], web3.eth.defaultBlock, function (error, result) {
      // Convert the balance to ethers
      var bal = web3.utils.fromWei(result, 'ether');
      console.log(bal);
      ///addAccountBalancesToList('account_balances_list', i, bal);
    });
  }
}



function doSendTransaction() {
  $j("#page_loader").show();
  $j("#fromaccount").text("");
  $j("#toaccount").text("");
  $j("#txhash").text("");
  var transactionObject = createTransactionObjectJson();

  web3.eth.sendTransaction(transactionObject, function (error, result) {

    if (error) {
      //setData('send_transaction_error_or_result', error, true);
      toastr.error(error)
      $j("#page_loader").hide();
    } else {
      console.log(result);

      //setData('send_transaction_error_or_result', result, false);

      var etherscanLinkA = document.getElementById('etherscan_io_tx_link');
      etherscanLinkA.href = createEtherscanIoUrl('tx', result);
      etherscanLinkA.innerHTML = 'etherscan.io'
      $j("#fromaccount").text($j("#send_from_account").val());
      $j("#toaccount").text($j("#send_to_account_value").val());
      $j("#txhash").text(result);
      $j("#page_loader").hide();
      toastr.success('Amount transferred successfully!')
      //console.log(etherscanLinkA)
    }
  });
}






