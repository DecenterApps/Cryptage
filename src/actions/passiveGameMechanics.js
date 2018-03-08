import { UPDATE_LOCATION_VALUES, UPDATE_GLOBAL_VALUES } from '../actions/actionTypes';
import { saveGameplayState } from '../services/utils';

/**
 * Updates played location cards power value in the gameplay state
 *
 * @param cards
 */
const addPowerForEachPlayedLocation = cards => (dispatch, getState) => {
  const { gameplay } = getState();
  const locations = [...gameplay.locations];

  // add 1 power for each location card in location slot
  // TODO - increment by card type and slot level
  cards.forEach((_card) => {
    locations[_card.index].lastDroppedItem.values.power += 1;
  });

  dispatch({ type: UPDATE_LOCATION_VALUES, payload: locations });
  saveGameplayState(getState);
};

/**
 * Updates gameplay stats for each played location card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedLocationCardsPassive = cards => (dispatched) => {
  dispatched(addPowerForEachPlayedLocation(cards));
};

// ////////////////// ASSETS //////////////////////// //

/**
 * Updates golbal funds based on played mining rig card power in the gameplay state
 *
 * @param _cards
 */
const addFundsForDroppedMiningRigs = _cards => (dispatch, getState) => {
  const { gameplay } = getState();
  const locations = [...gameplay.locations];
  const globalStats = { ...gameplay.globalStats };

  const miningCards = _cards.filter(_card => _card.stats.type === 'Mining');

  // add 1 funds for each card in location drop slot
  // reduce location power by 1 for each card in location drop slot
  // TODO - increment by card type and slot level
  miningCards.forEach(({ locationIndex }) => {
    if (locations[locationIndex].lastDroppedItem.values.power > 0) {
      globalStats.funds += 1;
      locations[locationIndex].lastDroppedItem.values.power -= 1;
    }
  });

  dispatch({ type: UPDATE_LOCATION_VALUES, payload: locations });
  dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  saveGameplayState(getState);
};

/**
 * Updates gameplay stats for each played asset card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedAssetCardsPassive = cards => (dispatch) => {
  console.log('Played asset cards passive', cards);
  dispatch(addFundsForDroppedMiningRigs(cards));
};
