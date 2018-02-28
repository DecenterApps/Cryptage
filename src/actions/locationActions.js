import { ADD_ACTIVE_LOC, GP_LOCATION, SET_ACTIVE_LOCATION } from './actionTypes';
import { changeGameplayView } from './appActions';

/**
 * Removes location clicked card from player cards
 * and adds it to active locations sidebar
 *
 * @param {Number} cardIndex
 * @param {Array} _cards
 * @return {Function}
 */
export const addLocation = (cardIndex, _cards) => (dispatch, getState) => {
  if (getState().location.locations.length === 6) {
    alert('You can only have 6 active locations');
    return;
  }

  const cards = [..._cards];
  const card = cards[cardIndex];
  cards.splice(cardIndex, 1);

  dispatch({ type: ADD_ACTIVE_LOC, card, cards });
  dispatch(changeGameplayView(GP_LOCATION));
};

/**
 * Fires when a user click on a active location
 *
 * @param {Number} payload - activeLocationIndex
 * @return {Function}
 */
export const setActiveLocation = payload => (dispatch) => { dispatch({ type: SET_ACTIVE_LOCATION, payload }); };
