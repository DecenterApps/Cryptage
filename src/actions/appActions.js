import { GET_ACCOUNT_SUCCESS, GET_ACCOUNT_ERROR, LOADING_ENDED } from './actionTypes';
import ethService from '../services/ethereumService';
import { nameOfNetwork } from '../services/utils';
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
 * Listens to new blocks on the Ethereum network
 */
export const listenForNewBlocks = () => () => {
  window.web3Subscriber.eth.subscribe('newBlockHeaders', async (error, { number }) => {
    if (error) return console.error('newBlockHeaders listener error', error);

    // const block = await window.web3.eth.getBlock(number);
    console.log('New block', number);
  });
};
