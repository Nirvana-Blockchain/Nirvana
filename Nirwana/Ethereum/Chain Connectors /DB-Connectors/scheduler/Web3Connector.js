/**
 * This schedule will run every morning from Monday to Friday morning 8:30 am
 */
var Web3 = require("web3");
var Config = require("../config/Config");
exports.invoke = async db => {
  dataBase = db;
  var url =
    "http://" +
    Config.getConfig().GETH_HOSTNAME +
    ":" +
    Config.getConfig().GETH_RPCPORT;
  const provider = new Web3.providers.HttpProvider(url);
  var web3 = new Web3(provider);
  var number = await web3.eth.getBlockNumber();
  web3.eth.getTransactionFromBlock("0x0", number).then(console.log);

  startFetchingData(web3);
};

async function startFetchingData(web3) {
  // web3.eth.filter("latest", function(error, result) {
  //   if (!error) {
  //     console.log("=================", result);
  //   }
  // });
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
