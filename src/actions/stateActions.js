import serialijse from 'serialijse';
import {
  GENERATE_NEW_GAMEPLAY,
  LOAD_STATE_FROM_STORAGE,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
} from './actionTypes';
import Gameplay from '../classes/Gameplay';
import ethService from '../services/ethereumService';
import config from '../constants/config.json';
import { nameOfNetwork } from '../services/utils';

/**
 * If the user has an account loads gameplay
 * from localStorage
 *
 * @return {Function}
 */
export const loadGameplayState = () => async (dispatch, getState) => {
  const { account } = getState().app;

  if (!account) return;

  const data = localStorage.getItem(`cryptage-${account}`);

  if (!data) {
    const blockNum = await web3.eth.getBlockNumber();
    return dispatch({ type: GENERATE_NEW_GAMEPLAY, payload: new Gameplay(blockNum) });
  }

  return dispatch({ type: LOAD_STATE_FROM_STORAGE, payload: serialijse.deserialize(data) });
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
        dispatch({ type: GET_ACCOUNT_SUCCESS, payload: account });
        dispatch(loadGameplayState());
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
