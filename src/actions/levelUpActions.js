import cardsConfig from '../constants/cards.json';
import { fetchCardStats } from '../services/cardService';
import { getMaxValueForLocation } from '../services/gameMechanicsService';

/**
 * Updates locations drop slot with new level new values
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
