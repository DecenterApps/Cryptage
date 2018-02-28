import update from 'immutability-helper';
import { ADD_ACTIVE_LOC, GP_LOCATION, SET_ACTIVE_LOCATION, EMPTY_DROP_SLOTS, DROP_ASSET } from './actionTypes';
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
  card.dropSlots = EMPTY_DROP_SLOTS;

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

/**
 * Fires when the player drags a card from his hand
 * to a empty location asset deck slot
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleAssetDrop = (index, item) => (dispatch, getState) => {
  const { location, app } = getState();
  const { activeLocationIndex } = location;

  const cards = [...app.cards];
  const locations = [...location.locations];

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  const activeLocation = update(locations[activeLocationIndex], {
    dropSlots: { [index]: { lastDroppedItem: { $set: item } } },
  });

  const locationPayload = update(location, {
    locations: { [activeLocationIndex]: { $set: activeLocation } },
  });

  dispatch({ type: DROP_ASSET, locations: locationPayload.locations, cards });
};
