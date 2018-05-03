const EthereumTx = require('ethereumjs-tx');
const Web3 = require('web3');

const fs = require('fs');

const config = require('./config');

const ourAddress = process.env.ADDRESS;
const ourPrivateKey = process.env.PRIV_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.decenter.com'));
web3.eth.defaultAccount = ourAddress;

const cryptageCardsContract = web3.eth.contract(config.cryptageCardsContract.abi).at(config.cryptageCardsContract.address);

let nonce = web3.eth.getTransactionCount(ourAddress);

const gasPrice = 1502509001;

function getCardType(type, title) {
  const types = {
    Person: 0,
    Project: 1,
    Power: 2,
    Location: 3,
    Special: 4,
    Container: 5,
    Mining: 6,
  };

  const customTypes = {
    'Computer Case': 5,
    'Mining Rig': 6,
    'ASIC Mount': 7,
    'CPU': 8,
    'Classic GPU': 8,
    'Holographic GPU': 8,
    'Corporate-grade GPU': 8,
    '3D Printed GPU': 8,
    'ASIC Miner': 9,
  };

  if (types[type] < 5) {
    return types[type];
  }

  return customTypes[title];
}

async function extractCards(arr) {
  const cards = JSON.parse(fs.readFileSync('./cards.json', 'utf-8')).cards;

  Object.keys(cards).forEach((key) => {
    if (cards[key][1].type !== 'Project' && cards[key][1].type !== 'Location') {
      Object.keys(cards[key]).forEach((level) => {
        let gains;
        if (cards[key][level].values !== undefined) {
          gains = [cards[key][level].values.development, cards[key][level].values.funds,
            cards[key][level].values.level, cards[key][level].values.development.power,
            cards[key][level].values.development.space, cards[key][level].values.development.time];
        } else {
          gains = [cards[key][level].bonus.development, cards[key][level].bonus.funds,
            cards[key][level].bonus.level, cards[key][level].bonus.development.power,
            cards[key][level].bonus.development.space, cards[key][level].bonus.development.time];
        }
        arr.push({
          _cardId: cards[key][level].ID,
          _type: getCardType(cards[key][level]._type, cards[key][level].title),
          _level: cards[key][level].level,
          _costs: [cards[key][level].cost.development, cards[key][level].cost.funds, cards[key][level].cost.level,
            cards[key][level].cost.development.power, cards[key][level].cost.development.space,
            cards[key][level].cost.development.time],
          _gains: gains,
          _specialAbilityValues: [],
        });
      });
    } else {
      let gains;
      if (cards[key][1].values !== undefined) {
        gains = [cards[key][1].values.development, cards[key][1].values.funds,
          cards[key][1].values.level, cards[key][1].values.development.power,
          cards[key][1].values.development.space, cards[key][1].values.development.time];
      } else {
        gains = [cards[key][1].bonus.development, cards[key][1].bonus.funds,
          cards[key][1].bonus.level, cards[key][1].bonus.development.power,
          cards[key][1].bonus.development.space, cards[key][1].bonus.development.time];
      }
      arr.push({
        _cardId: cards[key][1].ID,
        _type: getCardType(cards[key][1]._type),
        _level: 1,
        _costs: [cards[key][1].cost.development, cards[key][1].cost.funds, cards[key][1].cost.level,
          cards[key][1].cost.development.power, cards[key][1].cost.development.space,
          cards[key][1].cost.development.time],
        _gains: gains,
        _specialAbilityValues: [],
      });
    }
  });

  return arr;
}

const getEncodedParams = (contractMethod, params = null) => {
  let encodedTransaction = null;
  if (!params) {
    encodedTransaction = contractMethod.request.apply(contractMethod); // eslint-disable-line
  } else {
    encodedTransaction = contractMethod.request.apply(contractMethod, params); // eslint-disable-line
  }
  return encodedTransaction.params[0];
};

const sendTransaction = async (web3, contractMethod, from, params, _gasPrice, nonce) =>
  new Promise(async (resolve, reject) => {
    try {
      const privateKey = new Buffer(ourPrivateKey, 'hex');

      const { to, data } = getEncodedParams(contractMethod, params);

      const gasPrice = web3.toHex(_gasPrice);

      const gas = web3.toHex(1190000);

      const transactionParams = { from, to, data, gas, gasPrice, nonce };

      const txHash = await sendRawTransaction(web3, transactionParams, privateKey);
      console.log('TX hash', txHash);
      resolve(txHash);
    } catch (err) {
      reject(err);
    }
  });

const sendRawTransaction = (web3, transactionParams, privateKey) =>
  new Promise((resolve, reject) => {
    const tx = new EthereumTx(transactionParams);

    tx.sign(privateKey);

    const serializedTx = `0x${tx.serialize().toString('hex')}`;

    web3.eth.sendRawTransaction(serializedTx, (error, transactionHash) => {
      console.log("Err: ", error);
      if (error) reject(error);

      resolve(transactionHash);
    });
  });

async function sendTxInBatch(arr) {
  let nonce = await web3.eth.getTransactionCount(ourAddress);
  console.log(arr);

  for (let i = 0; i < arr.length; i += 1) {
    console.log(i);
    await sendTransaction(
      web3, cryptageCardsContract.addCard, ourAddress,
      [arr[i]._cardId, arr[i]._type, arr[i]._level, arr[i]._costs, arr[i]._gains, []], gasPrice, web3.toHex(nonce)
    );
    nonce += 1;
  }
}

(async () => {
  const arr = await extractCards([]);
  await sendTxInBatch(arr);
})();
