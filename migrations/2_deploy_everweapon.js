const EverWeapons = artifacts.require("EverWeapons")

module.exports = function (deployer) {
  deployer.deploy(EverWeapons)
}
