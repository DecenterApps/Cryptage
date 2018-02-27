import { CHANGE_GAMEPLAY_VIEW, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR } from './actionTypes';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 *
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch) => { dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload }); };

export const usersCardsRequest = () => ({
  type: USERS_CARDS_FETCH,
});

export const usersCardsSuccess = cards => ({
  type: USERS_CARDS_SUCCESS,
  cards,
});

export const usersCardsError = error => ({
  type: USERS_CARDS_ERROR,
  error,
});

export const usersCardsFetch = () => async (dispatch) => {
  dispatch(usersCardsRequest());
  try {
    const cardsIDs = await ethService.getUsersCards();
    const cards = await cardService.fetchCardsMeta(cardsIDs);
    dispatch(usersCardsSuccess(cards));
  } catch (err) {
    dispatch(usersCardsError(err));
  }
};
