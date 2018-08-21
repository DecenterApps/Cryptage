const CryptageCards = artifacts.require("./CryptageCards.sol");
const Booster = artifacts.require("./Booster.sol");
const CardMetadata = artifacts.require("./CardMetadata.sol");
const CardPackToken = artifacts.require('./CardPackToken');

module.exports = function(deployer) {
	deployer.deploy(CardMetadata)
	.then(() => deployer.deploy(CryptageCards))
	.then(() => deployer.deploy(Booster, CryptageCards.address))
	.then(() => Booster.deployed())
	.then((booster) => booster.addMetadataContract(CardMetadata.address))
	.then(() => CryptageCards.deployed())
	.then((cards) => cards.addBoosterContract(Booster.address))
	.then(() => CryptageCards.deployed())
	.then((cards) => cards.addMetadataContract(CardMetadata.address))
	.then(() => true);
};
