//The aim is to create a common web3 object which is accessible throughout the app with a specifc connected host
let Web3 = require('web3');

console.log(Web3.currentProvider)

function setWeb3Version() {
  var versionJson = {};
  console.log("Node informatoin");
  //console.log(web3);
}



let web3 = new Web3(new Web3.providers.HttpProvider('http://172.26.39.146:8545'));

  // Set the connect status on the app
  if (web3 && web3.eth.net.isListening()) {
    console.log('connect_status', 'Connected');
    console.log(web3.eth.subscribe);
    // Gets the version data and populates the result UI
    setWeb3Version();

  } else {
    console.log('connect_status', 'Not Connected');
  }



module.exports = web3