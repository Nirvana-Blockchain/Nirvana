var Web3Connector = require("./Web3Connector");

exports.invokeSchedulers = db => {
  Web3Connector.invoke(db);
};
