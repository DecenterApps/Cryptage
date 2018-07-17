import levels from '../constants/levels.json';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import cardsConfig from '../constants/cards.json';
import { mergeErrorMessages } from './utils';
import { openNewLevelModal } from '../actions/modalActions';
import { ADD_NEW_LEVEL_CARDS } from '../actions/actionTypes';
import Card from '../classes/Card';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {String} level
 * @return {Object}
 */
export const getLevelValuesForCard = (id, level = '1') => cardsConfig.cards[id][level];

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
    newCards.forEach((_newCard) => {
      const newCard = _newCard;
      const foundCard = cards.find(card => card.metadataId === newCard.metadataId);
      if (!foundCard) newCard.isNew = true;
    });

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

export const calcExpiryBlocksLeft = (card, blockNumber, projectExecutionTimePercent) =>
  Math.floor((projectExecutionTimePercent / 100) * (card.expiryTime - blockNumber));
