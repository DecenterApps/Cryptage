import levels from '../constants/levels.json';
import { filterByKeys } from './utils';
import {
  CHANGE_PROJECT_STATE,
  GP_BUY_BOOSTER,
  GP_LOCATION,
  GP_LOCATION_CONTAINER,
  GP_LOCATION_MAIN,
  GP_NO_LOCATIONS,
} from '../actions/actionTypes';

/**
 * Returns initial values for stack of cards
 * @param {Number} id
 * @param {Number} _level
 * @return {Object}
 */
export const getLevelValuesForCard = (id, _level) => {
  // cost is literal, bonus is calculated as incremental
  const cardLevels = [
    // 0 Garage
    [
      {
        level: 1,
        cost: { level: 1, funds: 100 },
        values: { space: 40, power: 4 },
      },
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
    // 1 Coworking space
    [
      {
        level: 1,
        cost: { funds: 500, level: 1 },
        values: { space: 60, power: 0 },
      },
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
    // 2 Shaggy office
    [
      {
        level: 1,
        cost: { funds: 2000, level: 1 },
        values: { space: 80, power: 24 },
      },
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
    // 3 Downtown office
    [
      {
        level: 1,
        cost: { funds: 10000, level: 1 },
        values: { space: 120, power: 48 },
      },
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
    // 4 Smart office
    [
      {
        level: 1,
        cost: { funds: 200000, level: 1 },
        values: { space: 160, power: 96 },
      },
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
    // 5 Office building
    [
      {
        level: 1,
        cost: { funds: 1000000, level: 1 },
        values: { space: 200, power: 192 },
      },
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
    // 6 Computer case
    [
      {
        level: 1,
        cost: { funds: 10, level: 1, space: 5 },
        bonus: { space: 2 },
      },
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
    // 7 Mining rig
    [
      {
        level: 1,
        cost: { funds: 1200, level: 1, space: 15 },
        bonus: { space: 4 },
      },
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
    // 8 ASIC Mount
    [
      {
        level: 1,
        cost: { funds: 4800, level: 1, space: 25 },
        bonus: { space: 6 },
      },
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
    // 9 CPU
    [
      {
        level: 1,
        cost: { funds: 40, level: 1, space: 1, power: 1 },
        bonus: { funds: 1 },
      },
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
    // 10 GPU
    [
      {
        level: 1,
        cost: { funds: 120, level: 1, space: 1, power: 4 }, // eslint-disable-line
        bonus: { funds: 5 },
      },
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
    // 11 ASIC miner
    [
      {
        level: 1,
        cost: { funds: 6000, level: 1, space: 1, power: 16 }, // eslint-disable-line
        bonus: { funds: 20 },
      },
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
    // 12 Intern programmer
    [
      {
        level: 1,
        cost: { funds: 15, level: 1, space: 10 },
        bonus: { development: 1 },
      },
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
        level: 1,
        cost: { funds: 100, level: 1, space: 10 },
        bonus: { development: 4 },
      },
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
    // 14 Freelance Consultant
    [
      {
        level: 1,
        cost: { funds: 500, level: 1, space: 20 },
        bonus: { development: 10 },
      },
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
        level: 1,
        cost: { funds: 3000, level: 1, space: 20 },
        bonus: { development: 22 },
      },
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
    // 16 Technical Team Leader
    [
      {
        level: 1,
        cost: { funds: 10000, level: 1, space: 40 },
        bonus: { development: 46 },
      },
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
        level: 1,
        cost: { funds: 40000, level: 1, space: 40 },
        bonus: { development: 76 },
      },
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
    // 18 Black Hat Hacker
    [
      {
        level: 1,
        cost: { level: 1, funds: 1000, space: 20 },
        bonus: { development: 4, funds: 10 },
      },
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

    // 19 Solar panels
    [
      {
        level: 1,
        cost: { funds: 500, level: 1, space: 15 },
        bonus: { power: 24 },
      },
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
    // 20 Black market batteries
    [
      {
        level: 1,
        cost: { funds: 3000, level: 1, space: 30 },
        bonus: { power: 48 },
      },
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
    // 21 DIY Power Generator
    [
      {
        level: 1,
        cost: { funds: 10000, level: 1, space: 60 },
        bonus: { power: 192 },
      },
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
    // 22 GRID connector
    [
      {
        level: 1,
        cost: { funds: 1000, level: 1, space: 10 },
        bonus: { 'multiplier-funds': 1, funds: 1 },
      },
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
    // 23 Coffee Machine Miner
    [
      {
        level: 1,
        cost: { funds: 1000, level: 1, space: 10 },
        bonus: { funds: 10, 'multiplier-dev': '10%', development: 10 },
      },
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
    // 24 Outsourced Project
    [
      {
        level: 1,
        cost: { development: 1, level: 1, time: 50 },
        bonus: { xp: 4, funds: 50 },
      },
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
    // 25 Profitable Đapp
    [
      {
        level: 1,
        cost: { development: 8, time: 150, funds: 50, level: 2 },
        bonus: { xp: 32, funds: 100 },
      },
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
    // 26 Mining Algorithm Optimization
    [
      {
        level: 1,
        cost: { development: 32, time: 420, level: 4, funds: 1000 },
        bonus: { xp: 512, funds: 4000 },
      },
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
    // 27 Initial Coin Offering"
    [
      {
        level: 1,
        cost: { development: 56, time: 2520, level: 8, funds: 5000 },
        bonus: { xp: 4096, funds: 20000 },
      },
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
    // 28 Decentralized Protocol Development
    [
      {
        level: 1,
        cost: { development: 120, funds: 20000, level: 12, time: 10080 },
        bonus: { xp: 32796, funds: 100000 },
      },
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
    // 29 Consensus Improvement
    [
      {
        level: 1,
        cost: { development: 240, funds: 100000, level: 16, time: 20160 },
        bonus: { xp: 262144, funds: 500000 },
      },
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

  if (locationItem) {
    const containerItem = locationItem.dropSlots[activeContainerIndex].lastDroppedItem;

    if (containerItem && containerItem.dropSlots) {
      length = containerItem.dropSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null).length > 0;
    }
  }

  return length;
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
