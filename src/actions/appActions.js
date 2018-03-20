import { GET_ACCOUNT_SUCCESS, GET_ACCOUNT_ERROR, LOADING_ENDED, UPDATE_BLOCK_NUMBER } from './actionTypes';
import ethService from '../services/ethereumService';
import { nameOfNetwork, getPlayedAssetCards, getPlayedLocationCards } from '../services/utils';
import { handlePlayedLocationCardsPassive, handlePlayedAssetCardsPassive, checkProjectsExpiry } from '../actions/passiveGameMechanics';
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
  window.web3Subscriber.eth.subscribe('newBlockHeaders', async (error, { number }) => {
    if (error) return console.error('newBlockHeaders listener error', error);

    dispatch({ type: UPDATE_BLOCK_NUMBER, payload: number });

    const { locations } = getState().gameplay;

    dispatch(handlePlayedLocationCardsPassive(getPlayedLocationCards([...locations])));
    dispatch(handlePlayedAssetCardsPassive(getPlayedAssetCards([...locations])));
    dispatch(checkProjectsExpiry());
  });
};
