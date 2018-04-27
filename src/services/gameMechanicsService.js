import levels from '../constants/levels.json';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import cardsConfig from '../constants/cards.json';
import { filterByKeys, getPlayedAssetCards, updateLocationDropSlotItems } from './utils';
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
  const metaDataId = card.metadata.id;
  const { level } = card.stats;

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

  const { cost, bonus } = card.stats;

  const global = ['funds', 'development'];
  const local = ['power', 'space'];

  if (cost) {
    const globalCost = filterByKeys(cost, global);
    const localCost = filterByKeys(cost, local);

    if (Object.keys(globalCost).length) {
      Object.keys(globalCost).forEach((statKey) => {
        if (card.stats.level > 1 && statKey === 'development') return;
        globalStats[statKey] -= globalCost[statKey];
      });
    }

    if (Object.keys(localCost).length) {
      Object.keys(localCost).forEach((statKey) => {
        if (card.stats.level > 1) return;
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
      Object.keys(globalBonus).forEach((statKey) => {
        if (statKey === 'development') globalStats[statKey] += getLevelCardBonusStatDiff(card, statKey);
        else globalStats[statKey] += globalBonus[statKey];
      });
    }

    if (Object.keys(localBonus).length) {
      Object.keys(localBonus).forEach((statKey) => {
        locations[activeLocationIndex].lastDroppedItem.values[statKey] += getLevelCardBonusStatDiff(card, statKey);
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
  cardsConfig.cards[card.metadata.id][card.stats.level + 1] &&
  (globalStats.funds >= cardsConfig.cards[card.metadata.id][card.stats.level + 1].cost.funds);

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
  const cardLevel = cardStats.level;
  const {
    level, funds, development, power, space,
  } = cardStats.cost;

  if ((cardLevel === 1) && level > globalStats.level) return false;

  if (funds > globalStats.funds) return false;

  if ((cardLevel === 1) && development > globalStats.development) return false;

  if (activeLocation && ((cardLevel === 1) && (power > activeLocation.values.power))) return false;

  if (activeLocation && !ignoreSpace && ((cardLevel === 1) && (space > activeLocation.values.space))) return false;

  // checks for duplicates in active location
  if (activeLocation && ((cardLevel === 1) && cardStats.unique)) {
    const foundElem = activeLocation.dropSlots.find(({ lastDroppedItem }) => (
      lastDroppedItem && (lastDroppedItem.mainCard.stats.title === cardStats.title)
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
    const foundElem = activeLocation.dropSlots.find(({ lastDroppedItem }) => (
      lastDroppedItem && (lastDroppedItem.mainCard.stats.title === cardStats.title)
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
        if (lastDroppedItem && lastDroppedItem.mainCard.stats.type === 'Container') {
          const lastDroppedItemCopy = { ...lastDroppedItem };
          lastDroppedItemCopy.containerIndex = slotIndex;
          return lastDroppedItemCopy;
        }

        return false;
      }).filter(item => item);

      droppedContainers.forEach((droppedContainerItem) => {
        const containerId = droppedContainerItem.mainCard.metadata.id;
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
        .lastDroppedItem.mainCard.metadata.id;
      const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
      const goodSlotType = emptyContainerSlotArr[0].accepts.includes(metadata.id);

      if (!goodCardType) errors.special.push('You can\'t play this card here');
      if (goodCardType && !goodSlotType) errors.special.push('Can\'t play this miner in this container');
      if (goodCardType && goodSlotType && !availableSlots) {
        let numLevelUp = 0;

        locations[activeLocationIndex].lastDroppedItem.dropSlots[activeContainerIndex]
          .lastDroppedItem.dropSlots.forEach((containerDropSlot) => {
            const { mainCard } = containerDropSlot.lastDroppedItem;
            const draggingDuplicate = card.metadata.id === mainCard.metadata.id;
            if (draggingDuplicate && checkIfCanLevelUp(mainCard, globalStats)) numLevelUp += 1;
          });

        if (numLevelUp === 0) errors.special.push('No available slots in this container');
      }
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
 * @param {Object} card
 * @param {String} stat
 * @return {Number}
 */
export const getMaxValueForLocation = (card, stat) => {
  const metaDataId = card.metadata.id;
  const { level } = card.stats;

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
        if (lastDroppedItem && lastDroppedItem.mainCard.stats.type === 'Container') {
          const lastDroppedItemCopy = { ...lastDroppedItem };
          lastDroppedItemCopy.containerIndex = slotIndex;
          return lastDroppedItemCopy;
        }

        return false;
      }).filter(item => item);

      droppedContainers.forEach((droppedContainerItem) => {
        const containerId = droppedContainerItem.mainCard.metadata.id;
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
        .lastDroppedItem.mainCard.metadata.id;
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
export const calcLocationPerDevBonus = (item, locations, activeLocationIndex, _globalStats) => {
  const globalStats = { ..._globalStats };
  let bonus = 0;

  const playedDevCards = locations[activeLocationIndex].lastDroppedItem.dropSlots.filter(({ lastDroppedItem }) => (
    lastDroppedItem && lastDroppedItem.mainCard.stats.type === 'Person'
  )).map(dropSlot => dropSlot.lastDroppedItem.mainCard);

  // coffee miners bonus equals the percent of played dev card
  playedDevCards.forEach(({ stats }) => {
    // this is because of the hacker card
    if (!stats.bonus || (stats.bonus && !stats.bonus.development)) return;

    bonus += ((stats.bonus.development / 100) * (item.card.stats.bonus.multiplierDev || 0));
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

  if (!projects[projectIndex].lastDroppedItem) return;

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
    stats: fetchCardStats(metadataId, 1),
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
  if ((level - 1) <= 0) return;
  let cards = [];
  if (level <= cardsPerLevel.length) cards = await dispatch(addCardsForNewLevel(level));

  dispatch(openNewLevelModal(level, cards));
};

/**
 * Decreases time execution for all project
 *
 * @param {Array} _projects
 * @param {Object} item
 * @param {Number} blockNumber
 *
 * @return {Array}
 */
export const decreaseExecutionTimeForAllProjects = (_projects, item, blockNumber) => {
  const projects = [..._projects];

  return projects.map((_project) => {
    const project = { ..._project };

    if (project.lastDroppedItem && project.lastDroppedItem.isActive) {
      const { expiryTime, timeDecrease } = _project.lastDroppedItem;
      const { multiplierTime } = item.mainCard.stats.bonus;
      const timeLeft = expiryTime - timeDecrease - blockNumber;

      project.lastDroppedItem.timeDecrease += Math.ceil((timeLeft * ((multiplierTime) / 100)));
    }

    return project;
  });
};

/**
 * Calculates how much funds should be increased by the multiplier
 *
 * @param {Number} funds
 * @param {Object} item
 * @return {Number}
 */
export const increaseFundsByMultiplier = (funds, item) =>
  Math.floor((funds * (item.mainCard.stats.bonus.multiplierFunds / 100)));

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
  const containerCards = assetCards.filter(_card => _card.stats.type === 'Container');

  return containerCards.reduce((acc, { locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].lastDroppedItem.dropSlots[slotIndex].lastDroppedItem.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.lastDroppedItem)
      .map(container => container.lastDroppedItem.mainCard);

    minerCards.forEach((minerCard) => {
      acc += minerCard.stats.bonus.funds;
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
  const { multiplierFunds } = item.mainCard.stats.bonus;
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
  const { multiplierFunds } = item.mainCard.stats.bonus;
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
  const containerCards = assetCards.filter(_card => _card.stats.type === 'Container');

  return containerCards.reduce((acc, { locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].lastDroppedItem.dropSlots[slotIndex].lastDroppedItem.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.lastDroppedItem)
      .map(container => container.lastDroppedItem.mainCard);

    const cpuCards = minerCards.filter(({ metadata }) => metadata.id === '9');
    const gpuCards = minerCards.filter(({ metadata }) => metadata.id === '10');

    acc += cpuCards.length * (item.mainCard.stats.bonus.multiplierFunds / 3);
    acc += gpuCards.length * item.mainCard.stats.bonus.multiplierFunds;

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
  let locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];

  const droppedBonusDevPerLocationCards = locationSlots.filter(({ lastDroppedItem }) => lastDroppedItem && bonusDevPerLocationCards.includes(lastDroppedItem.mainCard.metadata.id)); // eslint-disable-line

  droppedBonusDevPerLocationCards.forEach(({ lastDroppedItem }) => {
    locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];
    const cardLocationIndex = locationSlots.findIndex(slot => slot.lastDroppedItem && (slot.lastDroppedItem.mainCard.metadata.id === lastDroppedItem.mainCard.metadata.id)); // eslint-disable-line

    const coffeeMiner = locationSlots[cardLocationIndex].lastDroppedItem;
    const coffeeMinerItem = { card: coffeeMiner.mainCard };
    globalStats.development -= coffeeMiner.special;

    const cardEffect = calcLocationPerDevBonus(coffeeMinerItem, locations, activeLocationIndex, globalStats);

    ({ globalStats } = cardEffect);
    const cardSpecial = cardEffect.bonus;

    locations = updateLocationDropSlotItems(locationSlots, cardLocationIndex, coffeeMinerItem, locations, activeLocationIndex, cardSpecial); // eslint-disable-line
  });

  return { globalStats, locations };
};

/**
 * Reduces running projects execution time when dropped
 * @param item
 */
export const assetReduceTimeForProjects = item => (dispatch, getState) => {
  const { gameplay } = getState();
  const { blockNumber } = gameplay;
  let projects = [...gameplay.projects];

  projects = decreaseExecutionTimeForAllProjects(projects, { cards: [item.card] }, blockNumber);

  dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Claculates bonus funds for day trading project for every day trader
 *
 * @param {Array} assetCards
 * @return {Number}
 */
export const checkIfDayTradersDropped = assetCards =>
  assetCards.reduce((acc, card) => {
    if (card.metadata.id === '41') acc += card.stats.bonus.multiplierFunds;
    return acc;
  }, 0);

/**
 * Claculates bonus funds for day trading project for every day trader
 * @param {Array} assetCards
 * @return {Number}
 */
export const checkIfInformationDealerDropped = assetCards =>
  assetCards.reduce((acc, card) => {
    if (card.metadata.id === '42') acc += card.stats.bonus.multiplierFunds;
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
    const { lastDroppedItem } = project;

    if (lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '24') {
      updated = true;
      project.lastDroppedItem.modifiedFundsBonus = 0;
      project.lastDroppedItem.modifiedFundsBonus += project.lastDroppedItem.mainCard.stats.bonus.funds;
      project.lastDroppedItem.modifiedFundsBonus += checkIfDayTradersDropped(getPlayedAssetCards([...locations]));
    }

    if (lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '37') {
      updated = true;
      project.lastDroppedItem.modifiedFundsBonus = 0;
      project.lastDroppedItem.modifiedFundsBonus += project.lastDroppedItem.mainCard.stats.bonus.funds;
      project.lastDroppedItem.modifiedFundsBonus += checkIfInformationDealerDropped(getPlayedAssetCards([...locations])); // eslint-disable-line
    }

    return project;
  });

  if (updated) dispatch({ type: CHANGE_PROJECT_STATE, projects });
};
