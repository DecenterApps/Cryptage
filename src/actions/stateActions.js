import serialijse from 'serialijse';
import {
  LOAD_STATE_FROM_STORAGE,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_ERROR,
} from './actionTypes';
import ethService from '../services/ethereumService';
import config from '../constants/config.json';
import { nameOfNetwork } from '../services/utils';
import { toggleModal } from './modalActions';
import { METAMASK_INSTALLED_MODAL } from '../components/Modals/modalTypes';

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

  if (data) return dispatch({ type: LOAD_STATE_FROM_STORAGE, payload: serialijse.deserialize(data) });

  const tempAccountState = JSON.parse(localStorage.getItem('cryptage-0x0000000000000000000000000000000000000000'));
  if (tempAccountState) {
    dispatch({ type: LOAD_STATE_FROM_STORAGE, payload: serialijse.deserialize(tempAccountState) });
    dispatch(toggleModal(METAMASK_INSTALLED_MODAL, {}, true));
    setTimeout(() => {
      localStorage.removeItem('cryptage-0x0000000000000000000000000000000000000000');
    }, 10000);
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
