import {
  CHANGE_GAMEPLAY_VIEW, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR, GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
} from './actionTypes';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';
import { nameOfNetwork } from '../services/utils';
import config from '../constants/config.json';

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

/**
 * Gets user ethereum account from MetaMask
 *
 * @return {Function}
 */
export const checkAccount = () => async (dispatch, getState) => {
  try {
    const network = await ethService.getNetwork();
    if (config.network !== network) {
      throw new Error(`Wrong network - please set Metamask to ${nameOfNetwork(config.network)}`);
    }

    const account = await ethService.getAccount();
    if (getState().app.account !== account) {
      if (getState().app.account === '') {
        const balance = await ethService.getBalance(account);
        dispatch({ type: GET_ACCOUNT_SUCCESS, account, balance, });
      } else {
        window.location.reload();
      }
    }
  } catch (err) {
    if (getState().app.accountError !== err.message) {
      dispatch({ type: GET_ACCOUNT_ERROR, error: err.message });
    }
  }

  setTimeout(() => checkAccount()(dispatch, getState), 1000);
};
