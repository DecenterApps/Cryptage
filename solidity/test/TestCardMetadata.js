const CardMetadata = artifacts.require("./CardMetadata.sol");

contract('CardMetadata', async (accounts) => {

    let cardMetadata;

    before(async () => {
        cardMetadata = await CardMetadata.deployed();
    });

    it("...Should add metadata", async () => { 
        let res, maxRarity, rarity, count;
        maxRarity = 0;
        count = 20;
        for (let i=0; i<count; i++) {
            rarity = Math.floor((Math.random() * 1000) + 1);
            res = await cardMetadata.addCardMetadata(rarity, "ipfsHash", 0x0);
            maxRarity += rarity;
        }

        let contractCount = await cardMetadata.getNumberOfCards();
        let contractMaxRarity = await cardMetadata.getMaxRandom();
        
        assert.equal(count, contractCount, "Contract count should be same as count");
        assert.equal(maxRarity, contractMaxRarity, "Max rarity should be same.");
    });

});