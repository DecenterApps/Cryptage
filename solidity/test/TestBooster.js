const CardMetadata = artifacts.require("./CardMetadata.sol");
const CryptageCards = artifacts.require("./CryptageCards.sol");
const Booster = artifacts.require("./Booster.sol");

function compare(a,b) {
    if (a.rarity < b.rarity)
      return -1;
    if (a.rarity > b.rarity)
      return 1;
    return 0;
  }
  

contract('Booster', async (accounts) => {

    let cardMetadata, cryptageCards, booster;
    let metadataArray = [];

    before(async () => {
        cardMetadata = await CardMetadata.deployed();
        cryptageCards = await CryptageCards.deployed();
        booster = await Booster.deployed();
        count = 10;
        for (let i=0; i<count; i++) {
            let rarity = Math.floor((Math.random() * 1000) + 1);
            await cardMetadata.addCardMetadata(rarity, "ipfsHash", 0x0);
            metadataArray.push({'id': i, 'rarity': rarity});
        }
    });

    it("...Should buy booster", async () => {
        let price = await booster.BOOSTER_PRICE();
        let count = 10;
        for (let i=0; i<count; i++) {
            await booster.buyInstantBooster({value: price});
        }

        let balance = await cryptageCards.balanceOf(accounts[0]);

        assert.equal(balance, count*5, "I should have count*5 cards");
    });

    // it("...Should have sorted cards by rarity", async () => {
    //     let price = await booster.BOOSTER_PRICE();
    //     let count = 300;
    //     for (let i=0; i<count; i++) {
    //         await booster.buyInstantBooster({value: price});
    //     }

    //     metadataArray.sort(compare);

    //     let last = 0;
    //     for(let i=0; i<metadataArray.length; i++) {
    //         let curr = await cryptageCards.numberOfCardsWithType(accounts[0], metadataArray[i].id);
    //         assert.equal(parseInt(last) <= parseInt(curr), true, `Rarity is different than it should be, ${last}<=${curr} is not true, ${i}`);
    //         last = curr;
    //     }
    // });

});