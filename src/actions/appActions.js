import {
  LOADING_ENDED,
  UPDATE_BLOCK_NUMBER,
  TOGGLE_CARD_DRAG,
  CLEAR_STORE,
  ON_NEW_BLOCK,
} from './actionTypes';
import ethService from '../services/ethereumService';
import { checkIfNewLevel } from '../services/gameMechanicsService';

/**
 * Fires action when all data from local storage and web3 has been loaded
 *
 * @return {Function}
 */
export const loadingEnded = () => (dispatch) => { dispatch({ type: LOADING_ENDED }); };

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

    const { gameplay } = getState();
    const { number } = _number;

    const newGameplay = gameplay.updateBlockNumber(gameplay, number);
    dispatch(checkIfNewLevel(newGameplay.stats.level));
    dispatch({ type: ON_NEW_BLOCK, payload: newGameplay });
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
 */
export const resetGame = () => async (dispatch) => {
  const account = await ethService.getAccount();
  localStorage.removeItem(`cryptage-${account}`);
  dispatch({ type: CLEAR_STORE });
};