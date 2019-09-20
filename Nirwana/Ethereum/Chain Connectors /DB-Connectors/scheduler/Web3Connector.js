/**
 * This schedule will run every morning from Monday to Friday morning 8:30 am
 */
var Web3 = require("web3");
var Config = require("../config/Config");
var DBUtils = require("../utils/DBUtils");
var async = require("async");
var DataBase;
var totalNumberOfBlocks;
var numberOfThreads = 20;
var web3;

exports.invoke = async db => {
  DataBase = db;
  var url =
    "http://" +
    Config.getConfig().GETH_HOSTNAME +
    ":" +
    Config.getConfig().GETH_RPCPORT;
  const provider = new Web3.providers.HttpProvider(url);
  web3 = new Web3(provider);
  // totalNumberOfBlocks = await web3.eth.getBlockNumber();
  // startWritingData(261130, 261130 + numberOfThreads);
  checkBlockNumber(0);
};

async function checkBlockNumber(totalBlocksScanned) {
  var max = 0;
  if (totalBlocksScanned == 0) {
    max = await DataBase.BlockTable.max("number");
    if (isNaN(max)) {
      max = 0;
    }
  } else {
    max = totalBlocksScanned;
  }

  totalNumberOfBlocks = await web3.eth.getBlockNumber();

  if (max < totalNumberOfBlocks) {
    startWritingData(max, max + numberOfThreads);
  }
}

//================================== Process Block =============================================
async function startWritingData(fromBlock, toBlock) {
  var tasksArray = [];

  if (toBlock <= totalNumberOfBlocks) {
    console.log("Block Number ===== ", fromBlock, toBlock);
    // Creating parallel tasks to store blocks to DB
    for (var blockNumber = fromBlock; blockNumber < toBlock; blockNumber++) {
      tasksArray.push(processBlock.bind(null, blockNumber));
    }

    async.parallel(tasksArray, function(err, results) {
      // Once parallel tasks is done storing details to DB and pick next set on data untill all blocks are stored.
      if (toBlock <= totalNumberOfBlocks + 1) {
        startBlock = toBlock + 1;
        endBlock = toBlock + numberOfThreads;
        startWritingData(startBlock, endBlock);
      } else {
        console.log("done writing with data ");
      }
    });
  } else {
    checkBlockNumber(totalNumberOfBlocks);
  }
}

//*** Save the blocks details to db table */
async function processBlock(blockNumber) {
  var blockInfo = await web3.eth.getBlock(blockNumber);
  if (blockInfo.transactions && blockInfo.transactions.length > 0) {
    console.log(
      blockNumber,
      "Transaction count is  ",
      blockInfo.transactions.length
    );
    // Storing block to table
    await DBUtils.saveBlock(DataBase, blockInfo);

    var length = blockInfo.transactions.length;
    // If transaction is there on block store transaction parallely to DB
    startWritingTransactionData(
      0,
      length > numberOfThreads ? numberOfThreads : length,
      blockInfo.transactions
    );
  } else {
    // Save block info only
  }
}
//=================================================================================================

async function startWritingTransactionData(
  fromTransaction,
  toTransactoin,
  transactionsArray
) {
  var tasksArray = [];

  if (toTransactoin <= transactionsArray.length) {
    console.log("Block Number ===== ", fromTransaction, toTransactoin);

    // Createing parallel tasks for stroing transactions
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
      // Once parallel tasks is done storing details pick next set on data untill all transactions are stored.
      if (toTransactoin <= totalNumberOfBlocks + 1) {
        startTransaction = toTransactoin + 1;
        endTransaction = toTransactoin + numberOfThreads;
        // Calling same function with different index and range
        startWritingTransactionData(
          startTransaction,
          endTransaction,
          transactionsArray
        );
      } else {
      }
    });
  } else {
    console.log("Transactoin completed....");
  }
}

async function processTransaction(transactionHash) {
  // Fetching transaction details from blockchian
  var transactionInfo = await web3.eth.getTransaction(transactionHash);

  // saving transaction to DB
  var result = await DBUtils.saveTransaction(DataBase, transactionInfo);

  // Getting transaction receipt  for transaction has.
  var transactionReceipt = await web3.eth.getTransactionReceipt(
    transactionHash
  );
  //Saving transaction receipt Do
  var result = await DBUtils.saveTransactionReceipt(
    DataBase,
    transactionReceipt
  );

  // Checking if any log exists for receipt
  if (transactionReceipt.logs && transactionReceipt.logs.length) {
    transactionReceipt.logs.forEach(async log => {
      //Storing logs to DB table.
      await DBUtils.saveLogs(DataBase, log);
    });
  }
}
