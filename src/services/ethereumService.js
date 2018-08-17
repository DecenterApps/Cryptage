import config from '../constants/config.json';
import cardsInfo from '../constants/cards.json';
import { BigNumber } from 'bignumber.js';
import { log } from './utils';

const getAccount = () => (
  new Promise((resolve, reject) => {
    web3.eth.getAccounts()
      .then((accounts) => {
        if (!accounts.length) throw new Error('No accounts (Possibly locked)');
        resolve(accounts[0]);
      })
      .catch((err) => {
        reject(err);
      });
  })
);

const getBalance = async (_account) => {
  const account = _account || await getAccount();
  const balanceWei = await web3.eth.getBalance(account);
  const balanceEth = web3.utils.fromWei(balanceWei);
  // optionally convert to BigNumber here
  // return new web3.utils.BN(balanceEth);
  return balanceEth;
};

const getBlockNumber = () => web3.eth.getBlockNumber();

const getNetwork = () => web3.eth.net.getId();

const getCardContract = async () => {
  const account = await getAccount();
  return new web3.eth.Contract(config.cardContract.abi, config.cardContract.address, {
    from: account,
  });
};

const getMetadataContract = async () => {
  const account = await getAccount();
  return new web3.eth.Contract(config.metadataContract.abi, config.metadataContract.address, {
    from: account,
  });
};

const getBoosterContract = async () => {
  const account = await getAccount();
  return new web3.eth.Contract(config.boosterContract.abi, config.boosterContract.address, {
    from: account,
  });
};

const getBoosterContractWS = async () => {
  const account = await getAccount();
  return new web3Subscriber.eth.Contract(config.boosterContract.abi, config.boosterContract.address, {
    from: account,
  });
};

const getStateContract = async () => {
  const account = await getAccount();
  return new web3.eth.Contract(config.stateContract.abi, config.stateContract.address, {
    from: account,
  });
};

const getBitGuildContract = () => {
  return new window.web3.eth.Contract(config.bitGuildContract.abi, config.bitGuildContract.address);
};

const getOracleContract = () => {
  return new window.web3.eth.Contract(config.oracleContract.abi, config.oracleContract.address);
};

const getLeaderboardContract = acc =>
  new web3.eth.Contract(config.stateContract.abi, config.stateContract.address, { from: acc });

/**
 * DEV HELPER
 * Adds a card to an account
 */
const createCard = async (_account) => {
  log('Creating card');
  const account = _account || await getAccount();
  const cardContract = await getCardContract();

  // return cardContract.methods.createCard(account).send();

  // const metadataContract = await getMetadataContract();
  // return metadataContract.methods.addCardMetadata(5, 0).send();

  return cardContract.methods.createCard(account, 0, 4).send();
};

/**
 * Fetches total number of cards an account owns
 * `account` param is optional, uses current account by default
 */
const getNumberOfCardsOwned = async (_account) => {
  const account = _account || await getAccount();
  const cardContract = await getCardContract();
  return cardContract.methods.balanceOf(account).call();
};

/**
 * Fetches array of IDs of all cards an account owns
 * `account` param is optional, uses current account by default
 */
const getUsersCards = _account =>
  new Promise(async (resolve, reject) => {
    const account = _account || await getAccount();
    const cardContract = await getCardContract();

    try {
      const cards = await cardContract.methods.getUserCards(account).call();
      // log(`User's cards (IDs): ${JSON.stringify(cards)}`);
      resolve(cards);
    } catch (err) {
      reject(err);
    }
  });

/**
 * will be expanded to return more values
 * currently only returns 'power' of card
 */
const getCardMetadata = async (id) => {
  const cardContract = await getCardContract();
  return cardContract.methods.metadata(id).call();
};

const getBoughtBoosters = async () => {
  const boosterContract = await getBoosterContract();
  try {
    const currentBlockNumber = await getBlockNumber();
    const boosters = await boosterContract.methods.getMyBoosters().call();

    const boosterPromises = boosters.map(async (id) => {
      const blockNumber = await boosterContract.methods.blockNumbers(id).call();
      if (currentBlockNumber - blockNumber > 255) return {
        id,
        expired: true,
      };

      return cardsInfo.boosters[id] || {
        id,
        blockNumber,
      };
    });

    return Promise.all(boosterPromises);
  } catch (e) {
    throw new Error('Cannot get boosters.');
  }
};

const getCardsFromBooster = async (boosterId) => {
  const boosterContract = await getBoosterContract();
  try {
    return await boosterContract.methods.getCardFromBooster(boosterId).call();
  } catch (e) {
    log(e);
    throw Error('Cannot get cards.');
  }
};

const buyBooster = async () => {
  const boosterContract = await getBoosterContract();
  try {
    return boosterContract.methods.buyInstantBooster().send({
      value: web3.utils.toWei('0.001', 'ether'),
    });
  } catch (e) {
    log(e);
    throw new Error('Cannot buy booster.');
  }
};

const buyBoosterBitGuild = async (_account) => new Promise(async (resolve, reject) => {
  const account = _account || await getAccount();

  const bitGuildContract = getBitGuildContract();
  const oracleContract = getOracleContract();
  const boosterContract = await getBoosterContractWS();

  const PLATprice = await oracleContract.methods.ETHPrice().call();
  const price = new BigNumber(PLATprice, 10);
  const amount = new BigNumber(price * 1e15 / 1e18);
  
  try {
    bitGuildContract.methods.approveAndCall(config.boosterContract.address, amount, '0x00').send({
      from: account
    }, function(err, res) {
      console.log(err, res);
      if (!err) {
        boosterContract.once( 'BoosterInstantBought',
          { filter: { user: account } },
          (error, result) => {
            if (!error) {
              console.log(result);
              resolve(result.returnValues.boosterId);
            } else {
              console.log(error);
              resolve({error : 'Cannot get boosterId.'});
            }
        });
      } else {
        resolve(err);
      }
    });
  } catch (e) {
    log(e);
    throw Error('Cannot get cards.');
  }
});

const revealBooster = async (id) => {
  const boosterContract = await getBoosterContract();
  return boosterContract.methods.revealBooster(parseInt(id, 10)).send();
};

const updateMoves = async (moves, nickname) => {
  const stateContract = await getStateContract();
  return stateContract.methods.update(moves, web3.utils.toHex(nickname)).send();
};

const getState = async () => {
  const stateContract = await getStateContract();
  return stateContract.methods.get().call();
};

const resetState = async () => {
  const stateContract = await getStateContract();
  return stateContract.methods.reset().send();
};

export default {
  getAccount,
  getBalance,
  getNetwork,
  getBlockNumber,
  createCard,
  getNumberOfCardsOwned,
  getUsersCards,
  getCardMetadata,
  getBoughtBoosters,
  getCardsFromBooster,
  buyBooster,
  buyBoosterBitGuild,
  revealBooster,
  updateMoves,
  getState,
  resetState,
  getLeaderboardContract,
};
