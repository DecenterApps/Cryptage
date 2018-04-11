import {
  UPDATE_GLOBAL_VALUES,
  CHANGE_PROJECT_STATE,
  ADD_EXPERIENCE,
  UPDATE_FUNDS_PER_BLOCK,
} from '../actions/actionTypes';
import { saveGameplayState } from '../services/utils';
import {
  getLevelValuesForCard,
  calculateLevelData,
  doNotShowProjectFpb,
  checkIfNewLevel,
} from '../services/gameMechanicsService';

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

  // add 1 funds for each card in container asset drop slot
  containerCards.forEach(({ locationIndex, slotIndex }) => {
    const containerSlots = locations[locationIndex].lastDroppedItem.dropSlots[slotIndex].lastDroppedItem.dropSlots;
    const minerCards = containerSlots
      .filter(containerSlot => containerSlot.lastDroppedItem)
      .map(container => container.lastDroppedItem.cards[0]);

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
    const { funds } = cardLocation.dropSlots[slotIndex].lastDroppedItem.cards[0].stats.bonus;
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
    coffeeFunds += stats.bonus.funds;
    globalStats.funds += stats.bonus.funds;
  });

  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  return coffeeFunds;
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
  const gridConnectorsFunds = dispatch(addFundsForDroppedGridConnectors(cards));
  const hackersFunds = dispatch(addFundsForDroppedHacker(cards));
  const coffeeMinerFunds = dispatch(addFundsForDroppedCoffeeMiners(cards));

  const total = miningFunds + gridConnectorsFunds + hackersFunds + coffeeMinerFunds;

  if (total !== getState().gameplay.fundsPerBlock) dispatch({ type: UPDATE_FUNDS_PER_BLOCK, payload: total });

  saveGameplayState(getState);
};

/**
 * Checks to see if any projects have been finished
 */
export const checkProjectsExpiry = () => (dispatch, getState) => {
  const { blockNumber } = getState().app;
  const { projects } = getState().gameplay;
  const {
    experience, development, funds, level,
  } = getState().gameplay.globalStats;
  const _projects = [...projects];
  let acquiredXp = 0;
  let releasedDev = 0;
  let receivedFunds = 0;

  for (let i = 0; i < _projects.length; i += 1) {
    if (_projects[i].lastDroppedItem != null && _projects[i].lastDroppedItem.expiryTime != null) {
      if (_projects[i].lastDroppedItem.expiryTime - blockNumber <= 0) {
        _projects[i].lastDroppedItem.expiryTime = null;
        _projects[i].lastDroppedItem.isActive = false;
        _projects[i].lastDroppedItem.isFinished = true;
        _projects[i].lastDroppedItem.showFpb = true;
        acquiredXp += _projects[i].lastDroppedItem.cards[0].stats.bonus.xp;
        releasedDev += _projects[i].lastDroppedItem.level > 1 ? getLevelValuesForCard(
          parseInt(_projects[i].lastDroppedItem.cards[0].metadata.id, 10),
          _projects[i].lastDroppedItem.level,
        ) : _projects[i].lastDroppedItem.cards[0].stats.cost.development;
        receivedFunds += _projects[i].lastDroppedItem.cards[0].stats.bonus.funds;

        setTimeout(() => {
          dispatch(doNotShowProjectFpb(i));
        }, 2000);
      }
    }
  }

  if (acquiredXp > 0) {
    dispatch({
      type: CHANGE_PROJECT_STATE,
      projects: _projects,
    });
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
