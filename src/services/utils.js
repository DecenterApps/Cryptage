import React from 'react';
import serialize from 'serialijse';
import cardsConfig from '../constants/cards.json';
import { GET_ACCOUNT_SUCCESS, typeGradients } from '../actions/actionTypes';

/**
 * Generates unique id
 *
 * @return {String}
 */
export const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

/**
 * Shuffles array items
 *
 * @param {Array} _array
 * @return {Array}
 */
export const shuffleArray = (_array) => {
  const array = [..._array];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Generates array of strings that represent a card class
 * (e.g 'card-heart-14'), returns standard playing deck of 52 cards
 *
 * @return {Array}
 */
export const generateRandomDeck = () => (
  shuffleArray(
    // Card types
    ['heart', 'spade', 'diamond', 'club']
    // Create 14 css classes for each card type
      .map((cardType) => {
        const cardTypeArr = [];
        for (let i = 1; i <= 13; i += 1) cardTypeArr.push({
          id: guid(),
          type: `card-${cardType}-${i}`
        });
        return cardTypeArr;
      })
      // Merge all card type arrays into one
      .reduce((acc, val) => [...acc, ...val]),
  )
);

/**
 * Generates array of integers between 'from' and 'to'
 * not including 'to'
 *
 * @return {Array}
 */
export const range = (from, to) => {
  if (to < from) {
    console.error(`Invalid range params: from ${from} to ${to}`);
    return [];
  }
  let _range = [...Array(to - from).keys()];
  if (from) _range = _range.map(i => i + from);
  return _range;
};

/**
 * console.logs each argument if on development server or if window.LOG_EVERYTHING is set
 */
export function log(...args) {
  if (process.env.env !== 'production' || window.LOG_EVERYTHING) {
    const argsParsed = [];
    args.forEach((argument) => {
      if (typeof argument === 'string') {
        argsParsed.push(`%c${argument}`);
        argsParsed.push('color: #1c70cc');
      } else argsParsed.push(argument);
    });
    console.log(...argsParsed);
  }
}

/**
 * Returns name of Ethereum network for given ID
 *
 * @return {String}
 */
export const nameOfNetwork = (networkId) => {
  const networks = {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkedby',
    42: 'Kovan',
  };
  return networks[networkId] || 'Unknown network';
};

/**
 * Returns hashed order of card uid-s separated by "-"
 * e.g. hash(1-4-3-1)
 *
 * @param {Array} deck
 * @return {Promise}
 */
export const generateDeckCardHash = deck =>
  new Promise(async (resolve) => {
    const string = deck.reduce((_acc, currVal, index) => {
      let acc = _acc.slice(0);

      if (index === 0) acc = acc.concat(currVal.id);
      if (index !== 0) acc = acc.concat(`-${currVal.id}`);

      return acc;
    }, '');

    const str = await window.web3.utils.sha3(string);
    resolve(str);
  });

/**
 * Formats deck so that it is acceptable
 * on the server
 *
 * @param {Array} deck - [{ id, metadata: { power }, type }]
 * @return {Array} [{ uid, power }]
 */
export const formatDeckForServer = deck => (
  deck.map(({ id, metadata }) => ({ uid: parseInt(id, 10), power: parseInt(metadata.rarity, 10) }))
);

/**
 * Formats message to format for signing
 *
 * @param {String} message
 * @return {String}
 */
export const formatSigningMessage = (message) => `0x${atob(message)}`;

/**
 * Formats signed message in order for server to validate
 *
 * @param {String} _signature
 * @return {String}
 */
export const formatSignature = (_signature) => {
  let signature = _signature.slice(0);
  // Replace last two signature characters
  signature = signature.slice(0, -2);
  signature = signature.slice(2, signature.length);
  signature = signature.concat('00');
  return signature;
};

/**
 * Removes player cards that have been played
 *
 * @param {Array} stateCards
 * @param {Array} _contractCards
 * @return {Array}
 */
export const removePlayedCards = (stateCards, _contractCards) =>
  _contractCards.map((contractCard) => {
    const foundCardInState = stateCards.find(stateCard => contractCard.id === stateCard.id);

    if (!foundCardInState) return contractCard;
    return foundCardInState;
  });

/**
 * Saves current gameplay state to localStorage for account
 *
 * @param {Gameplay} state
 * @param {String} type
 * @return {Gameplay} state
 */
export const saveGameplayState = (state, type) => {
  const { account } = state;

  if (type === GET_ACCOUNT_SUCCESS || !account) return state;

  localStorage.setItem(`cryptage-${account}`, serialize.serialize(state));
  return state;
};

/**
 * Checks if item is object
 * @param {*} item
 * @return {Boolean}
 */
export const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

/**
 * Does deep merge
 *
 * @param {Object} target
 * @param {Object} source
 * @return {*}
 */
export const mergeDeep = (target, source) => {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

/**
 * Returns object with only the provided allowed
 * property keys
 *
 * @param {Object} object
 * @param {Array} allowedKeys
 */
export const filterByKeys = (object, allowedKeys) =>
  Object.keys(object)
    .filter(key => allowedKeys.includes(key) && object[key] > 0)
    .reduce((_obj, key) => {
      const obj = { ..._obj };
      obj[key] = object[key];
      return obj;
    }, {});

export const formatBigNumber = (_number) => {
  const number = parseFloat(_number);

  if (number >= 1000000) return `${number / 1000000}m`;
  if (number >= 1000) return `${number / 1000}k`;

  return number.toString();
};

export const formatBigNumberWithBreak = (_number) => {
  const number = parseFloat(_number);

  if (number >= 10000000) return `${number / 1000000}\nm`;
  if (number >= 1000000) {
    if (number % 1000000) return `${number / 1000000}\nk`;
    return `${number / 1000000}k`;
  }
  if (number >= 10000) return `${number / 1000}\nk`;
  if (number >= 1000) {
    if (number % 1000) return `${number / 1000}\nk`;
    return `${number / 1000}k`;
  }

  return number.toString();
};

export const getCardAtContainer = (locations, locationIndex, containerIndex) => {
  try {
    return locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.cards;
  } catch (e) {
    return null;
  }
};

export const classForRarity = (_rarity) => {
  const number = parseInt(_rarity, 10);
  if (number >= 850) return 'normal';
  if (number >= 600) return 'blue';
  if (number >= 325) return 'purple';
  return 'gold';
};

export const classNameForRarity = (_rarity) => {
  const number = parseInt(_rarity, 10);
  if (number >= 850) return 'normal';
  if (number >= 600) return 'scarce';
  if (number >= 325) return 'rare';
  return 'elite';
};

export const compareCategories = (a, b) => {
  const categoryMap = [
    'available',
    'location',
    'container',
    'mining',
    'person',
    'project',
    'power',
    'misc',
  ];
  return categoryMap.indexOf(a.toLowerCase()) - categoryMap.indexOf(b.toLowerCase());
};

export const compareCards = (a, b) => {
  if (a.type !== b.type) return compareCategories(a.type, b.type);
  if (a.cost.level !== b.cost.level) return a.cost.level - b.cost.level;
  return a.cost.funds - b.cost.funds;
};

/**
 * Sorts cards in group
 *
 * @param {Array} group
 * @return {Array}
 */
export const sortTypeGroupByPrice = group => group.sort(compareCards);

export const mergeErrorMessages = (...messages) => {
  const result = {};
  let allowed = true;
  for (const message of messages) {
    for (const prop of Object.keys(message)) {
      if (Array.isArray(message[prop])) {
        if (!result[prop]) {
          result[prop] = message[prop].slice(0);
        } else {
          result[prop] = result[prop].concat(message[prop]);
        }
        if (allowed && result[prop].length > 0) {
          allowed = false;
        }
      } else if (typeof result[prop] === 'undefined' || result[prop]) {
        result[prop] = message[prop];
        allowed = allowed && result[prop];
      }
    }
  }
  result.allowed = allowed;
  return result;
};

export const getDataForTypeSorting = (cards) => {
  const allType = {
    color: typeGradients.container,
    name: 'All',
    total: Object.keys(cardsConfig.cards).length,
    collected: 0,
  };
  const allCards = Object.keys(cardsConfig.cards).map(cardTypeId => cardsConfig.cards[cardTypeId]['1'].title);
  allType.collected = cards.reduce((acc, card) => {
    const typeIndex = allCards.findIndex(title => title === card.title);

    if (typeIndex !== -1) {
      allCards.splice(typeIndex, 1);
      acc += 1;
    }
    return acc;
  }, 0);

  return Object.keys(typeGradients).reduce((_acc, key) => {
    const acc = [..._acc];
    const item = { color: typeGradients[key], name: key, total: 0, collected: 0 };
    const typeTitles = [];

    Object.keys(cardsConfig.cards).forEach((cardTypeId) => {
      if (cardsConfig.cards[cardTypeId]['1'].type.toLowerCase() === key) {
        item.total += 1;
        typeTitles.push(cardsConfig.cards[cardTypeId]['1'].title);
      }
    });

    item.collected = cards.reduce((acc, card) => {
      const typeIndex = typeTitles.findIndex(title => title === card.title);

      if (typeIndex !== -1) {
        typeTitles.splice(typeIndex, 1);
        acc += 1;
      }
      return acc;
    }, 0);

    acc.push(item);
    return acc;
  }, [allType]);
};

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
