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

  return db.BlockTable.create(dataToInsert);
};

exports.saveTransactionReceipt = (db, receipt) => {
  var dataToInsert = {
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    contractAddress: receipt.contractAddress,
    cumulativeGasUsed: receipt.cumulativeGasUsed,
    from: receipt.from,
    gasUsed: receipt.gasUsed,
    logsBloom: receipt.logsBloom,
    root: receipt.root,
    status: receipt.status,
    to: receipt.to,
    transactionHash: receipt.transactionHash,
    transactionIndex: receipt.transactionIndex
  };

  return db.Receipt.create(dataToInsert);
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

  return db.Transaction.create(dataToInsert);
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

  return db.Logs.create(dataToInsert);
};
