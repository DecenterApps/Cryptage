/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {Number} levelIndex
 * @return {Object}
 */
export const getLevelValuesForCard = (id, levelIndex) => {
  const cardLevels = [
    // 0 Garage
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 1 Coworking Space
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 2 Shantytown Office
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 3 Downtown Office
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 4 Elite Office
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 5 Office Building
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 6 Intern Developer
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 7 Junior Developer
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 8 Freelance Expert
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 9 Senior Developer
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 10 Tech Lead
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 11 Project Architect
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 12 Computer Case
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 13 CPU Miner
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 14 Graphics card
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 15 Mining rig
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 16 ASIC Miner
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 17 Mining farm
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 18 Quantum miner
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 19 Part-time Gig
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 20 Bigtime Outsource
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 21 Optimize Mining Algorithm
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 22 Solar Panels
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 23 GRID Connector
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 24 Undefined name
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 25 Coffee Miner
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 26 Coolant System
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 27 CryptoCat :3
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
    // 28 Lambo
    [{ "space": 1, "prestige": 1, "power": 1 }, { "space": 2, "prestige": 2, "power": 2 }, { "space": 3, "prestige": 3, "power": 3 }],
  ];

  return cardLevels[id][levelIndex];
};
