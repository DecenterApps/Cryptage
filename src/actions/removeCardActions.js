import {
  CHANGE_PROJECT_STATE,
  UPDATE_GLOBAL_VALUES,
  REMOVE_CARD, GP_NO_LOCATIONS,
  acceptedLocationDropIds,
  acceptedAssetDropIds,
  acceptedProjectDropIds,
  RETURN_CARD,
  UPDATE_LOCATIONS,
  CLEAR_REVEALED_CARDS,
} from './actionTypes';
import { addOrReduceFromFundsPerBlock, playTurn } from './gameplayActions';
import { updateLocationDropSlotItems } from '../services/utils';
import { handleCoffeeMinerEffect } from '../services/gameMechanicsService';

/**
 * Checks if player can cancel a card;
 *
 * @param slot
 * @param locationIndex
 */
export const canCancelCard = (slot, locationIndex) => (dispatch, getState) => {
  const { gameplay } = getState();
  const item = { ...slot.lastDroppedItem };
  const returnedCards = [];
  let currentItem;
  let totalDev = 0;

  if (item.dropSlots) {
    for (let i = 0; i < item.dropSlots.length; i += 1) {
      currentItem = item.dropSlots[i].lastDroppedItem;

      if (currentItem !== null && currentItem.dropSlots === null) {
        if (currentItem.cards[0].stats.type === 'Development') {
          totalDev += currentItem.cards[0].stats.bonus.development;
        }
        if (currentItem.cards[0].metadata.id === '23') {
          totalDev += currentItem.special;
        }
        returnedCards.push(currentItem.cards[0]);
      }

      if (currentItem !== null && (currentItem.dropSlots !== null && currentItem.dropSlots !== undefined)) {
        const canCancelSlotItem = canCancelCard(item.dropSlots[i], locationIndex);
        if (!canCancelSlotItem) return false;
      }
    }
  } else {
    if (item.cards[0].metadata.id === '23') {
      totalDev += item.special;
    }
    if (item.cards[0].stats.type === 'Development') {
      totalDev += item.cards[0].stats.bonus.development;
    }
  }

  return gameplay.globalStats.development >= totalDev;
};

/**
 * Removes cards from gameplay
 *
 * @param slot
 * @param locationIndex
 * @param containerIndex
 * @param containerSlotIndex
 */
export const handleCardCancel = (slot, locationIndex, containerIndex, containerSlotIndex) => (dispatch, getState) => {
  const { gameplay } = getState();
  const _locations = [...gameplay.locations];
  let { gameplayView } = gameplay;
  const item = { ...slot.lastDroppedItem };
  const returnedCards = [];
  let currentItem;
  let totalDev = 0;
  let totalPower = 0;
  if (item.dropSlots) {
    for (let i = 0; i < item.dropSlots.length; i += 1) {
      currentItem = item.dropSlots[i].lastDroppedItem;

      if (currentItem !== null && currentItem.dropSlots === null) {
        if (currentItem.cards[0].stats.type === 'Development') {
          totalDev += currentItem.cards[0].stats.bonus.development;
        }
        if (currentItem.cards[0].metadata.id === '23') {
          totalDev += currentItem.special;
        }
        returnedCards.push(currentItem.cards[0]);
      }
      if (currentItem !== null && (currentItem.dropSlots !== null && currentItem.dropSlots !== undefined)) {
        dispatch(handleCardCancel(item.dropSlots[i], locationIndex, i));
      }

      if (currentItem !== null && currentItem.dropSlots === undefined) {
        if (currentItem.cards[0].stats.type === 'Mining') {
          totalPower -= currentItem.cards[0].stats.cost.power;
        }
        returnedCards.push(currentItem.cards[0]);
      }
    }
  } else {
    if (item.cards[0].metadata.id === '23') {
      totalDev += item.special;
    }
    if (item.cards[0].stats.type === 'Development') {
      totalDev += item.cards[0].stats.bonus.development;
    }
  }

  if (totalDev > gameplay.globalStats.development) {
    return null;
  }

  if (locationIndex !== undefined && containerIndex !== undefined && containerSlotIndex !== undefined) {
    const { power } = item.cards[0].stats.cost;
    let accepts = [];
    const id = parseInt(_locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem.cards[0].metadata.id, 10);
    returnedCards.push(item.cards[0]);
    // Computer Case only accepts CPU and Graphics card
    if (id === 6) accepts = ['9', '10'];
    // Mining Rig only accepts Graphics card
    if (id === 7) accepts = ['10'];
    // ASIC Mount only accepts ASIC miner
    if (id === 8) accepts = ['11'];
    _locations[locationIndex].lastDroppedItem.values.power += power;
    _locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem
      .dropSlots[containerSlotIndex].accepts = accepts;
    _locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem
      .dropSlots[containerSlotIndex].lastDroppedItem = null;
  } else if (locationIndex !== undefined && containerIndex !== undefined && containerSlotIndex === undefined) {
    let power = totalPower;
    const { space } = item.cards[0].stats.cost;
    if (item.cards[0].stats.bonus) power = item.cards[0].stats.bonus.power || 0;
    returnedCards.push(_locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.cards[0]);
    _locations[locationIndex].lastDroppedItem.values.space += space;
    // HANDLE ERROR HERE
    if (_locations[locationIndex].lastDroppedItem.values.power - power < 0) return;
    _locations[locationIndex].lastDroppedItem.values.power -= power;
    _locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].accepts = acceptedAssetDropIds;
    _locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem = null;
  } else if (locationIndex !== undefined && containerIndex === undefined) {
    returnedCards.push(_locations[locationIndex].lastDroppedItem.cards[0]);
    _locations[locationIndex].accepts = acceptedLocationDropIds;
    _locations[locationIndex].lastDroppedItem = null;
  }
  if (locationIndex === gameplay.activeLocationIndex && containerIndex === undefined) {
    gameplayView = GP_NO_LOCATIONS;
  }

  const fundsPerBlock = addOrReduceFromFundsPerBlock(getState().gameplay.fundsPerBlock, item.cards[0], false);

  const turnIndex = [locationIndex, containerIndex, containerSlotIndex].filter(item => item !== undefined).pop();
  dispatch(playTurn(item, slot.slotType, turnIndex, false));

  /* DO NOT REMOVE getState() */
  dispatch({
    type: REMOVE_CARD,
    locations: _locations,
    cards: [...getState().gameplay.cards, ...returnedCards],
    globalStats: {
      ...getState().gameplay.globalStats,
      development: getState().gameplay.globalStats.development - totalDev,
    },
    fundsPerBlock,
    gameplayView,
  });

  if (item.cards[0].stats.type === 'Development') {
    // TODO export this to separate function
    const gameplay = { ...getState().gameplay };
    let locations = [...gameplay.locations];
    let globalStats = { ...gameplay.globalStats };

    // check if coffee miner was dropped and recalculate
    let locationSlots = [...locations[locationIndex].lastDroppedItem.dropSlots];

    const coffeeMinerIndex = locationSlots.findIndex(({ lastDroppedItem }) =>
      lastDroppedItem && lastDroppedItem.cards[0].metadata.id === '23');

    if (coffeeMinerIndex !== -1) {
      locationSlots = [..._locations[locationIndex].lastDroppedItem.dropSlots];

      const coffeeMiner = locationSlots[coffeeMinerIndex].lastDroppedItem;
      const coffeeMinerItem = { card: coffeeMiner.cards[0] };
      globalStats.development -= coffeeMiner.special;

      const minerEffect = handleCoffeeMinerEffect(coffeeMinerItem, locations, locationIndex, globalStats);

      ({ globalStats } = minerEffect);
      const coffeeSpecial = minerEffect.bonus;

      dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });

      locations = updateLocationDropSlotItems(locationSlots, coffeeMinerIndex, coffeeMinerItem, locations, locationIndex, coffeeSpecial); // eslint-disable-line
      dispatch({ type: UPDATE_LOCATIONS, payload: locations });
    }
  }
};

/**
 * Removes a project at an index
 *
 * @param {Object} card
 * @param {Number} index
 * @return {Function}
 */
export const removeProject = (card, index) => (dispatch, getState) => {
  const { projects } = getState().gameplay;
  const alteredProjects = [...projects];

  alteredProjects[index].accepts = acceptedProjectDropIds;
  alteredProjects[index].lastDroppedItem = null;

  dispatch({
    type: CHANGE_PROJECT_STATE,
    projects: alteredProjects,
  });
  dispatch({
    type: RETURN_CARD,
    card,
  });
};

/**
 * Clears new booster cards once the new booster cards modal is closed
 */
export const clearRevealedCards = () => (dispatch) => {
  dispatch({ type: CLEAR_REVEALED_CARDS });
};
