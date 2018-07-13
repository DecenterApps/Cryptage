import levels from '../constants/levels.json';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import cardsConfig from '../constants/cards.json';
import {
  filterByKeys, getDropSlotsAvailableLevelUp, getPlayedAssetCards, mergeErrorMessages,
  updateLocationDropSlotItems
} from './utils';
import { openNewLevelModal } from '../actions/modalActions';
import {
  CHANGE_PROJECT_STATE,
  GP_BUY_BOOSTER,
  GP_LOCATION,
  GP_LOCATION_CONTAINER,
  GP_LOCATION_MAIN,
  GP_NO_LOCATIONS,
  ADD_NEW_LEVEL_CARDS,
  bonusDevPerLocationCards,
} from '../actions/actionTypes';
import { fetchCardStats } from './cardService';
import Card from '../classes/Card';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {String} level
 * @return {Object}
 */
export const getLevelValuesForCard = (id, level = '1') => cardsConfig.cards[id][level];


/**
 * Calculates diff between current level and past level bonus stats
 *
 * @param {Object} card
 * @param {String} stat
 * @return {Number}
 */
export const getLevelCardBonusStatDiff = (card, stat) => {
  const metaDataId = card.metadataId;
  const { level } = card;

  let diff = 0;
  const currentLevelValue = getLevelValuesForCard(metaDataId, (level).toString()).bonus[stat];

  if (level === 1) diff += currentLevelValue;
  else diff = currentLevelValue - getLevelValuesForCard(metaDataId, (level - 1).toString()).bonus[stat];

  return diff;
};

/**
 * Takes in card, locations, global stats and deduces cost of playing card,
 * handles special card types math
 *
 * @param {Object} card
 * @param {Array} _locations
 * @param {Object} _globalStats
 * @param {Number} activeLocationIndex
 * @return {Object}
 */
export const handleCardMathematics = (card, _locations, _globalStats, activeLocationIndex) => {
  const locations = [..._locations];
  const globalStats = { ..._globalStats };

  const { cost, bonus } = card;

  const global = ['funds', 'development'];
  const local = ['power', 'space'];

  if (cost) {
    const globalCost = filterByKeys(cost, global);
    const localCost = filterByKeys(cost, local);

    if (Object.keys(globalCost).length) {
      Object.keys(globalCost).forEach((statKey) => {
        globalStats[statKey] -= globalCost[statKey];
      });
    }

    if (Object.keys(localCost).length) {
      Object.keys(localCost).forEach((statKey) => {
        if (card.level > 1) return;
        if (card.type === 'Mining' && statKey === 'space') return;

        locations[activeLocationIndex].card[statKey] -= localCost[statKey];
      });
    }
  }

  if (bonus) {
    const globalBonus = filterByKeys(bonus, global);
    const localBonus = filterByKeys(bonus, local);

    // Special cards have unique mechanism for bonus
    if (Object.keys(globalBonus).length && !card.special) {
      Object.keys(globalBonus).forEach((statKey) => {
        if (statKey === 'development') globalStats[statKey] += getLevelCardBonusStatDiff(card, statKey);
        else globalStats[statKey] += globalBonus[statKey];
      });
    }

    if (Object.keys(localBonus).length) {
      Object.keys(localBonus).forEach((statKey) => {
        locations[activeLocationIndex].card[statKey] += getLevelCardBonusStatDiff(card, statKey);
      });
    }
  }

  return { globalStats, locations };
};

/**
 * Returns corresponding array of drop slots for
 * provided container card id and space
 *
 * @param {Number} _id
 * @param {Number} space
 * @return {Array}
 */
export const getSlotForContainer = (_id, space) => {
  const id = parseInt(_id, 10);
  const slots = [];
  let accepts = [];

  // Computer Case only accepts CPU and Graphics cards
  if (id === 6) accepts = ['9', '10', '33', '34', '35'];
  // Mining Rig only accepts Graphics card
  if (id === 7) accepts = ['10', '33', '34', '35'];
  // ASIC Mount only accepts ASIC miner
  if (id === 8) accepts = ['11'];

  for (let i = 0; i < space; i += 1) slots.push({ accepts, lastDroppedItem: null, slotType: 'container_slot' });
  return slots;
};


/**
 * Checks if a card can be played because of number of available drop slots
 *
 * @param {String} type
 * @param {Boolean} locationSlotsLength
 * @param {Boolean} projectsSlotsLength
 * @param {Boolean} assetSlotsLength
 * @param {Boolean} containerSlotsLength
 * @return {Boolean}
 */
const checkSlotsAvailableForCardType = (
  type,
  locationSlotsLength,
  projectsSlotsLength,
  assetSlotsLength,
  containerSlotsLength,
) => {
  if (type === 'Location') return locationSlotsLength;
  if (type === 'Project') return projectsSlotsLength;
  if (type === 'Mining') return containerSlotsLength;
  if (type !== 'Location' || type !== 'Project' || type !== 'Mining') return assetSlotsLength;
};

/**
 * Checks if user has enough funds to level lup card
 *
 * @param {Object} card
 * @param {Object} globalStats
 * @return {Number}
 */
export const checkIfCanLevelUp = (card, globalStats) =>
  cardsConfig.cards[card.metadataId][card.level + 1] &&
  (globalStats.funds >= cardsConfig.cards[card.metadataId][card.level + 1].cost.funds);

/**
 * Checks if the cards the user wants to play can be played
 *
 * @param {Object} card
 * @param {Object} globalStats
 * @param {Object} activeLocation
 * @param {Object} ignoreSpace - this is only for mining cards
 * @return {Boolean}
 */
export const checkIfCanPlayCard = (card, globalStats, activeLocation = null, ignoreSpace = false) => {
  const cardLevel = card.level;
  const {
    level, funds, development, power, space,
  } = card.cost;

  if ((cardLevel === 1) && level > globalStats.level) return false;

  if (funds > globalStats.funds) return false;

  if ((cardLevel === 1) && development > globalStats.development) return false;

  if (activeLocation && ((cardLevel === 1) && (power > activeLocation.values.power))) return false;

  if (activeLocation && !ignoreSpace && ((cardLevel === 1) && (space > activeLocation.values.space))) return false;

  // checks for duplicates in active location
  if (activeLocation && ((cardLevel === 1) && card.unique)) {
    const foundElem = activeLocation.dropSlots.find(canPlaySlot => (
      canPlaySlot.card && (canPlaySlot.card.title === card.title)
    ));

    if (foundElem) return false;
  }

  return true;
};

/**
 * Returns true if there are available slots for
 * current active container
 *
 * @param {Array} locations
 * @param {Object|Boolean} locationItem
 * @param {Number} activeContainerIndex
 * @return {boolean}
 */
export const getContainerSlotsLength = (locations, locationItem, activeContainerIndex) => {
  let length = false;

  if (locationItem && locationItem.dropSlots[activeContainerIndex]) {
    const containerItem = locationItem.dropSlots[activeContainerIndex].card;

    if (containerItem && containerItem.dropSlots) {
      length = containerItem.dropSlots.filter(({ card }) => !card).length > 0;
    }
  }

  return length;
};

/**
 * Returns errors caused checkIfCanPlayCard
 *
 * @param cardStats
 * @param globalStats
 * @param activeLocation
 * @param ignoreSpace
 * @return {Object}
 */
export const getMathErrors = (cardStats, globalStats, activeLocation = null, ignoreSpace = false) => {
  const cardLevel = cardStats.level;
  const {
    level, funds, development, power, space,
  } = cardStats.cost;
  const errors = {
    level: false,
    funds: false,
    development: false,
    power: false,
    space: false,
    special: [],
  };

  if ((cardLevel === 1) && level > globalStats.level) errors.level = true;

  if (funds > globalStats.funds) errors.funds = true;

  if ((cardLevel === 1) && development > globalStats.development) errors.development = true;

  if (activeLocation && ((cardLevel === 1) && (power > activeLocation.values.power))) errors.power = true;

  if (activeLocation && !ignoreSpace && ((cardLevel === 1) && (space > activeLocation.values.space))) {
    errors.space = true;
  }

  // checks for duplicates in active location
  if (activeLocation && ((cardLevel === 1) && cardStats.unique)) {
    const foundElem = activeLocation.dropSlots.find(({ card }) => (
      card && (card.title === cardStats.title)
    ));

    if (foundElem) errors.special.push('You can play only one per location');
  }

  return errors;
};

const getActiveCards = (slots) => {
  let cards = [];

  slots.forEach((slot) => {
    if (slot.card) cards.push(slot.card);

    if (slot.card && slot.card.dropSlots) {
      cards = cards.concat(getActiveCards(slot.card.dropSlots));
    }
  });

  return cards;
};

export const getSlotActiveCards = (gameplay) => {
  const locationCards = getActiveCards(gameplay.locationSlots);
  const projectCards = getActiveCards(gameplay.projectSlots);

  return [...locationCards, ...projectCards];
};

const getSlotErrors = (card, slots, gameplay) => {
  let errors = [];

  slots.forEach((slot) => {
    const errorObj = slot.canDrop(gameplay, card);
    if (!errorObj.allowed) errors.push(errorObj);

    if (slot.card && slot.card.dropSlots) {
      errors = errors.concat(getSlotErrors(card, slot.card.dropSlots, gameplay));
    }
  });

  return mergeErrorMessages(...errors);
};

const getAllowedSlotsLength = (card, slots, gameplay) => {
  let allowedSlots = [];

  slots.forEach((slot) => {
    const statsObj = slot.canDrop(gameplay, card);
    if (statsObj.allowed && Object.keys(statsObj).length > 1) allowedSlots.push(statsObj);

    if (slot.card && slot.card.dropSlots) {
      allowedSlots = allowedSlots.concat(getAllowedSlotsLength(card, slot.card.dropSlots, gameplay));
    }
  });

  return allowedSlots;
};

const canPlayCardInAnySlot = (card, locations, projects, gameplay) => {
  const locAllowed = getAllowedSlotsLength(card, locations, gameplay);
  const projectAllowed = getAllowedSlotsLength(card, projects, gameplay);

  return locAllowed.length > 0 || projectAllowed.length > 0;
};


/**
 * Gets all stats why a card can't be played;
 *
 * @param {Object} card
 * @param {Array} locations
 * @param {Array} projects
 * @param {Object} gameplay
 * @return {Object}
 */
export const getCostErrors = (card, locations, projects, gameplay) => {
  const locErrors = getSlotErrors(card, locations, gameplay);
  const projectErrors = getSlotErrors(card, projects, gameplay);

  return mergeErrorMessages(locErrors, projectErrors);
};

/**
 * Returns the maximum space a specific location
 * has for a specific level
 *
 * @param {Object} card
 * @param {String} stat
 * @return {Number}
 */
export const getMaxValueForLocation = (card, stat) => {
  const metaDataId = card.metadataId;
  const { level } = card;

  let base = 0;

  for (let i = 1; i <= level; i += 1) {
    if (i === 1) base += getLevelValuesForCard(metaDataId, (i).toString()).values[stat];
    else {
      const pastLevelValue = getLevelValuesForCard(metaDataId, (i - 1).toString()).values[stat];
      const currentLevelValue = getLevelValuesForCard(metaDataId, (i).toString()).values[stat];

      base += currentLevelValue - pastLevelValue;
    }
  }
  return base;
};

export const getAvailableCards = (locations, projects, gameplay) => () => {
  const cardsToCheck = gameplay.cards.filter(card => !card.active).filter(card => !card.slotted);

  return cardsToCheck.reduce((_acc, checkCard) => {
    let acc = _acc;

    if (canPlayCardInAnySlot(checkCard, locations, projects, gameplay)) acc = [...acc, checkCard];

    return acc;
  }, []);
};

/**
 * Returns cards that can be played in the current view
 *
 * @param {Array} cards
 * @param {String} gameplayView
 * @param {String} inGameplayView
 * @param {Array} locations
 * @param {Array} projects
 * @return {Array}
 */
// export const getAvailableCards = (cards, gameplayView, inGameplayView, locations, projects) => (dispatch, getState) => {
//   const { stats, activeLocationIndex, activeContainerIndex } = getState().gameplay;
//   const globalStats = stats;
//
//   const locationSlotsLength = locations.filter(locationSlot => !locationSlot.card).length > 0;
//   const projectsSlotsLength = projects.filter(projectSlot => !projectSlot.card).length > 0;
//
//   let assetSlotsLength = false;
//
//   const locationItem = locations[activeLocationIndex].card;
//   if (locationItem) {
//     assetSlotsLength = locationItem.dropSlots.filter(slot => !slot.card).length > 0;
//   }
//
//   const containerSlotsLength = getContainerSlotsLength(locations, locationItem, activeContainerIndex);
//
//   // only show available project and location cards when there are no played locations
//   if (gameplayView === GP_NO_LOCATIONS) {
//     return cards.filter((card) => {
//       const goodCardType = card.type === 'Location' || card.type === 'Project';
//       return goodCardType && checkIfCanPlayCard(card, globalStats, null);
//     });
//   }
//
//   // when location drop slots are available only do not show miner type cards
//   if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_MAIN) {
//     return cards.filter((card) => {
//       const { metadataId } = card;
//       const miningCardType = card.type === 'Mining';
//       const isAsset = card.type !== 'Location' && card.type !== 'Project';
//       const activeLocation = isAsset ? locations[activeLocationIndex].card : null;
//       const availableSlots = checkSlotsAvailableForCardType(
//         card.type,
//         locationSlotsLength,
//         projectsSlotsLength,
//         assetSlotsLength,
//         containerSlotsLength,
//       );
//
//       if (!miningCardType) {
//         if (availableSlots) return checkIfCanPlayCard(card, globalStats, activeLocation);
//         if (!availableSlots && card.type === 'Location') return getDropSlotsAvailableLevelUp(locations, card, globalStats) !== 0; // eslint-disable-line
//         if (!availableSlots && card.type === 'Project') return getDropSlotsAvailableLevelUp(projects, card, globalStats) !== 0; // eslint-disable-line
//       }
//
//       // In active gameplay view checks if miner can be dropped in at least one location
//       let canPlayInOneContainer = false;
//
//       const droppedContainers = activeLocation.dropSlots.map(({ card }, slotIndex) => {
//         if (card && card.type === 'Container') {
//           const lastDroppedItemCopy = { ...card };
//           lastDroppedItemCopy.containerIndex = slotIndex;
//           return lastDroppedItemCopy;
//         }
//
//         return false;
//       }).filter(item => item);
//
//       droppedContainers.forEach((droppedContainerItem) => {
//         const containerId = droppedContainerItem.metadataId;
//         const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
//         const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadataId);
//         const containerSlotLength = getContainerSlotsLength(
//           locations,
//           locationItem,
//           droppedContainerItem.containerIndex,
//         );
//
//         if (goodSlotType && containerSlotLength && checkIfCanPlayCard(card, globalStats, activeLocation, true)) {
//           canPlayInOneContainer = true;
//         }
//         if (goodSlotType && !containerSlotLength) {
//           canPlayInOneContainer = getDropSlotsAvailableLevelUp(droppedContainerItem.dropSlots, card, globalStats) > 0;
//         }
//       });
//
//       return canPlayInOneContainer;
//     });
//   }
//
//   // when container drop slots are available only show miner, project & location type cards
//   if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_CONTAINER) {
//     return cards.filter((card) => {
//       const { metadataId } = card;
//       const goodCardType = card.type === 'Location' || card.type === 'Project' || card.type === 'Mining';
//       const isAsset = card.type !== 'Location' && card.type !== 'Project';
//       const activeLocation = isAsset ? locations[activeLocationIndex].card : null;
//       const availableSlots = checkSlotsAvailableForCardType(
//         card.type,
//         locationSlotsLength,
//         projectsSlotsLength,
//         assetSlotsLength,
//         containerSlotsLength,
//       );
//
//       if (!isAsset) {
//         if (!goodCardType) return false;
//
//         if (availableSlots) return checkIfCanPlayCard(card, globalStats, null);
//         if (!availableSlots && card.type === 'Location') return getDropSlotsAvailableLevelUp(locations, card, globalStats) !== 0; // eslint-disable-line
//         if (!availableSlots && card.type === 'Project') return getDropSlotsAvailableLevelUp(projects, card, globalStats) !== 0; // eslint-disable-line
//       }
//
//       // check if active container can take in that card type
//       const containerId = locations[activeLocationIndex].card.dropSlots[activeContainerIndex]
//         .card.metadataId;
//       const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
//       const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadataId);
//
//       if (!goodCardType) return false;
//       if (!goodSlotType) return false;
//       if (availableSlots) return checkIfCanPlayCard(card, globalStats, activeLocation, true);
//
//       const { dropSlots } = locations[activeLocationIndex].card.dropSlots[activeContainerIndex].card; // eslint-disable-line
//       return getDropSlotsAvailableLevelUp(dropSlots, card, globalStats) > 0;
//     });
//   }
//
//   return [];
// };

/**
 * Adds experience and calculates next levels
 *
 * @param {Number} experience
 * @return {Array}
 */
export const calculateLevelData = (experience) => {
  let earnedXp = experience;
  let currentLevel;
  let nextLevel;
  for (let i = 0; i < levels.length; i += 1) {
    if (earnedXp < levels[i].change) {
      currentLevel = levels[i - 1];
      nextLevel = levels[i];
      break;
    }
    earnedXp -= levels[i].change;
  }

  return {
    experience,
    earnedXp,
    requiredXp: nextLevel.change,
    level: currentLevel.level,
  };
};

/**
 * In the dropped location for every dropped developer
 * adds percent of their development to global development
 *
 * @param {Object} item
 * @param {Array} locations
 * @param {Number} activeLocationIndex
 * @param {Object} _globalStats
 */
export const calcLocationPerDevBonus = (item, locations, activeLocationIndex, _globalStats) => {
  const globalStats = { ..._globalStats };
  let bonus = 0;

  const playedDevCards = locations[activeLocationIndex].card.dropSlots.filter(({ card }) => (
    card && card.type === 'Person'
  )).map(dropSlot => dropSlot.card);

  // coffee miners bonus equals the percent of played dev card
  playedDevCards.forEach((card) => {
    // this is because of the hacker card
    if (!card.bonus || (card.bonus && !card.bonus.development)) return;

    bonus += ((card.bonus.development / 100) * (item.card.bonus.multiplierDev || 0));
  });

  bonus = Math.floor(bonus);
  globalStats.development = Math.floor(globalStats.development + bonus);

  return {
    globalStats,
    bonus,
  };
};

/**
 * Hides the project fpb animation
 *
 * @param {Number} projectIndex
 */
export const doNotShowProjectFpb = projectIndex => (dispatch, getState) => {
  const projects = [...getState().gameplay.projects];

  if (!projects[projectIndex].card) return;

  projects[projectIndex].card.showFpb = false;
  dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Adds new free cards to hand for new level
 *
 * @param {Number} level
 */
const addCardsForNewLevel = level => async (dispatch, getState) => {
  const { gameplay } = getState();
  const cards = [...gameplay.cards];

  const minId = cards.reduce((min, card) => { // eslint-disable-line
    return card.id < min ? card.id : min;
  }, cards[0].id);

  const newCards = cardsPerLevel[level - 1].map((metadataId, index) =>
    Card.getInstance(gameplay, minId - (index + 1), 1, metadataId));

  return Promise.all(newCards, (_newCards) => {
    console.log('_newCards', _newCards);
    dispatch({ type: ADD_NEW_LEVEL_CARDS, payload: [...cards, ...newCards] });

    return _newCards;
  });
};

/**
 * Checks if new level. If new level opens new level modal with added cards
 *
 * @param {Number} level
 */
export const checkIfNewLevel = level => async (dispatch, getState) => {
  const currLevel = getState().gameplay.stats.level;

  if (currLevel === level) return;
  if ((level - 1) <= 0) return;

  let cards = [];
  if (level <= cardsPerLevel.length) cards = await dispatch(addCardsForNewLevel(level));

  dispatch(openNewLevelModal(level, cards));
};

/**
 * Calculates how much funds should be increased by the multiplier
 *
 * @param {Number} funds
 * @param {Object} item
 * @return {Number}
 */
export const increaseFundsByMultiplier = (funds, item) =>
  Math.floor((funds * (item.mainCard.card.bonus.multiplierFunds / 100)));

/**
 * Calculates how much a single Mining Algorithm Optimization adds bonus funds
 *
 * @param {Number} miningFpb
 * @param {Number} multiplierFunds
 * @param {Number} timesFinished
 * @return {Number}
 */
export const bonusFpbMiningAlgo = (miningFpb, multiplierFunds, timesFinished) =>
  Math.floor(miningFpb * ((((100 + multiplierFunds) / 100) ** timesFinished) - 1));

/**
 * Calculates how much fpb miners generate
 *
 * @param {Array} assetCards
 * @param {Array} locations
 * @return {Number}
 */
const getMinersFpb = (assetCards, locations) => {
  const containerCards = assetCards.filter(_card => _card.type === 'Container');

  return containerCards.reduce((acc, { locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].card.dropSlots[slotIndex].card.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.card)
      .map(container => container.card);

    minerCards.forEach((minerCard) => {
      acc += minerCard.bonus.funds;
    });

    return acc;
  }, 0);
};

/**
 * Calculates how much more fpb a single Mining Algorithm Optimization add on finish
 *
 * @param locations
 * @param assetCards
 * @param item
 * @return {number}
 */
export const calcDiffFpbBonusForMiners = (locations, assetCards, item) => {
  const { multiplierFunds } = item.mainCard.bonus;
  const { timesFinished } = item;
  const miningFpb = getMinersFpb(assetCards, locations);

  const currBonus = bonusFpbMiningAlgo(miningFpb, multiplierFunds, timesFinished);
  const pastBonus = bonusFpbMiningAlgo(miningFpb, multiplierFunds, timesFinished - 1);

  return currBonus - pastBonus;
};

/**
 * Calculates how much fpb a single Mining Algorithm Optimization adds
 *
 * @param locations
 * @param assetCards
 * @param item
 * @return {number}
 */
export const calcFpbBonusForMiners = (locations, assetCards, item) => {
  const { multiplierFunds } = item.mainCard.bonus;
  const { timesFinished } = item;
  const miningFpb = getMinersFpb(assetCards, locations);

  return bonusFpbMiningAlgo(miningFpb, multiplierFunds, timesFinished);
};

/**
 * Calculates how much funds should Rent Computing Power project add
 *
 * @param locations
 * @param assetCards
 * @param item
 * @return {number}
 */
export const calcFundsForDroppedCpuAndGpu = (locations, assetCards, item) => {
  const containerCards = assetCards.filter(_card => _card.type === 'Container');

  return containerCards.reduce((acc, { locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].card.dropSlots[slotIndex].card.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.card)
      .map(container => container.card);

    const cpuCards = minerCards.filter(({ metadataId }) => metadataId === '9');
    const gpuCards = minerCards.filter(({ metadataId }) => metadataId === '10');

    acc += cpuCards.length * (item.mainCard.bonus.multiplierFunds / 3);
    acc += gpuCards.length * item.mainCard.bonus.multiplierFunds;

    return acc;
  }, 0);
};

/**
 * Updates locations and global dev if any bonus dev per location
 * needs to be added
 *
 * @param _locations
 * @param activeLocationIndex
 * @param _globalStats
 * @return {{globalStats: {}, locations: [null]}}
 */
export const handleBonusDevMechanics = (_locations, activeLocationIndex, _globalStats) => {
  let locations = [..._locations];
  let globalStats = { ..._globalStats };
  let locationSlots = [...locations[activeLocationIndex].card.dropSlots];

  const droppedBonusDevPerLocationCards = locationSlots.filter(({ card }) => card && bonusDevPerLocationCards.includes(card.metadataId)); // eslint-disable-line

  droppedBonusDevPerLocationCards.forEach(({ card }) => {
    locationSlots = [...locations[activeLocationIndex].card.dropSlots];
    const cardLocationIndex = locationSlots.findIndex(slot => slot.card && (slot.card.metadataId === card.metadataId)); // eslint-disable-line

    const coffeeMiner = locationSlots[cardLocationIndex].card;
    const coffeeMinerItem = { card: coffeeMiner };
    globalStats.development -= coffeeMiner.special;

    const cardEffect = calcLocationPerDevBonus(coffeeMinerItem, locations, activeLocationIndex, globalStats);

    ({ globalStats } = cardEffect);
    const cardSpecial = cardEffect.bonus;

    locations = updateLocationDropSlotItems(locationSlots, cardLocationIndex, coffeeMinerItem, locations, activeLocationIndex, cardSpecial); // eslint-disable-line
  });

  return { globalStats, locations };
};

/**
 * Claculates bonus funds for day trading project for every day trader
 *
 * @param {Array} assetCards
 * @return {Number}
 */
export const checkIfDayTradersDropped = assetCards =>
  assetCards.reduce((acc, card) => {
    if (card.metadataId === '41') acc += card.bonus.multiplierFunds;
    return acc;
  }, 0);

/**
 * Claculates bonus funds for day trading project for every day trader
 * @param {Array} assetCards
 * @return {Number}
 */
export const checkIfInformationDealerDropped = assetCards =>
  assetCards.reduce((acc, card) => {
    if (card.metadataId === '42') acc += card.bonus.multiplierFunds;
    return acc;
  }, 0);

/**
 * Recalculates booster projects bonus
 */
export const updateProjectModifiedFunds = () => (dispatch, getState) => {
  const { gameplay } = getState();
  const locations = [...gameplay.locations];

  let projects = [...gameplay.projects];
  let updated = false;

  projects = projects.map((_project) => {
    const project = { ..._project };
    const { card } = project;

    if (card && card.metadataId === '24') {
      updated = true;
      project.card.modifiedFundsBonus = 0;
      project.card.modifiedFundsBonus += project.bonus.funds;
      project.card.modifiedFundsBonus += checkIfDayTradersDropped(getPlayedAssetCards([...locations]));
    }

    if (card && card.metadataId === '37') {
      updated = true;
      project.card.modifiedFundsBonus = 0;
      project.card.modifiedFundsBonus += project.bonus.funds;
      project.card.modifiedFundsBonus += checkIfInformationDealerDropped(getPlayedAssetCards([...locations])); // eslint-disable-line
    }

    return project;
  });

  if (updated) dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Calculates how much more funds miners give for dropped tinkerer
 *
 * @param {Array} locations
 * @param {Number} locationIndex
 * @param {Card} card
 * @return {Number}
 */
export const calcTinkererPerLocationBonus = (locations, locationIndex, card) => {
  const locationSlots = locations[locationIndex].card.dropSlots;
  let minerFundsPerLocations = 0;

  locationSlots
    .filter(locationSlot => locationSlot.card && locationSlot.card.type === 'Container') // eslint-disable-line
    .map(locationSlot => locationSlot.card)
    // get all container cards per location
    .forEach((containerCard) => {
      locations[locationIndex].card.dropSlots[containerCard.slotIndex].card.dropSlots // eslint-disable-line
        .filter(containerSlot => containerSlot.card)
        .map(container => container.card)
        // get all miners per container per location
        .forEach((minerCard) => { minerFundsPerLocations += minerCard.bonus.funds; });
    });

  return bonusFpbMiningAlgo(minerFundsPerLocations, card.bonus.multiplierFunds, 1);
};

export const calcExpiryBlocksLeft = (card, blockNumber, projectExecutionTimePercent) =>
  Math.floor((projectExecutionTimePercent / 100) * (card.expiryTime - blockNumber));
