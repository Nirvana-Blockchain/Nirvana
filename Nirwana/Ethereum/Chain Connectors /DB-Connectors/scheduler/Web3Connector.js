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

async function startFetchingData(db, web3) {
  var number = await web3.eth.getBlockNumber();
  for (var i = 0; i < number; i++) {
    var blockInfo = await web3.eth.getBlock(i);
    console.log(blockInfo);
    DBUtils.saveBlock(db, blockInfo);
  }
}

function processBlock(block) {}

function getBlockInfos() {
  var deferred = $q.defer();

  web3.eth.getBlock($scope.blockId, function(error, result) {
    if (!error) {
      deferred.resolve(result);
    } else {
      deferred.reject(error);
    }
  });
  return deferred.promise;
}
