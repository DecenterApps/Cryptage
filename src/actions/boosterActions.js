import {
  BOOSTERS_REQUEST, BOOSTERS_SUCCESS, BOOSTERS_ERROR, BUY_BOOSTER_REQUEST, BUY_BOOSTER_SUCCESS, BUY_BOOSTER_ERROR,
  REVEAL_REQUEST, REVEAL_SUCCESS, REVEAL_ERROR,
} from './actionTypes';

import eth from '../services/ethereumService';
import { log } from '../services/utils';
import cardService from '../services/cardService';
// import { notify } from './notificationActions';

export const boostersRequest = () => ({
  type: BOOSTERS_REQUEST,
  isFetching: true,
});

export const boostersSuccess = boosters => ({
  type: BOOSTERS_SUCCESS,
  isFetching: false,
  boosters,
});

export const boostersError = error => ({
  type: BOOSTERS_ERROR,
  isFetching: false,
  error,
});

export const getBoosters = () => async (dispatch) => {
  dispatch(boostersRequest());

  try {
    const boosters = await eth.getBoughtBoosters();
    const filteredBoosters = boosters.filter(booster => !booster.expired);
    dispatch(boostersSuccess(filteredBoosters));
  } catch (e) {
    dispatch(boostersError(e.message));
  }
};

export const buyBoosterRequest = () => ({
  type: BUY_BOOSTER_REQUEST,
  isBuying: true,
});

export const buyBoosterSuccess = () => ({
  type: BUY_BOOSTER_SUCCESS,
  isBuying: false,
});

export const buyBoosterError = error => ({
  type: BUY_BOOSTER_ERROR,
  isBuying: false,
  error,
});

export const buyBoosterPack = () => async (dispatch) => {
  dispatch(buyBoosterRequest());
  try {
    const result = await eth.buyBooster();
    log(result);
    dispatch(buyBoosterSuccess());
    // notify('Booster bought!')(dispatch);
    // Has to delay refetching for nodes to pick up the block
    setTimeout(() => dispatch(getBoosters()), 1000);
  } catch (e) {
    dispatch(buyBoosterError(e.message));
    // notify(e.message, 'error', 5000)(dispatch);
  }
};

export const revealRequest = () => ({
  type: REVEAL_REQUEST,
  isRevealing: true,
});

export const revealSuccess = cards => ({
  type: REVEAL_SUCCESS,
  isRevealing: false,
  cards,
});

export const revealError = error => ({
  type: REVEAL_ERROR,
  isRevealing: false,
  error,
});


export const revealBooster = id => async (dispatch) => {
  dispatch(revealRequest());
  try {
    const transaction = await eth.revealBooster(id);
    log('Booster reveal result: ', transaction);
    const { boosterId } = transaction.events.BoosterRevealed.returnValues;
    const cardIds = await eth.getCardsFromBooster(boosterId);
    log('Cards in booster: ', cardIds);

    const cardsMeta = await cardService.fetchCardsMeta(cardIds);

    dispatch(revealSuccess(cardsMeta));
  } catch (e) {
    console.error(e);
    dispatch(revealError());
    // notify(e.message, 'error', 5000)(dispatch);
  }
};
