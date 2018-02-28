import {
  CHANGE_GAMEPLAY_VIEW, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR, GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR
} from './actionTypes';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';
import { nameOfNetwork, saveGameplayState } from '../services/utils';
import config from '../constants/config.json';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 *
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch, getState) => {
  dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload });
  saveGameplayState(getState);
};

export const usersCardsFetch = () => async (dispatch, getState) => {
  dispatch({ type: USERS_CARDS_FETCH });
  try {
    const cardsIDs = await ethService.getUsersCards();
    const cards = await cardService.fetchCardsMeta(cardsIDs);

    // Remove cards that are played
    const { locations } = getState().location;
    locations.forEach((location) => {
      const playedLocationIndex = cards.findIndex(_card => _card.id === location.id);
      cards.splice(playedLocationIndex, 1);

      location.dropSlots.forEach((dropSlot) => {
        if (!dropSlot.lastDroppedItem) return;

        const { card } = dropSlot.lastDroppedItem;
        const playedCardIndex = cards.findIndex(_card => _card.id === card.id);
        cards.splice(playedCardIndex, 1);
      });
    });

    dispatch({ type: USERS_CARDS_SUCCESS, cards });
  } catch (error) {
    dispatch({ type: USERS_CARDS_ERROR, error });
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
        dispatch({ type: GET_ACCOUNT_SUCCESS, account, balance });
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
