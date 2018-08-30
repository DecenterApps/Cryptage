import {
  REMOVE_CARD, GP_NO_LOCATIONS,
  CLEAR_REVEALED_CARDS,
  REMOVE_NEW_FROM_CARD, GP_LOCATION, GP_LOCATION_CONTAINER, GP_LOCATION_MAIN
} from './actionTypes';

/**
 * Checks if player can cancel a card;
 *
 * @param {Object} slot
 */
export const canCancelCard = slot => (dispatch, getState) => {
  const { gameplay } = getState();

  if (slot.isEmpty()) return false;

  return slot.card.canWithdraw(gameplay).allowed;
};

/**
 * Removes cards from gameplay
 *
 * @param slot
 * @param locationIndex
 * @param containerIndex
 */
export const handleCardCancel = (slot, locationIndex, containerIndex) => (dispatch, getState) => {
  const { gameplay } = getState();
  let { gameplayView, inGameplayView, activeLocationIndex } = gameplay;

  const newGameplay = slot.removeCard(gameplay);
  const slotsEmpty = newGameplay.locationSlots.every(slot => !slot.card);

  if (inGameplayView === GP_LOCATION_CONTAINER && !slot.owner) inGameplayView = GP_LOCATION_MAIN;

  if (slotsEmpty) gameplayView = GP_NO_LOCATIONS;

  if (!slotsEmpty && !slot.owner) {
    const slotWithCard = newGameplay.locationSlots.find(locationSlots => locationSlots.card);
    activeLocationIndex = slotWithCard.index;
  }

  dispatch({
    type: REMOVE_CARD,
    payload: {
      newGameplay, gameplayView, inGameplayView, activeLocationIndex,
    },
  });
};

/**
 * Clears new booster cards once the new booster cards modal is closed
 */
export const clearRevealedCards = () => (dispatch) => { dispatch({ type: CLEAR_REVEALED_CARDS }); };

/**
 * Fires when the user hovers over a card element with "new".
 *
 * @param {String} newCardMetadataId
 */
export const removeNewCardOnHover = newCardMetadataId => (dispatch, getState) => {
  const newCardsArr = [...getState().gameplay.cards]
    .map((_newCard) => {
      const newCard = _newCard;
      if (_newCard.isNew && _newCard.metadataId === newCardMetadataId) newCard.isNew = false;
      return newCard;
    });

  dispatch({ type: REMOVE_NEW_FROM_CARD, payload: newCardsArr });
};
