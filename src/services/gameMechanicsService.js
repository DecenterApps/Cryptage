import levels from '../constants/levels.json';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import cardsConfig from '../constants/cards.json';
import { filterByKeys } from './utils';
import { openNewLevelModal } from '../actions/modalActions';
import {
  CHANGE_PROJECT_STATE,
  GP_BUY_BOOSTER,
  GP_LOCATION,
  GP_LOCATION_CONTAINER,
  GP_LOCATION_MAIN,
  GP_NO_LOCATIONS,
  ADD_NEW_LEVEL_CARDS,
} from '../actions/actionTypes';
import { fetchCardStats } from './cardService';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {Number} _level
 * @return {Object}
 */
export const getLevelValuesForCard = (id, _level = null) => cardsConfig.cards[id];

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

  const { cost, bonus } = card.stats;

  const global = ['funds', 'development'];
  const local = ['power', 'space'];

  if (cost) {
    const globalCost = filterByKeys(cost, global);
    const localCost = filterByKeys(cost, local);

    if (Object.keys(globalCost).length) {
      Object.keys(globalCost).forEach((statKey) => { globalStats[statKey] -= globalCost[statKey]; });
    }

    if (Object.keys(localCost).length) {
      Object.keys(localCost).forEach((statKey) => {
        if (card.stats.type === 'Mining' && statKey === 'space') return;

        locations[activeLocationIndex].lastDroppedItem.values[statKey] -= localCost[statKey];
      });
    }
  }

  if (bonus) {
    const globalBonus = filterByKeys(bonus, global);
    const localBonus = filterByKeys(bonus, local);

    // Special cards have unique mechanism for bonus
    if (Object.keys(globalBonus).length && !card.stats.special) {
      Object.keys(globalBonus).forEach((statKey) => { globalStats[statKey] += globalBonus[statKey]; });
    }

    if (Object.keys(localBonus).length) {
      Object.keys(localBonus).forEach((statKey) => {
        locations[activeLocationIndex].lastDroppedItem.values[statKey] += localBonus[statKey];
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

  // Computer Case only accepts CPU and Graphics card
  if (id === 6) accepts = ['9', '10'];
  // Mining Rig only accepts Graphics card
  if (id === 7) accepts = ['10'];
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
 * Checks if the cards the user wants to play can be played
 *
 * @param {Object} cardStats
 * @param {Object} globalStats
 * @param {Object} activeLocation
 * @param {Object} ignoreSpace - this is only for mining cards
 * @return {Boolean}
 */
export const checkIfCanPlayCard = (cardStats, globalStats, activeLocation = null, ignoreSpace = false) => {
  const {
    level, funds, development, power, space,
  } = cardStats.cost;

  if (level > globalStats.level) return false;

  if (funds > globalStats.funds) return false;

  if (development > globalStats.development) return false;

  if (activeLocation && (power > activeLocation.values.power)) return false;

  if (activeLocation && !ignoreSpace && (space > activeLocation.values.space)) return false;

  // checks for duplicates in active location
  if (activeLocation && cardStats.unique) {
    const foundElem = activeLocation.dropSlots.find(({ lastDroppedItem }) => (
      lastDroppedItem && (lastDroppedItem.cards[0].stats.title === cardStats.title)
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
    const containerItem = locationItem.dropSlots[activeContainerIndex].lastDroppedItem;

    if (containerItem && containerItem.dropSlots) {
      length = containerItem.dropSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;
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
const getMathErrors = (cardStats, globalStats, activeLocation = null, ignoreSpace = false) => {
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

  if (level > globalStats.level) errors.level = true;

  if (funds > globalStats.funds) errors.funds = true;

  if (development > globalStats.development) errors.development = true;

  if (activeLocation && (power > activeLocation.values.power)) errors.power = true;

  if (activeLocation && !ignoreSpace && (space > activeLocation.values.space)) errors.space = true;

  // checks for duplicates in active location
  if (activeLocation && cardStats.unique) {
    const foundElem = activeLocation.dropSlots.find(({ lastDroppedItem }) => (
      lastDroppedItem && (lastDroppedItem.cards[0].stats.title === cardStats.title)
    ));

    if (foundElem) errors.special.push('You can play only one per location');
  }

  return errors;
};

/**
 * Gets all stats why a card can't be played;
 *
 * @param {Object} card
 * @param {Number} activeLocationIndex
 * @param {Number} activeContainerIndex
 * @param {Array} locations
 * @param {Array} projects
 * @param {String} gameplayView
 * @param {String} inGameplayView
 * @param {Object} globalStats
 * @param {Object} _activeLocation
 * @param {Object} ignoreSpace - this is only for mining cards
 * @return {Object}
 */
export const getCostErrors = (card, activeLocationIndex, activeContainerIndex, locations, projects, gameplayView, inGameplayView, globalStats, _activeLocation = null, ignoreSpace = false) => { // eslint-disable-line
  let errors = { special: [] };
  const { metadata, stats } = card;
  let activeLocation = _activeLocation ? { ..._activeLocation } : null;

  const locationSlotsLength = locations.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;
  const projectsSlotsLength = projects.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;

  let assetSlotsLength = false;

  const locationItem = locations[activeLocationIndex].lastDroppedItem;
  if (locationItem) assetSlotsLength = locationItem.dropSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0; // eslint-disable-line

  const containerSlotsLength = getContainerSlotsLength(locations, locationItem, activeContainerIndex);

  // ////////////////////////////////////////////////////////////////////////
  if (gameplayView === GP_NO_LOCATIONS || gameplayView === GP_BUY_BOOSTER) {
    const goodCardType = stats.type === 'Location' || stats.type === 'Project';
    const availableSlots = checkSlotsAvailableForCardType(stats.type, locationSlotsLength, projectsSlotsLength, assetSlotsLength, containerSlotsLength); // eslint-disable-line

    if (!goodCardType) errors.special.push('You can\'t play this card here');
    if (goodCardType && !availableSlots) errors.special.push('No available slots');
  }

  // ////////////////////////////////////////////////////////////////////////
  if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_MAIN) {
    const miningCardType = stats.type === 'Mining';
    const isAsset = stats.type !== 'Location' && stats.type !== 'Project';
    activeLocation = isAsset ? locations[activeLocationIndex].lastDroppedItem : null;
    const availableSlots = checkSlotsAvailableForCardType(stats.type, locationSlotsLength, projectsSlotsLength, assetSlotsLength, containerSlotsLength);  // eslint-disable-line

    if (!miningCardType && !availableSlots) errors.special.push('No available slots');

    if (miningCardType) {
      // In active gameplay view checks if miner can be dropped in at least one location
      let canPlayInOneContainer = false;

      const droppedContainers = activeLocation.dropSlots.map(({ lastDroppedItem }, slotIndex) => {
        if (lastDroppedItem && lastDroppedItem.cards[0].stats.type === 'Container') {
          const lastDroppedItemCopy = { ...lastDroppedItem };
          lastDroppedItemCopy.containerIndex = slotIndex;
          return lastDroppedItemCopy;
        }

        return false;
      }).filter(item => item);

      droppedContainers.forEach((droppedContainerItem) => {
        const containerId = droppedContainerItem.cards[0].metadata.id;
        const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
        const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadata.id);
        const containerSlotLength = getContainerSlotsLength(
          locations,
          locationItem,
          droppedContainerItem.containerIndex,
        );

        if (goodSlotType && containerSlotLength && checkIfCanPlayCard(stats, globalStats, activeLocation, true)) {
          canPlayInOneContainer = true;
        }
      });

      if (!canPlayInOneContainer) errors.special.push('No available containers');
    }
  }

  // ////////////////////////////////////////////////////////////////////////
  if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_CONTAINER) {
    const goodCardType = stats.type === 'Location' || stats.type === 'Project' || stats.type === 'Mining';
    const isAsset = stats.type !== 'Location' && stats.type !== 'Project';
    activeLocation = isAsset ? locations[activeLocationIndex].lastDroppedItem : null;
    const availableSlots = checkSlotsAvailableForCardType(stats.type, locationSlotsLength, projectsSlotsLength, assetSlotsLength, containerSlotsLength); // eslint-disable-line

    if (isAsset) {
      // check if active container can take in that card type
      const containerId = locations[activeLocationIndex].lastDroppedItem.dropSlots[activeContainerIndex]
        .lastDroppedItem.cards[0].metadata.id;
      const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
      const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadata.id);

      if (!goodCardType) errors.special.push('You can\'t play this card here');
      if (goodCardType && !goodSlotType) errors.special.push('Can\'t play this miner in this container');
      if (goodCardType && goodSlotType && !availableSlots) errors.special.push('No available slots in this container');
    } else {
      if (!goodCardType) errors.special.push('You can\'t play this card here');
      if (goodCardType && !availableSlots) errors.special.push('No available slots');
    }
  }

  const mathErrors = getMathErrors(stats, globalStats, activeLocation, ignoreSpace);
  errors = { ...errors, ...mathErrors, special: [...errors.special, ...mathErrors.special] };

  if (errors.special.length > 0) errors.special = errors.special.join('. ');

  return errors;
};

/**
 * Returns the maximum space a specific location
 * has for a specific level
 *
 * @param {Number} type
 * @param {Number} level
 * @param {String} stat
 * @return {Number}
 */
export const getMaxValueForLocation = (type, level, stat) => {
  let base = getLevelValuesForCard(type, 1).values[stat];

  if (level === 1) return base;

  for (let i = 2; i <= level; i += 1) base += getLevelValuesForCard(type, i).bonus[stat];
  return base;
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
export const getAvailableCards = (cards, gameplayView, inGameplayView, locations, projects) => (dispatch, getState) => {
  const { globalStats, activeLocationIndex, activeContainerIndex } = getState().gameplay;

  const locationSlotsLength = locations.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;
  const projectsSlotsLength = projects.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;

  let assetSlotsLength = false;

  const locationItem = locations[activeLocationIndex].lastDroppedItem;
  if (locationItem) {
    assetSlotsLength = locationItem.dropSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;
  }

  const containerSlotsLength = getContainerSlotsLength(locations, locationItem, activeContainerIndex);

  // only show available project and location cards when there are no played locations
  if (gameplayView === GP_NO_LOCATIONS || gameplayView === GP_BUY_BOOSTER) {
    return cards.filter(({ stats }) => {
      const goodCardType = stats.type === 'Location' || stats.type === 'Project';
      const availableSlots = checkSlotsAvailableForCardType(
        stats.type,
        locationSlotsLength,
        projectsSlotsLength,
        assetSlotsLength,
        containerSlotsLength,
      );

      return goodCardType && availableSlots && checkIfCanPlayCard(stats, globalStats, null);
    });
  }

  // when location drop slots are available only do not show miner type cards
  if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_MAIN) {
    return cards.filter(({ stats, metadata }) => {
      const miningCardType = stats.type === 'Mining';
      const isAsset = stats.type !== 'Location' && stats.type !== 'Project';
      const activeLocation = isAsset ? locations[activeLocationIndex].lastDroppedItem : null;
      const availableSlots = checkSlotsAvailableForCardType(
        stats.type,
        locationSlotsLength,
        projectsSlotsLength,
        assetSlotsLength,
        containerSlotsLength,
      );

      if (!miningCardType) return availableSlots && checkIfCanPlayCard(stats, globalStats, activeLocation);

      // In active gameplay view checks if miner can be dropped in at least one location
      let canPlayInOneContainer = false;

      const droppedContainers = activeLocation.dropSlots.map(({ lastDroppedItem }, slotIndex) => {
        if (lastDroppedItem && lastDroppedItem.cards[0].stats.type === 'Container') {
          const lastDroppedItemCopy = { ...lastDroppedItem };
          lastDroppedItemCopy.containerIndex = slotIndex;
          return lastDroppedItemCopy;
        }

        return false;
      }).filter(item => item);

      droppedContainers.forEach((droppedContainerItem) => {
        const containerId = droppedContainerItem.cards[0].metadata.id;
        const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
        const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadata.id);
        const containerSlotLength = getContainerSlotsLength(
          locations,
          locationItem,
          droppedContainerItem.containerIndex,
        );

        if (goodSlotType && containerSlotLength && checkIfCanPlayCard(stats, globalStats, activeLocation, true)) {
          canPlayInOneContainer = true;
        }
      });

      return canPlayInOneContainer;
    });
  }

  // when container drop slots are available only show miner, project & location type cards
  if (gameplayView === GP_LOCATION && inGameplayView === GP_LOCATION_CONTAINER) {
    return cards.filter(({ stats, metadata }) => {
      const goodCardType = stats.type === 'Location' || stats.type === 'Project' || stats.type === 'Mining';
      const isAsset = stats.type !== 'Location' && stats.type !== 'Project';
      const activeLocation = isAsset ? locations[activeLocationIndex].lastDroppedItem : null;
      const availableSlots = checkSlotsAvailableForCardType(
        stats.type,
        locationSlotsLength,
        projectsSlotsLength,
        assetSlotsLength,
        containerSlotsLength,
      );

      if (!isAsset) return goodCardType && availableSlots && checkIfCanPlayCard(stats, globalStats, null);

      // check if active container can take in that card type
      const containerId = locations[activeLocationIndex].lastDroppedItem.dropSlots[activeContainerIndex]
        .lastDroppedItem.cards[0].metadata.id;
      const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
      const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadata.id);

      return goodCardType && goodSlotType && availableSlots
        && checkIfCanPlayCard(stats, globalStats, activeLocation, true);
    });
  }

  return [];
};

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
    requiredXp: nextLevel.change,
    level: currentLevel.level,
    earnedXp,
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
export const handleCoffeeMinerEffect = (item, locations, activeLocationIndex, _globalStats) => {
  const globalStats = { ..._globalStats };
  let bonus = 0;

  const playedDevCards = locations[activeLocationIndex].lastDroppedItem.dropSlots.filter(({ lastDroppedItem }) => (
    lastDroppedItem && lastDroppedItem.cards[0].stats.type === 'Development'
  )).map(dropSlot => dropSlot.lastDroppedItem.cards[0]);

  // coffee miners bonus equals the percent of played dev card
  playedDevCards.forEach(({ stats }) => {
    // this is because of the hacker card
    if (!stats.bonus || (stats.bonus && !stats.bonus.development)) return;

    bonus += ((stats.bonus.development / 100) * (item.card.stats.bonus.development || 0));
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

  projects[projectIndex].lastDroppedItem.showFpb = false;
  dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Adds new free cards to hand for new level
 *
 * @param {Number} level
 */
const addCardsForNewLevel = level => async (dispatch, getState) => {
  let cards = [...getState().gameplay.cards];
  let allCards = [...getState().gameplay.allCards];

  const minId = allCards.reduce((min, card) => { // eslint-disable-line
    return card.id < min ? card.id : min;
  }, allCards[0].id);

  const newCards = cardsPerLevel[level - 1].map((metadataId, index) => ({
    id: minId - (index + 1),
    stats: fetchCardStats(metadataId),
    metadata: { id: metadataId.toString() },
  }));

  let newCardTypes = newCards
    .filter(newCard => allCards.findIndex(card => card.metadata.id === newCard.metadata.id) === -1)
    .map(({ metadata }) => metadata.id);

  newCardTypes = newCardTypes.filter((type, index) => newCardTypes.indexOf(type) === index);

  cards = [...cards, ...newCards];
  allCards = [...allCards, ...newCards];

  dispatch({ type: ADD_NEW_LEVEL_CARDS, payload: { newCardTypes, cards, allCards } });

  return newCards;
};

/**
 * Checks if new level. If new level opens new level modal with added cards
 *
 * @param {Number} currLevel
 */
export const checkIfNewLevel = currLevel => async (dispatch, getState) => {
  const { level } = getState().gameplay.globalStats;

  if (currLevel === level) return;
  if ((level - 1) < 0) return;

  const cards = await dispatch(addCardsForNewLevel(level));

  dispatch(openNewLevelModal(level, cards));
};
