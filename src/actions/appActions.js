import {
  CHANGE_GAMEPLAY_VIEW, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, USERS_CARDS_ERROR, GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR, LOADING_ENDED,
} from './actionTypes';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';
import { nameOfNetwork, saveGameplayState } from '../services/utils';
import config from '../constants/config.json';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch, getState) => {
  dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload });
  saveGameplayState(getState);
};

/**
 * Fires action when all data from local storage and web3 has been loaded
 *
 * @return {Function}
 */
export const loadingEnded = () => (dispatch) => { dispatch({ type: LOADING_ENDED }); };

/**
 * Removes player cards that have been played
 *
 * @param {Array} _cards
 * @param {Function} getState
 * @return {Array}
 */
const removePlayedCards = (_cards, getState) => {
  const { locations } = getState().gameplay;
  const cards = [..._cards];

  locations.forEach(({ lastDroppedItem }) => {
    if ((lastDroppedItem !== null) && typeof (lastDroppedItem === 'object')) {
      // remove location cards from player cards
      lastDroppedItem.cards.forEach((locationCard) => {
        const playedLocationCardIndex = cards.findIndex(_card => _card.id === locationCard.id);
        cards.splice(playedLocationCardIndex, 1);
      });

      // remove asset cards from location drop slots
      lastDroppedItem.dropSlots.forEach((locationItemSlot) => {
        const locationItem = locationItemSlot.lastDroppedItem;

        if ((locationItem !== null) && typeof (locationItem === 'object')) {
          locationItemSlot.lastDroppedItem.cards.forEach((locationItemCard) => {
            const playedLocationCardIndex = cards.findIndex(_card => _card.id === locationItemCard.id);
            cards.splice(playedLocationCardIndex, 1);
          });
        }
      });
    }
  });

  console.log('cards', cards);
  return cards;
};

/**
 * Gets user cards from contract and crosschecks
 * if any of those cards were played
 *
 * @return {Function}
 */
export const usersCardsFetch = () => async (dispatch, getState) => {
  dispatch({ type: USERS_CARDS_FETCH });
  try {
    const cardsIDs = await ethService.getUsersCards();
    const cards = await cardService.fetchCardsMeta(cardsIDs);

    dispatch({ type: USERS_CARDS_SUCCESS, cards: removePlayedCards(cards, getState) });
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
        console.log('reload');
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
