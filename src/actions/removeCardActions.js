import {
  REMOVE_CARD, GP_NO_LOCATIONS,
  CLEAR_REVEALED_CARDS,
  REMOVE_NEW_FROM_CARD,
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
  let { gameplayView } = gameplay;

  const newGameplay = slot.removeCard(gameplay);

  if (locationIndex === gameplay.activeLocationIndex && containerIndex === undefined) {
    gameplayView = GP_NO_LOCATIONS;
  }

  dispatch({ type: REMOVE_CARD, payload: { newGameplay, gameplayView } });
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
