const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      host:"127.0.0.1",
      port: 7545,
      network_id:"5777"
    },
    test: {
      host:"172.26.39.222",
      port: 8540,
      network_id:"9616"
    }
  }
};
