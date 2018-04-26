import update from 'immutability-helper';
import { getSlotForContainer } from './gameMechanicsService';
import { acceptedAssetLevelUpIds, containerIds, LOCATION_ITEM_DROP_SLOTS } from '../actions/actionTypes';

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
 * @param {Array} _cards
 * @param {Function} getState
 * @return {Array}
 */
export const removePlayedCards = (_cards, getState) => {
  const { locations, projects } = getState().gameplay;
  const cards = [..._cards];

  locations.forEach(({ lastDroppedItem }) => {
    if ((lastDroppedItem !== null) && typeof (lastDroppedItem === 'object')) {
      // remove location cards from player cards
      lastDroppedItem.cards.forEach((locationCard) => {
        const playedLocationCardIndex = cards.findIndex(_card => _card.id === locationCard.id);
        cards.splice(playedLocationCardIndex, 1);
      });

      // remove asset cards from location drop slots
      lastDroppedItem.dropSlots.forEach((locationItemSlot) => {
        const locationItem = locationItemSlot.lastDroppedItem;

        if ((locationItem !== null) && typeof (locationItem === 'object')) {
          locationItemSlot.lastDroppedItem.cards.forEach((locationItemCard) => {
            const playedLocationCardIndex = cards.findIndex(_card => _card.id === locationItemCard.id);
            cards.splice(playedLocationCardIndex, 1);

            // remove miner cards
            if (locationItemCard.stats.type === 'Container') {
              locationItem.dropSlots.forEach((containerDropSlot) => {
                const minerItem = containerDropSlot.lastDroppedItem;

                if ((minerItem !== null) && typeof (minerItem === 'object')) {
                  minerItem.cards.forEach((minerCard) => {
                    const playedMinerCardIndex = cards.findIndex(_card => _card.id === minerCard.id);
                    cards.splice(playedMinerCardIndex, 1);
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  // remove project cards from project drop slots
  projects.forEach(({ lastDroppedItem }) => {
    if ((lastDroppedItem !== null) && typeof (lastDroppedItem === 'object')) {
      lastDroppedItem.cards.forEach((projectCard) => {
        const playedProjectCardIndex = cards.findIndex(_card => _card.id === projectCard.id);
        cards.splice(playedProjectCardIndex, 1);
      });
    }
  });

  console.log('cards', cards);
  return cards;
};

/**
 * Saves current gameplay state to localStorage for account
 *
 * @param {Function} getState
 */
export const saveGameplayState = (getState) => {
  const state = getState();
  const { account } = state.app;

  if (!account) {
    console.error('Account missing when trying to save state');
    return;
  }

  localStorage.setItem(`player-location-${account}`, JSON.stringify(state.gameplay));
};

/**
 * Updates active location drop slot items
 *
 * @param {Array} _locationSlots
 * @param {Number} index
 * @param {Object} item
 * @param {Array} _locations
 * @param {Number} activeLocationIndex
 * @param {Object} special
 * @return {Array}
 */
export const updateLocationDropSlotItems = (_locationSlots, index, item, _locations, activeLocationIndex, special) => {
  const typeId = item.card.metadata.id;
  const isContainer = containerIds.includes(typeId);
  let assetAccepts = [];
  let dropSlots = null;

  // only Container and Misc asset type cards can't level up
  if (acceptedAssetLevelUpIds.includes(typeId)) assetAccepts = [item.card.metadata.id];
  // there must be an accept for container for the drag miner over container feature
  if (isContainer) {
    dropSlots = getSlotForContainer(item.card.metadata.id, item.card.stats.values.space);
    assetAccepts = [...dropSlots[0].accepts];
  }

  const locationSlots = update(_locationSlots, {
    [index]: {
      accepts: { $set: assetAccepts },
      lastDroppedItem: {
        $set: {
          cards: [{ ...item.card }],
          mainCard: { ...item.card, slotIndex: index, locationIndex: activeLocationIndex },
          dropSlots,
          special,
        },
      },
    },
  });

  return update(_locations, {
    [activeLocationIndex]: {
      lastDroppedItem: {
        dropSlots: { $set: locationSlots },
      },
    },
  });
};

/**
 * Gets all asset cards that were dropped on the field
 *
 * @param {Array} _locations
 * @return {Array}
 */
export const getPlayedAssetCards = (_locations) => {
  const locations = _locations.filter(_location => _location.lastDroppedItem);

  const playedCards = locations.map((_locationWithCards) => {
    const arr = _locationWithCards.lastDroppedItem.dropSlots
      .filter(_locationDropSlot => _locationDropSlot.lastDroppedItem)
      .map(({ lastDroppedItem }) => lastDroppedItem.mainCard);

    return Array.prototype.concat(...arr);
  });

  return Array.prototype.concat(...playedCards);
};

/**
 * Gets all location cards that were dropped on location slots
 *
 * @param {Array} _locations
 * @return {Array}
 */
export const getPlayedLocationCards = _locations => (
  Array.prototype.concat(_locations
    .filter(_location => _location.lastDroppedItem)
    .map(_locationWithCards => _locationWithCards.lastDroppedItem.mainCard))
);

/**
 * Calculates the number of total cards needed
 * to level up
 *
 * @param {Number} level
 * @return {Object}
 */
const calcCardsNeededToLevelUp = (level) => {
  if (level === 1) return 3;

  let numOfCards = 3;
  for (let i = 2; i <= level; i += 1) {
    numOfCards += (i + 1);
  }

  return numOfCards;
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

/**
 * Updates locations object with new location object
 *
 * @param {Array} locations
 * @param {Number} index
 * @param {Object} item
 * @return {Array}
 */
export const updateLocationsDropSlots = (locations, index, item) =>
  update(locations, {
    [index]: {
      // only allow the card type that has been dropped now to be dropped again
      accepts: { $set: [item.card.metadata.id] },
      lastDroppedItem: {
        $set: {
          values: { ...item.card.stats.values },
          dropSlots: LOCATION_ITEM_DROP_SLOTS,
          cards: [{ ...item.card }],
          mainCard: { ...item.card },
        },
      },
    },
  });

/**
 * Updates projects object with new project object
 *
 * @param {Array} projects
 * @param {Number} index
 * @param {Object} item
 * @return {Array}
 */
export const updateProjectsDropSlots = (projects, index, item, blockNumber) =>
  update(projects, {
    [index]: {
      // only allow the card type that has been dropped now to be dropped again
      accepts: { $set: [item.card.metadata.id] },
      slotType: { $set: 'project' },
      lastDroppedItem: {
        $set: {
          cards: [{ ...item.card }],
          mainCard: { ...item.card },
          isActive: true,
          isFinished: false,
          timeDecrease: 0,
          expiryTime: blockNumber + item.card.stats.cost.time,
          timesFinished: 0,
          modifiedFundsBonus: 0,
        },
      },
    },
  });

/**
 * Updates active location drop slot items
 *
 * @return {Array}
 */
export const updateContainerDropSlotItems = (locationIndex, containerIndex, cardIndex, item, _containerSlots, _locations) => { // eslint-disable-line
  const containerSlots = update(_containerSlots, {
    [cardIndex]: {
      accepts: { $set: [item.card.metadata.id] },
      lastDroppedItem: {
        $set: {
          cards: [{ ...item.card }],
          mainCard: { ...item.card },
        },
      },
    },
  });

  let locationSlots = [..._locations[locationIndex].lastDroppedItem.dropSlots];

  locationSlots = update(locationSlots, {
    [containerIndex]: {
      lastDroppedItem: {
        dropSlots: { $set: containerSlots },
      },
    },
  });

  return update(_locations, {
    [locationIndex]: {
      lastDroppedItem: {
        dropSlots: { $set: locationSlots },
      },
    },
  });
};

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

const getElemType = (loc, i) => loc && loc.lastDroppedItem.mainCard ? loc.lastDroppedItem.mainCard.metadata.id : []; //eslint-disable-line
const getSlots = loc => loc && loc.lastDroppedItem ? loc.lastDroppedItem.dropSlots : []; //eslint-disable-line

/**
 * Gets cards ids for all the cards in the given location
 *
 */
export const getCardIdsFromLocation = (location, items) => {
  if (!getSlots(location)) {
    return;
  }

  getSlots(location).forEach((elem, i) => {
    if (elem.lastDroppedItem) {
      if (getElemType(elem, i) === []) {
        return;
      }

      items.push(getElemType(elem, i));
      getCardIdsFromLocation(elem, items);
    }
  });
};

export const classForRarity = (_rarity) => {
  const number = parseInt(_rarity, 10);
  if (number >= 900) return 'normal';
  if (number >= 576) return 'blue';
  if (number >= 485) return 'gold';
  return 'red';
};
