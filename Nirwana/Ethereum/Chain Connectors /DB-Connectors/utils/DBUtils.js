exports.saveBlock = (db, block) => {
  var dataToInsert = {
    author: block.author,
    difficulty: block.difficulty,
    extraData: block.extraData,
    gasLimit: block.gasLimit,
    gasUsed: block.gasUsed,
    hash: block.hash,
    logsBloom: block.logsBloom,
    miner: block.miner,
    number: block.number,
    parentHash: block.parentHash,
    receiptsRoot: block.receiptsRoot,
    sealFields: block.sealFields,
    sha3Uncles: block.sha3Uncles,
    signature: block.signature,
    size: block.size,
    stateRoot: block.stateRoot,
    step: block.step,
    timestamp: block.timestamp,
    totalDifficulty: block.totalDifficulty,
    transactions: block.transactions,
    transactionsRoot: block.transactionsRoot
  };

  db.BlockTable.create(dataToInsert).then(
    function(result) {
      console.log(" result Success", result);
    },
    function(error) {
      console.log(" result Success", error);
    }
  );
};

exports.saveTransactionReceipt = (db, block) => {
  var dataToInsert = {
    blockHash: transaction.blockHash,
    blockNumber: transaction.blockNumber,
    contractAddress: transaction.contractAddress,
    cumulativeGasUsed: transaction.cumulativeGasUsed,
    from: transaction.from,
    gasUsed: transaction.gasUsed,
    logsBloom: transaction.logsBloom,
    root: transaction.root,
    status: transaction.status,
    to: transaction.to,
    transactionHash: transaction.transactionHash,
    transactionIndex: transaction.transactionIndex
  };

  db.BlockTable.create(dataToInsert).then(
    function(result) {
      console.log(" result Success", result);
    },
    function(error) {
      console.log(" result Success", error);
    }
  );
};

exports.saveTransaction = (db, transaction) => {
  var dataToInsert = {
    blockHash: transaction.blockHash,
    blockNumber: transaction.blockNumber,
    chainId: transaction.chainId,
    condition: transaction.condition,
    creates: transaction.creates,
    from: transaction.from,
    gas: transaction.gas,
    gasPrice: transaction.gasPrice,
    hash: transaction.hash,
    input: transaction.number,
    nonce: transaction.nonce,
    publicKey: transaction.publicKey,
    r: transaction.r,
    raw: transaction.raw,
    s: transaction.s,
    standardV: transaction.standardV,
    to: transaction.to,
    transactionIndex: transaction.transactionIndex,
    v: transaction.v,
    value: transaction.value
  };

  db.TransactionTable.create(dataToInsert).then(
    function(result) {
      console.log(" result Success", result);
    },
    function(error) {
      console.log(" result Success", error);
    }
  );
};

exports.saveLogs = (db, logs) => {
  var dataToInsert = {
    blockHash: logs.blockHash,
    blockNumber: logs.blockNumber,
    address: logs.address,
    data: logs.data,
    id: logs.id,
    logIndex: logs.logIndex,
    removed: logs.removed,
    topics: logs.topics,
    transactionHash: logs.transactionHash,
    transactionInlogsdex: logs.transactionIndex,
    transactionLogIndex: logs.transactionLogIndex,
    type: logs.type
  };

  db.TransactionTable.create(dataToInsert).then(
    function(result) {
      console.log(" result Success", result);
    },
    function(error) {
      console.log(" result Success", error);
    }
  );
};
