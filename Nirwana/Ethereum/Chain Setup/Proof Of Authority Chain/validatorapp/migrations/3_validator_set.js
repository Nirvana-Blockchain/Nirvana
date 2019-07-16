var Validators = artifacts.require("./Validators.sol");

module.exports = function(deployer) {
  deployer.deploy(Validators);
};
