import { filterByKeys } from './utils';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {Number} _level
 * @return {Object}
 */
export const getLevelValuesForCard = (id, _level) => {
  // cost is literal, bonus is calculated as incremental
  const cardLevels = [
    // 0 Computer case
    [
      {
        level: 2,
        cost: { funds: 12, level: 1 },
        bonus: { space: 1 },
      },
      {
        level: 3,
        cost: { funds: 16, level: 1 },
        bonus: { space: 1 },
      },
      {
        level: 4,
        cost: { funds: 22, level: 2 },
        bonus: { space: 1 },
      },
      {
        level: 5,
        cost: { funds: 30, level: 2 },
        bonus: { space: 1 },
      },
      {
        level: 6,
        cost: { funds: 40, level: 2 },
        bonus: { space: 1 },
      },
    ],
    // 1 Rig
    [
      {
        level: 2,
        cost: { funds: 1200, level: 2 },
        bonus: { space: 4 },
      },
      {
        level: 3,
        cost: { funds: 1600, level: 2 },
        bonus: { space: 4 },
      },
      {
        level: 4,
        cost: { funds: 2200, level: 3 },
        bonus: { space: 4 },
      },
      {
        level: 5,
        cost: { funds: 3000, level: 3 },
        bonus: { space: 4 },
      },
      {
        level: 6,
        cost: { funds: 4000, level: 3 },
        bonus: { space: 4 },
      },
    ],
    // 2 Mount
    [
      {
        level: 2,
        cost: { funds: 12000, level: 3 },
        bonus: { space: 4 },
      },
      {
        level: 3,
        cost: { funds: 16000, level: 3 },
        bonus: { space: 4 },
      },
      {
        level: 4,
        cost: { funds: 22000, level: 4 },
        bonus: { space: 4 },
      },
      {
        level: 5,
        cost: { funds: 30000, level: 4 },
        bonus: { space: 4 },
      },
      {
        level: 6,
        cost: { funds: 40000, level: 4 },
        bonus: { space: 4 },
      },
    ],
    // 3 CPU
    [
      {
        level: 2,
        cost: { funds: 12, level: 1, power: 1 },
        bonus: { funds: 0.1 },
      },
      {
        level: 3,
        cost: { funds: 16, level: 1, power: 1 },
        bonus: { funds: 0.1 },
      },
      {
        level: 4,
        cost: { funds: 22, level: 1, power: 2 },
        bonus: { funds: 0.1 },
      },
      {
        level: 5,
        cost: { funds: 30, level: 2, power: 2 },
        bonus: { funds: 0.1 },
      },
      {
        level: 6,
        cost: { funds: 40, level: 2, power: 2 },
        bonus: { funds: 0.1 },
      },
    ],
    // 4 Graphics card
    [
      {
        level: 2,
        cost: { funds: 120, level: 1, power: 4 },
        bonus: { funds: 0.5 },
      },
      {
        level: 3,
        cost: { funds: 160, level: 1, power: 4 },
        bonus: { funds: 0.5 },
      },
      {
        level: 4,
        cost: { funds: 220, level: 1, power: 8 },
        bonus: { funds: 0.5 },
      },
      {
        level: 5,
        cost: { funds: 300, level: 2, power: 8 },
        bonus: { funds: 0.5 },
      },
      {
        level: 6,
        cost: { funds: 400, level: 2, power: 8 },
        bonus: { funds: 0.5 },
      },
    ],
    // 5 ASIC miner
    [
      {
        level: 2,
        cost: { funds: 12000, level: 2, power: 16 },
        bonus: { funds: 10 },
      },
      {
        level: 3,
        cost: { funds: 16000, level: 2, power: 32 },
        bonus: { funds: 10 },
      },
      {
        level: 4,
        cost: { funds: 22000, level: 2, power: 32 },
        bonus: { funds: 10 },
      },
      {
        level: 5,
        cost: { funds: 30000, level: 3, power: 48 },
        bonus: { funds: 10 },
      },
      {
        level: 6,
        cost: { funds: 40000, level: 3, power: 48 },
        bonus: { funds: 10 },
      },
    ],
    // 6 Garage
    [
      {
        level: 2,
        cost: { funds: 100, level: 1 },
        bonus: { power: 3, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 110, level: 1 },
        bonus: { power: 0, space: 5 },
      },
      {
        level: 4,
        cost: { funds: 130, level: 1 },
        bonus: { power: 3, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 160, level: 1 },
        bonus: { power: 0, space: 5 },
      },
      {
        level: 6,
        cost: { funds: 200, level: 1 },
        bonus: { power: 3, space: 0 },
      },
    ],
    // 7 Coworking space
    [
      {
        level: 2,
        cost: { funds: 520, level: 2 },
        bonus: { power: 3, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 560, level: 2 },
        bonus: { power: 0, space: 5 },
      },
      {
        level: 4,
        cost: { funds: 620, level: 2 },
        bonus: { power: 3, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 700, level: 2 },
        bonus: { power: 0, space: 5 },
      },
      {
        level: 6,
        cost: { funds: 800, level: 2 },
        bonus: { power: 3, space: 0 },
      },
    ],
    // 8 Shantytown office
    [
      {
        level: 2,
        cost: { funds: 2100, level: 4 },
        bonus: { power: 10, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 2300, level: 4 },
        bonus: { power: 0, space: 10 },
      },
      {
        level: 4,
        cost: { funds: 2600, level: 4 },
        bonus: { power: 10, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 3000, level: 4 },
        bonus: { power: 0, space: 10 },
      },
      {
        level: 6,
        cost: { funds: 3500, level: 4 },
        bonus: { power: 10, space: 0 },
      },
    ],
    // 9 Downtown office
    [
      {
        level: 2,
        cost: { funds: 12000, level: 6 },
        bonus: { power: 20, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 16000, level: 6 },
        bonus: { power: 0, space: 20 },
      },
      {
        level: 4,
        cost: { funds: 22000, level: 6 },
        bonus: { power: 20, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 30000, level: 6 },
        bonus: { power: 0, space: 20 },
      },
      {
        level: 6,
        cost: { funds: 40000, level: 6 },
        bonus: { power: 20, space: 0 },
      },
    ],
    // 10 Elite office
    [
      {
        level: 2,
        cost: { funds: 102000, level: 10 },
        bonus: { power: 40, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 106000, level: 10 },
        bonus: { power: 0, space: 10 },
      },
      {
        level: 4,
        cost: { funds: 112000, level: 10 },
        bonus: { power: 40, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 120000, level: 10 },
        bonus: { power: 0, space: 10 },
      },
      {
        level: 6,
        cost: { funds: 130000, level: 10 },
        bonus: { power: 40, space: 0 },
      },
    ],
    // 11 Office building
    [
      {
        level: 2,
        cost: { funds: 1400000, level: 20 },
        bonus: { power: 80, space: 0 },
      },
      {
        level: 3,
        cost: { funds: 2200000, level: 20 },
        bonus: { power: 0, space: 20 },
      },
      {
        level: 4,
        cost: { funds: 3400000, level: 20 },
        bonus: { power: 80, space: 0 },
      },
      {
        level: 5,
        cost: { funds: 5000000, level: 20 },
        bonus: { power: 0, space: 20 },
      },
      {
        level: 6,
        cost: { funds: 7000000, level: 20 },
        bonus: { power: 80, space: 0 },
      },
    ],
    // 12 Intern developer
    [
      {
        level: 2,
        cost: { funds: 25, level: 1 },
        bonus: { development: 1 },
      },
      {
        level: 3,
        cost: { funds: 40, level: 1 },
        bonus: { development: 1 },
      },
      {
        level: 4,
        cost: { funds: 60, level: 2 },
        bonus: { development: 1 },
      },
      {
        level: 5,
        cost: { funds: 85, level: 2 },
        bonus: { development: 1 },
      },
      {
        level: 6,
        cost: { funds: 115, level: 2 },
        bonus: { development: 1 },
      },
    ],
    // 13 Junior developer
    [
      {
        level: 2,
        cost: { funds: 200, level: 2 },
        bonus: { development: 2 },
      },
      {
        level: 3,
        cost: { funds: 500, level: 2 },
        bonus: { development: 2 },
      },
      {
        level: 4,
        cost: { funds: 900, level: 3 },
        bonus: { development: 2 },
      },
      {
        level: 5,
        cost: { funds: 1400, level: 3 },
        bonus: { development: 2 },
      },
      {
        level: 6,
        cost: { funds: 2000, level: 3 },
        bonus: { development: 2 },
      },
    ],
    // 14 Freelance expert
    [
      {
        level: 2,
        cost: { funds: 1000, level: 4 },
        bonus: { development: 4 },
      },
      {
        level: 3,
        cost: { funds: 2000, level: 5 },
        bonus: { development: 4 },
      },
      {
        level: 4,
        cost: { funds: 3500, level: 5 },
        bonus: { development: 4 },
      },
      {
        level: 5,
        cost: { funds: 1400, level: 6 },
        bonus: { development: 4 },
      },
      {
        level: 6,
        cost: { funds: 2000, level: 6 },
        bonus: { development: 4 },
      },
    ],
    // 15 Senior developer
    [
      {
        level: 2,
        cost: { funds: 5000, level: 5 },
        bonus: { development: 8 },
      },
      {
        level: 3,
        cost: { funds: 8000, level: 6 },
        bonus: { development: 8 },
      },
      {
        level: 4,
        cost: { funds: 12000, level: 6 },
        bonus: { development: 8 },
      },
      {
        level: 5,
        cost: { funds: 17000, level: 7 },
        bonus: { development: 8 },
      },
      {
        level: 6,
        cost: { funds: 23000, level: 7 },
        bonus: { development: 8 },
      },
    ],
    // 16 Tech lead
    [
      {
        level: 2,
        cost: { funds: 20000, level: 7 },
        bonus: { development: 10 },
      },
      {
        level: 3,
        cost: { funds: 35000, level: 8 },
        bonus: { development: 10 },
      },
      {
        level: 4,
        cost: { funds: 80000, level: 10 },
        bonus: { development: 10 },
      },
      {
        level: 5,
        cost: { funds: 110000, level: 11 },
        bonus: { development: 10 },
      },
      {
        level: 6,
        cost: { funds: 55000, level: 9 },
        bonus: { development: 10 },
      },
    ],
    // 17 Project architect
    [
      {
        level: 2,
        cost: { funds: 60000, level: 12 },
        bonus: { development: 12 },
      },
      {
        level: 3,
        cost: { funds: 90000, level: 14 },
        bonus: { development: 12 },
      },
      {
        level: 4,
        cost: { funds: 130000, level: 16 },
        bonus: { development: 12 },
      },
      {
        level: 5,
        cost: { funds: 180000, level: 18 },
        bonus: { development: 12 },
      },
      {
        level: 6,
        cost: { funds: 240000, level: 20 },
        bonus: { development: 12 },
      },
    ],
    // 18 Hacker
    [
      {
        level: 2,
        cost: { funds: 60000, level: 12 },
        bonus: { development: 12 },
      },
      {
        level: 3,
        cost: { funds: 90000, level: 14 },
        bonus: { development: 12 },
      },
      {
        level: 4,
        cost: { funds: 130000, level: 16 },
        bonus: { development: 12 },
      },
      {
        level: 5,
        cost: { funds: 180000, level: 18 },
        bonus: { development: 12 },
      },
      {
        level: 6,
        cost: { funds: 240000, level: 20 },
        bonus: { development: 12 },
      },
    ],
    // 19 Part-time Gig
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 20 Bigtime outsource
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 21 Optimize Mining algorithm
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 22 No name project 1
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 23 No name project 2
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 24 No name project 3
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 25 Solar panels
    [
      {
        level: 2,
        cost: { funds: 550, level: 1 },
        bonus: { power: 5 },
      },
      {
        level: 3,
        cost: { funds: 650, level: 1 },
        bonus: { power: 10 },
      },
      {
        level: 4,
        cost: { funds: 800, level: 1 },
        bonus: { power: 15 },
      },
      {
        level: 5,
        cost: { funds: 1000, level: 1 },
        bonus: { power: 20 },
      },
      {
        level: 6,
        cost: { funds: 1250, level: 1 },
        bonus: { power: 25 },
      },
    ],
    // 26 Black market batteries
    [
      {
        level: 2,
        cost: { funds: 3500, level: 1 },
        bonus: { power: 10 },
      },
      {
        level: 3,
        cost: { funds: 4500, level: 1 },
        bonus: { power: 20 },
      },
      {
        level: 4,
        cost: { funds: 6000, level: 1 },
        bonus: { power: 30 },
      },
      {
        level: 5,
        cost: { funds: 8000, level: 1 },
        bonus: { power: 40 },
      },
      {
        level: 6,
        cost: { funds: 10500, level: 1 },
        bonus: { power: 50 },
      },
    ],
    // 27 Jury-rigged generator
    [
      {
        level: 2,
        cost: { funds: 12000, level: 1 },
        bonus: { power: 50 },
      },
      {
        level: 3,
        cost: { funds: 16000, level: 1 },
        bonus: { power: 100 },
      },
      {
        level: 4,
        cost: { funds: 22000, level: 1 },
        bonus: { power: 150 },
      },
      {
        level: 5,
        cost: { funds: 30000, level: 1 },
        bonus: { power: 200 },
      },
      {
        level: 6,
        cost: { funds: 40000, level: 1 },
        bonus: { power: 250 },
      },
    ],
    // 28 GRID connector
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
    // 28 Coffe miner
    [
      {
        level: 2,
        cost: { funds: 51, level: 1 },
        bonus: { funds: 100 },
      },
      {
        level: 3,
        cost: { funds: 53, level: 1 },
        bonus: { funds: 200 },
      },
      {
        level: 4,
        cost: { funds: 56, level: 1 },
        bonus: { funds: 300 },
      },
      {
        level: 5,
        cost: { funds: 60, level: 1 },
        bonus: { funds: 400 },
      },
      {
        level: 6,
        cost: { funds: 65, level: 1 },
        bonus: { funds: 500 },
      },
    ],
  ];

  return cardLevels[id].find(({ level }) => level === _level);
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

    if (Object.keys(localCost).length && card.stats.type !== 'Mining') {
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
  if (id === 0) accepts = ['3', '4'];
  // Rig only accepts Graphics card
  if (id === 1) accepts = ['4'];
  // Mount only accepts ASIC miner
  if (id === 2) accepts = ['5'];

  for (let i = 0; i <= space; i += 1) slots.push({ accepts, lastDroppedItem: null });
  return slots;
};
