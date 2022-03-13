//var SimpleBank = artifacts.require("./SimpleBank.sol");
var TokenFactory = artifacts.require("./TokenFactory.sol");
var AirDrop = artifacts.require("./AirDrop.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleBank);
  deployer.deploy(TokenFactory);
  deployer.deploy(AirDrop);

};
