const CardMetadata = artifacts.require("./CardMetadata.sol");
const CryptageCards = artifacts.require("./CryptageCards.sol");
const Booster = artifacts.require("./Booster.sol");

contract('CryptageCards', async (accounts) => {

    let cardMetadata, cryptageCards, booster;

    before(async () => {
        cardMetadata = await CardMetadata.deployed();
        cryptageCards = await CryptageCards.deployed();
        booster = await Booster.deployed();

        // add metadata
        let count = 20;
        for (let i=0; i<count; i++) {
            await cardMetadata.addCardMetadata(Math.floor((Math.random() * 1000) + 1), "ipfsHash", 0x0);
        }

        // buy boosters
        let price = await booster.BOOSTER_PRICE();
        count = 10;
        for (let i=0; i<count; i++) {
            await booster.buyInstantBooster({value: price});
        }
    });

    it("...Should be able to get metadata", async () => { 

        let balance = await cryptageCards.balanceOf(accounts[0]);
        let metadata = await cryptageCards.metadata(balance-1);
        
        assert.equal("ipfsHash", metadata[2], "Text should be 'ipfsHash'");
    });

    it("...Should be able to transfer card", async () => { 

        let balance = await cryptageCards.balanceOf(accounts[0]);
        let cardId = balance-1;

        await cryptageCards.safeTransferFrom(accounts[0], accounts[1], cardId);

        let balanceOfNewAcc = await cryptageCards.balanceOf(accounts[1]);
        let ownerAddress = await cryptageCards.ownerOf(cardId);
        
        assert.equal(ownerAddress, accounts[1], "New owner should be account[1]");
        assert.equal(balanceOfNewAcc, 1, "Accounts[1] should have balance equal to 1");
    });

});