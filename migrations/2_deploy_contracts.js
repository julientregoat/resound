const Releases = artifacts.require('../contracts/Releases.sol')

module.exports = function (deployer) {
  deployer.deploy(Releases)
}
