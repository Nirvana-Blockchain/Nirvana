/**
 * This schedule will run every morning from Monday to Friday morning 8:30 am
 */
var Web3 = require("web3");
var Config = require("../config/Config");
var DBUtils = require("../utils/DBUtils");
var async = require("async");
var totalNumberOfBlocks = 10000;
var numberOfThreads = 20;
var web3;
exports.invoke = async db => {
  var url =
    "http://" +
    Config.getConfig().GETH_HOSTNAME +
    ":" +
    Config.getConfig().GETH_RPCPORT;
  const provider = new Web3.providers.HttpProvider(url);
  web3 = new Web3(provider);
  totalNumberOfBlocks = await web3.eth.getBlockNumber();
  startWritingData(224549, 224549 + numberOfThreads);
};
//================================== Process Block =============================================
async function startWritingData(fromBlock, toBlock) {
  var tasksArray = [];

  if (toBlock <= totalNumberOfBlocks) {
    console.log("Block Number ===== ", fromBlock, toBlock);

    for (var blockNumber = fromBlock; blockNumber < toBlock; blockNumber++) {
      tasksArray.push(processBlock.bind(null, blockNumber));
    }

    async.parallel(tasksArray, function(err, results) {
      if (toBlock <= totalNumberOfBlocks + 1) {
        startBlock = toBlock + 1;
        endBlock = toBlock + numberOfThreads;
        startWritingData(startBlock, endBlock);
      } else {
        console.log("done writing with data ");
      }
    });
  } else {
    console.log("finish... block");
  }
}

async function processBlock(blockNumber, callback) {
  var blockInfo = await web3.eth.getBlock(blockNumber);
  console.log(
    blockNumber,
    "Transaction count is  ",
    blockInfo.transactions.length
  );
  var result = await DBUtils.saveBlock(blockInfo);

  if (blockInfo.transactions && blockInfo.transactions.length > 0) {
    var length = blockInfo.transactions.length;
    startWritingTransactionData(
      0,
      length > numberOfThreads ? numberOfThreads : length,
      blockInfo.transactions,
      callback
    );
  } else {
    // Save block info only

    callback(null, "");
  }
}
//=================================================================================================

async function startWritingTransactionData(
  fromTransaction,
  toTransactoin,
  transactionsArray,
  blockCallBack
) {
  var tasksArray = [];

  if (toTransactoin <= transactionsArray.length) {
    console.log("Block Number ===== ", fromTransaction, toTransactoin);

    for (
      var transaction = fromTransaction;
      transaction < toTransactoin;
      transaction++
    ) {
      tasksArray.push(
        processTransaction.bind(null, transactionsArray[transaction])
      );
    }

    async.parallel(tasksArray, function(err, results) {
      if (toTransactoin <= totalNumberOfBlocks + 1) {
        startTransaction = toTransactoin + 1;
        endTransaction = toTransactoin + numberOfThreads;
        startWritingTransactionData(
          startTransaction,
          endTransaction,
          transactionsArray
        );
      } else {
        blockCallBack(null, " Done with transaction writing");
      }
    });
  } else {
    console.log("Transactoin completed....");
    blockCallBack(null, " Done with transaction writing");
  }
}

async function processTransaction(transactionHash, transactionCallback) {
  var transactionInfo = await web3.eth.getTransaction(transactionHash);
  await DBUtils.saveTransaction(transactionInfo);
  var transactionReceipt = await web3.eth.getTransactionReceipt(
    transactionHash
  );
  await DBUtils.saveTransactionReceipt(transactionReceipt);
  if (transactionReceipt.logs && transactionReceipt.logs.length) {
    transactionReceipt.logs.forEach(async log => {
      await DBUtils.saveLogs(db, log);
    });
  }

  transactionCallback(null, "");
}
