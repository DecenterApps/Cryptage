import {
  UPDATE_GLOBAL_VALUES,
  CHANGE_PROJECT_STATE,
  ADD_EXPERIENCE,
  UPDATE_FUNDS_PER_BLOCK,
} from '../actions/actionTypes';
import { getPlayedAssetCards, saveGameplayState } from '../services/utils';
import {
  calculateLevelData,
  doNotShowProjectFpb,
  checkIfNewLevel,
  increaseFundsByMultiplier,
  calcDiffFpbBonusForMiners,
  bonusFpbMiningAlgo,
  calcFundsForDroppedCpuAndGpu,
  checkIfDayTradersDropped,
  checkIfInformationDealerDropped,
} from '../services/gameMechanicsService';
import { addOrReduceFromFundsPerBlock } from './gameplayActions';

/**
 * Updates global funds based on played mining rig card power in the gameplay state
 *
 * @param _cards
 */
const addFundsForDroppedMiningRigs = _cards => (dispatch, getState) => {
  const { gameplay } = getState();
  const locations = [...gameplay.locations];
  const globalStats = { ...gameplay.globalStats };
  let miningFunds = 0;

  const containerCards = _cards.filter(_card => _card.stats.type === 'Container');

  containerCards.forEach(({ locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].lastDroppedItem.dropSlots[slotIndex].lastDroppedItem.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.lastDroppedItem)
      .map(container => container.lastDroppedItem.mainCard);

    minerCards.forEach((minerCard) => {
      miningFunds += minerCard.stats.bonus.funds;
      globalStats.funds += minerCard.stats.bonus.funds;
    });
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return miningFunds;
};

/**
 * Checks if any gridConnector cards were played and gives funds based
 * on the available power in that location
 *
 * @param _cards
 */
const addFundsForDroppedGridConnectors = _cards => (dispatch, getState) => {
  const { gameplay } = getState();
  const locations = [...gameplay.locations];
  const globalStats = { ...gameplay.globalStats };
  let gridConnectorsFunds = 0;

  const connectorCards = _cards.filter(_card => _card.metadata.id === '22');

  connectorCards.forEach(({ locationIndex, slotIndex }) => {
    const cardLocation = locations[locationIndex].lastDroppedItem;
    const { power } = cardLocation.values;
    const { funds } = cardLocation.dropSlots[slotIndex].lastDroppedItem.mainCard.stats.bonus;
    const total = (power * funds);

    gridConnectorsFunds += total;
    globalStats.funds += total;
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return gridConnectorsFunds;
};

/**
 * Adds funds for every dropped hacker per block
 *
 * @param _cards
 */
const addFundsForDroppedHacker = _cards => (dispatch, getState) => {
  const globalStats = { ...getState().gameplay.globalStats };
  let hackersFunds = 0;

  const hackerCards = _cards.filter(_card => _card.metadata.id === '18');

  hackerCards.forEach(({ stats }) => {
    hackersFunds += stats.bonus.funds;
    globalStats.funds += stats.bonus.funds;
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return hackersFunds;
};

/**
 * Adds funds for every dropped coffee miner per block
 *
 * @param _cards
 */
const addFundsForDroppedCoffeeMiners = _cards => (dispatch, getState) => {
  const globalStats = { ...getState().gameplay.globalStats };
  let coffeeFunds = 0;

  const coffeeCards = _cards.filter(_card => _card.metadata.id === '23');

  coffeeCards.forEach(({ stats }) => {
    coffeeFunds += stats.bonus.multiplierFunds;
    globalStats.funds += stats.bonus.multiplierFunds;
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return coffeeFunds;
};

/**
 * Adds funds for every dropped profitable dapp project
 */
const addFundsForDroppedDappProject = () => (dispatch, getState) => {
  const { gameplay } = getState();
  const { projects } = gameplay;
  const globalStats = { ...gameplay.globalStats };
  let dappProjectFunds = 0;

  const dappProjects = projects.filter((({ lastDroppedItem }) =>
    lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '26'));

  dappProjects.forEach(({ lastDroppedItem }) => {
    const { timesFinished, mainCard } = lastDroppedItem;
    const toAdd = (timesFinished * mainCard.stats.bonus.multiplierFunds);

    dappProjectFunds += toAdd;
    globalStats.funds += toAdd;
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return dappProjectFunds;
};

/**
 * Adds bonus funds based on miners dropped for dropped mining optimization projects
 */
export const addBonusMiningFunds = (_cards, miningFpb) => (dispatch, getState) => {
  const { gameplay } = getState();
  const { projects } = gameplay;
  const globalStats = { ...gameplay.globalStats };

  const validMiningOptimizationProjects = projects.filter((({ lastDroppedItem }) => {
    if (!lastDroppedItem) return false;

    const rightType = lastDroppedItem.mainCard.metadata.id === '27';
    const finishedMoreThanOnce = lastDroppedItem.timesFinished > 0;

    return rightType && finishedMoreThanOnce;
  }));

  const validMiningOptimizationProjectsFunds = validMiningOptimizationProjects.reduce((acc, { lastDroppedItem }) => {
    const { multiplierFunds } = lastDroppedItem.mainCard.stats.bonus;
    const { timesFinished } = lastDroppedItem;
    acc += bonusFpbMiningAlgo(miningFpb, multiplierFunds, timesFinished);

    return acc;
  }, 0);

  globalStats.funds += validMiningOptimizationProjectsFunds;

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return validMiningOptimizationProjectsFunds;
};

/**
 * Updates gameplay stats for each played asset card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedAssetCardsPassive = cards => (dispatch, getState) => {
  console.log('All played asset cards', cards);

  const miningFunds = dispatch(addFundsForDroppedMiningRigs(cards));
  const bonusMiningFunds = dispatch(addBonusMiningFunds(cards, miningFunds));
  const gridConnectorsFunds = dispatch(addFundsForDroppedGridConnectors(cards));
  const hackersFunds = dispatch(addFundsForDroppedHacker(cards));
  const coffeeMinerFunds = dispatch(addFundsForDroppedCoffeeMiners(cards));
  const profitableDappFunds = dispatch(addFundsForDroppedDappProject());

  const total = miningFunds + bonusMiningFunds + gridConnectorsFunds + hackersFunds + coffeeMinerFunds
    + profitableDappFunds;

  if (total !== getState().gameplay.fundsPerBlock) dispatch({ type: UPDATE_FUNDS_PER_BLOCK, payload: total });

  saveGameplayState(getState);
};

/**
 * Checks to see if any projects have been finished
 */
export const checkProjectsExpiry = () => (dispatch, getState) => {
  const { blockNumber } = getState().app;
  const { projects } = getState().gameplay;
  const { locations } = getState().gameplay;
  const { projectExecutionTimePercent } = getState().gameplay;
  let { fundsPerBlock } = getState().gameplay;
  const {
    experience, development, funds, level,
  } = getState().gameplay.globalStats;
  let _projects = [...projects];
  let acquiredXp = 0;
  let releasedDev = 0;
  let receivedFunds = 0;
  let saveProjects = false;

  for (let i = 0; i < _projects.length; i += 1) {
    if (_projects[i].lastDroppedItem != null && _projects[i].lastDroppedItem.expiryTime != null) {

      const modifiedExpiryTime = Math.floor((projectExecutionTimePercent / 100) * (_projects[i].lastDroppedItem.expiryTime - blockNumber)); // eslint-disable-line

      if (modifiedExpiryTime <= 0) {
        const item = _projects[i].lastDroppedItem;
        const card = item.mainCard;

        _projects[i].lastDroppedItem.expiryTime = null;
        _projects[i].lastDroppedItem.isActive = false;
        _projects[i].lastDroppedItem.isFinished = true;
        _projects[i].lastDroppedItem.showFpb = true;
        _projects[i].lastDroppedItem.timesFinished += 1;
        _projects[i].lastDroppedItem.modifiedFundsBonus = 0;
        acquiredXp += card.stats.bonus.xp;
        releasedDev += card.stats.cost.development;
        receivedFunds += card.stats.bonus.funds;

        if (card.metadata.id === '26') fundsPerBlock = addOrReduceFromFundsPerBlock(fundsPerBlock, card, true);
        if (card.metadata.id === '30') {
          const modifiedFundsBonus = increaseFundsByMultiplier(receivedFunds + funds, item);
          _projects[i].lastDroppedItem.modifiedFundsBonus = modifiedFundsBonus + receivedFunds;
          receivedFunds += modifiedFundsBonus;
        }
        if (card.metadata.id === '27') {
          const fpbDiff = calcDiffFpbBonusForMiners(locations, getPlayedAssetCards([...locations]), item);
          _projects[i].lastDroppedItem.modifiedFundsBonus = fpbDiff;
          fundsPerBlock = addOrReduceFromFundsPerBlock(fundsPerBlock, item, true, fpbDiff);
        }
        if (card.metadata.id === '29') {
          const assetCards = getPlayedAssetCards([...locations]);
          const fundsForDroppedCpuAndGpu = calcFundsForDroppedCpuAndGpu(locations, assetCards, item);

          _projects[i].lastDroppedItem.modifiedFundsBonus = fundsForDroppedCpuAndGpu;
          receivedFunds += fundsForDroppedCpuAndGpu;
          saveProjects = true;
        }
        if (card.metadata.id === '24') {
          receivedFunds += checkIfDayTradersDropped(getPlayedAssetCards([...locations]));
          _projects[i].lastDroppedItem.modifiedFundsBonus = receivedFunds;
        }
        if (card.metadata.id === '37') {
          receivedFunds += checkIfInformationDealerDropped(getPlayedAssetCards([...locations]));
          _projects[i].lastDroppedItem.modifiedFundsBonus = receivedFunds;
        }

        setTimeout(() => {
          dispatch(doNotShowProjectFpb(i));
        }, 3500);
      }
    }
  }

  if (acquiredXp > 0 || receivedFunds > 0 || releasedDev > 0 || saveProjects) {
    dispatch({ type: CHANGE_PROJECT_STATE, projects: _projects });
    dispatch({ type: UPDATE_FUNDS_PER_BLOCK, payload: fundsPerBlock });

    dispatch({
      type: ADD_EXPERIENCE,
      experience: experience + acquiredXp,
      levelData: calculateLevelData(experience + acquiredXp),
    });
    dispatch({
      type: UPDATE_GLOBAL_VALUES,
      payload: {
        ...getState().gameplay.globalStats,
        development: development + releasedDev,
        funds: funds + receivedFunds,
      },
    });
    dispatch(checkIfNewLevel(level));
    saveGameplayState(getState);
  }

  return receivedFunds;
};
