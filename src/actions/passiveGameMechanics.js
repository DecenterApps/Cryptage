import { UPDATE_LOCATION_VALUES } from '../actions/actionTypes';
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
  // TODO - consult Milos as to wheater the increment is increased by level or by card that is in the slot
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

/**
 * Updates gameplay stats for each played asset card that has
 * that defined
 *
 * @param cards
 */
export const handlePlayedAssetCardsPassive = cards => () => {
  // console.log('Played asset cards passive', cards);
};
