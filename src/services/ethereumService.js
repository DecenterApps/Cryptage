import config from '../constants/config.json';
import cardsInfo from '../constants/cards.json';
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
      resolve(cards.reverse());
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
        name: 'Unknown',
        numOfCards: '?',
        price: '?',
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
    return boosterContract.methods.buyBooster().send({
      value: web3.utils.toWei('0.001', 'ether'),
    });
  } catch (e) {
    log(e);
    throw new Error('Cannot buy booster.');
  }
};

const revealBooster = async (id) => {
  const boosterContract = await getBoosterContract();
  return boosterContract.methods.revealBooster(parseInt(id, 10)).send();
};

export default {
  getAccount,
  getBalance,
  getNetwork,
  createCard,
  getNumberOfCardsOwned,
  getUsersCards,
  getCardMetadata,
  getBoughtBoosters,
  getCardsFromBooster,
  buyBooster,
  revealBooster,
};
