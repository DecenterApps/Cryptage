import cardsConfig from '../constants/cards.json';
import { fetchCardStats } from '../services/cardService';
import { getMaxValueForLocation } from '../services/gameMechanicsService';

/**
 * Updates locations drop slot with new level values
 *
 * @param {Array} _locations
 * @param {Number} index
 * @param {Object} lastDroppedItem
 * @param {Object} card
 * @return {Array}
 */
export const levelUpLocation = (_locations, index, lastDroppedItem, card) => {
  const locations = [..._locations];
  const { mainCard, values } = lastDroppedItem;
  const { id } = mainCard.metadata;
  const level = parseInt(mainCard.stats.level, 10);

  const newLevelCard = { ...mainCard, stats: fetchCardStats(id, level + 1) };

  locations[index].lastDroppedItem.cards.push({ ...card });

  locations[index].lastDroppedItem.values = {
    space: newLevelCard.stats.values.space - (getMaxValueForLocation(mainCard, 'space') - values.space),
    power: newLevelCard.stats.values.power - (getMaxValueForLocation(mainCard, 'power') - values.power),
  };

  locations[index].lastDroppedItem.mainCard = newLevelCard;

  if (!cardsConfig.cards[id][(level + 2).toString()]) locations[index].lastDroppedItem.accepts = [];

  return locations;
};

/**
 * Updates project drop slot with new level values
 *
 * @param {Array} _projects
 * @param {Number} index
 * @param {Object} lastDroppedItem
 * @param {Object} card
 * @return {Array}
 */
export const levelUpProject = (_projects, index, lastDroppedItem, card) => {
  const projects = [..._projects];
  const { mainCard } = lastDroppedItem;
  const { id } = mainCard.metadata;
  const level = parseInt(mainCard.stats.level, 10);

  const newLevelCard = { ...mainCard, stats: fetchCardStats(id, level + 1) };

  projects[index].lastDroppedItem.cards.push({ ...card });
  projects[index].lastDroppedItem.mainCard = newLevelCard;

  if (!cardsConfig.cards[id][(level + 2).toString()]) projects[index].lastDroppedItem.accepts = [];

  return projects;
};

/**
 * Updates locations drop slot item with new level values
 *
 * @param {Array} _locations
 * @param {Number} activeLocationIndex
 * @param {Number} index
 * @param {Object} card
 * @return {Array}
 */
export const levelUpAsset = (_locations, activeLocationIndex, index, card) => {
  const locations = [..._locations];
  const { lastDroppedItem } = locations[activeLocationIndex].lastDroppedItem.dropSlots[index];
  const { mainCard } = lastDroppedItem;
  const { id } = mainCard.metadata;
  const level = parseInt(mainCard.stats.level, 10);

  const newLevelCard = { ...mainCard, stats: fetchCardStats(id, level + 1) };

  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards.push({ ...card });
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.mainCard = newLevelCard;

  if (!cardsConfig.cards[id][(level + 2).toString()]) {
    locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.accepts = [];
  }

  return locations;
};

/**
 * Updates container drop slot with new level values
 *
 * @param {Array} _locations
 * @param {Number} locationIndex
 * @param {Number} containerIndex
 * @param {Number} cardIndex
 * @param {Object} card
 * @return {[null]}
 */
export const levelUpMiner = (_locations, locationIndex, containerIndex, cardIndex, card) => {
  const locations = [..._locations];
  const { lastDroppedItem } = locations[locationIndex].lastDroppedItem.dropSlots[containerIndex]
    .lastDroppedItem.dropSlots[cardIndex];

  const { mainCard } = lastDroppedItem;
  const { id } = mainCard.metadata;
  const level = parseInt(mainCard.stats.level, 10);

  const newLevelCard = { ...mainCard, stats: fetchCardStats(id, level + 1) };

  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .lastDroppedItem.cards.push({ ...card });
  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .lastDroppedItem.mainCard = newLevelCard;

  if (!cardsConfig.cards[id][(level + 2).toString()]) {
    locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
      .lastDroppedItem.accepts = [];
  }

  return locations;
};
