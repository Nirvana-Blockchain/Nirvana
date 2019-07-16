/**
 * This schedule will run every morning from Monday to Friday morning 8:30 am
 */
var Web3 = require("web3");
var Config = require("../config/Config");
var DBUtils = require("../utils/DBUtils");

exports.invoke = async db => {
  var url =
    "http://" +
    Config.getConfig().GETH_HOSTNAME +
    ":" +
    Config.getConfig().GETH_RPCPORT;
  const provider = new Web3.providers.HttpProvider(url);
  var web3 = new Web3(provider);

  startFetchingData(db, web3);
};

async function startWritingData(fromBlock, toBlock) {
  var tasksArray = [];

  for (var blockNumber = fromBlock; blockNumber < toBlock; blockNumber++) {
    tasksArray.push(function(blockNumber) {
      processBlock(blockNumber);
    });
  }

  async.parallel(tasksArray, function(err, results) {
    startWritingData(fromBlock = toBlock+1  , toBlock+10);
  });

}

function processBlock(blockNumber);
{
  var blockInfo = await web3.eth.getBlock(blockNumber);
  if (blockInfo.transactions && blockInfo.transactions.length > 0) {

    

    
    blockInfo.transactions.forEach(async element => {
      var transactionInfo = await web3.eth.getTransaction(element);
      var transactionReceipt = await web3.eth.getTransactionReceipt(element);
      console.log("Transaction  ========", transactionInfo);
      console.log("transactionReceipt  ========", transactionReceipt);

      if (transactionReceipt.logs && transactionReceipt.logs.length) {
        console.log("Transaction  ========", transactionReceipt.logs);
        transactionReceipt.logs.forEach(log => {
          DBUtils.saveLogs(db, log);
        });
      }
    });
  } else {
    // Save block info only
  }
}




function processTransaction()
{

}

async function startFetchingData(db, web3) {
  var number = await web3.eth.getBlockNumber();
  console.log(number);
  for (var i = 227888; i < number; i++) {
    console.log(i, "  ========");

    // DBUtils.saveBlock(db, blockInfo);
  }
}
