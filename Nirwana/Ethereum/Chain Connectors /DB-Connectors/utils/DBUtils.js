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
