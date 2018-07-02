import {
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
  LOADING_ENDED,
  UPDATE_BLOCK_NUMBER,
  TOGGLE_CARD_DRAG,
  CLEAR_STORE,
  TOGGLE_TUTORIAL,
} from './actionTypes';
import ethService from '../services/ethereumService';
import { nameOfNetwork, getPlayedAssetCards } from '../services/utils';
import { loadGameplayState, updateFundsBlockDifference } from '../actions/gameplayActions';
import { handlePlayedAssetCardsPassive, checkProjectsExpiry } from '../actions/passiveGameMechanics';
import config from '../constants/config.json';

/**
 * Fires action when all data from local storage and web3 has been loaded
 *
 * @return {Function}
 */
export const loadingEnded = () => (dispatch) => { dispatch({ type: LOADING_ENDED }); };

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
        dispatch({ type: GET_ACCOUNT_SUCCESS, account });
        dispatch(loadGameplayState());
        // dispatch(updateFundsBlockDifference());
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

/**
 * Gets the current block number and sets
 * it to the state
 *
 * @return {Function}
 */
export const updateCurrentBlockNumber = () => async (dispatch) => {
  const payload = await web3.eth.getBlockNumber();
  dispatch({ type: UPDATE_BLOCK_NUMBER, payload });
};

/**
 * Listens to new blocks on the Ethereum network
 */
export const listenForNewBlocks = () => (dispatch, getState) => {
  window.web3Subscriber.eth.subscribe('newBlockHeaders', async (error, _number) => {
    if (error) return console.error('newBlockHeaders listener error', error);

    const { number } = _number;

    dispatch({ type: UPDATE_BLOCK_NUMBER, payload: number });

    const { locations } = getState().gameplay;

    dispatch(handlePlayedAssetCardsPassive(getPlayedAssetCards([...locations])));
    dispatch(checkProjectsExpiry());
  });
};

/**
 * Toggles if a card is being dragged in the game
 *
 * @param {Boolean} payload
 */
export const toggleCardDrag = payload => (dispatch) => {
  dispatch({ type: TOGGLE_CARD_DRAG, payload });
};

/**
 * Toggles if a card is being dragged in the game
 *
 * @param {Boolean} payload
 */
export const resetGame = () => (dispatch) => {
  dispatch({ type: CLEAR_STORE });
};


export const toggleTutorial = () => async (dispatch) => {
  dispatch({ type: TOGGLE_TUTORIAL });
};
