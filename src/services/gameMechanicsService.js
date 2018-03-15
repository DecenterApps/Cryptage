import { filterByKeys } from './utils';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {Number} levelIndex
 * @return {Object}
 */
export const getLevelValuesForCard = (id, levelIndex) => {
  const cardLevels = [
    // 0 Garage
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 1 Coworking Space
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 2 Shantytown Office
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 3 Downtown Office
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 4 Elite Office
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 5 Office Building
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 6 Intern Developer
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 7 Junior Developer
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 8 Freelance Expert
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 9 Senior Developer
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 10 Tech Lead
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 11 Project Architect
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 12 Computer Case
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 13 CPU Miner
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 14 Graphics card
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 15 Mining rig
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 16 ASIC Miner
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 17 Mining farm
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 18 Quantum miner
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 19 Part-time Gig
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 20 Bigtime Outsource
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 21 Optimize Mining Algorithm
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 22 Solar Panels
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 23 GRID Connector
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 24 Undefined name
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 25 Coffee Miner
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 26 Coolant System
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 27 CryptoCat :3
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
    // 28 Lambo
    [{ space: 1, prestige: 1, power: 1 }, { space: 2, prestige: 2, power: 2 }, { space: 3, prestige: 3, power: 3 }],
  ];

  return cardLevels[id][levelIndex];
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
      Object.keys(globalCost).forEach((statKey) => { globalStats[statKey] -= globalCost[statKey]; });
    }

    if (Object.keys(localCost).length) {
      Object.keys(localCost).forEach((statKey) => {
        locations[activeLocationIndex].lastDroppedItem.values[statKey] -= localCost[statKey];
      });
    }
  }

  if (bonus) {
    const globalBonus = filterByKeys(bonus, global);
    const localBonus = filterByKeys(bonus, local);

    if (Object.keys(globalBonus).length && card.stats.type !== 'Mining') {
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
 * Checks if the cards the user wants to play can be played
 *
 * @param {Object} cardStats
 * @param {Object} globalStats
 * @param {Object} activeLocation
 * @return {Boolean}
 */
export const checkIfCanPlayCard = (cardStats, globalStats, activeLocation = null) => {
  const {
    level, funds, development, power, space,
  } = cardStats.cost;

  if (level > globalStats.level) {
    alert('Player level not high enough to play card!');
    return false;
  }
  if (funds > globalStats.funds) {
    alert('You do not have enough funds to play card!');
    return false;
  }
  if (development > globalStats.development) {
    alert('You do not have enough development points to play this card!');
    return false;
  }

  if (activeLocation && (power > activeLocation.values.power)) {
    alert('The desired location does not have enough power for you to play this card!');
    return false;
  }

  if (activeLocation && (space > activeLocation.values.space)) {
    alert('The desired location does not have enough space for you to play this card!');
    return false;
  }

  return true;
};
