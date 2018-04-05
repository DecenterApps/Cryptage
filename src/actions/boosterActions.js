import {
  BOOSTERS_REQUEST,
  BOOSTERS_SUCCESS,
  BOOSTERS_ERROR,
  BUY_BOOSTER_REQUEST,
  BUY_BOOSTER_SUCCESS,
  BUY_BOOSTER_ERROR,
  REVEAL_REQUEST,
  REVEAL_SUCCESS,
  REVEAL_ERROR,
} from './actionTypes';

import { log, removePlayedCards } from '../services/utils';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';

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
    const boosters = await ethService.getBoughtBoosters();
    console.log('get boosters', boosters);
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

export const buyBoosterSuccess = booster => ({
  type: BUY_BOOSTER_SUCCESS,
  isBuying: false,
  booster,
});

export const buyBoosterError = error => ({
  type: BUY_BOOSTER_ERROR,
  isBuying: false,
  error,
});

export const buyBoosterPack = () => async (dispatch, getState) => {
  const { blockNumber } = getState().app;
  dispatch(buyBoosterRequest());
  try {
    const result = await ethService.buyBooster();
    log(result);
    const booster = {
      id: result.events.BoosterBought.returnValues.boosterId,
      blockNumber,
    };
    dispatch(buyBoosterSuccess(booster));
    // notify('Booster bought!')(dispatch);
  } catch (e) {
    dispatch(buyBoosterError(e.message));
    // notify(e.message, 'error', 5000)(dispatch);
  }
};

export const revealRequest = (_id, _boosters) => {
  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters[boosterIndex].revealing = true;

  return { type: REVEAL_REQUEST, boosters, isRevealing: true };
};

export const revealSuccess = (allCards, revealedCards, _id, _boosters, getState) => {
  const cards = [...allCards, ...revealedCards];
  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters.splice(boosterIndex, 1);

  return {
    type: REVEAL_SUCCESS,
    cards,
    boosters,
    revealedCards,
    isRevealing: false,
  };
};

export const revealError = (error, _id, _boosters) => {
  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters[boosterIndex].revealing = false;

  return { type: REVEAL_ERROR, isRevealing: false, error, };
};

export const revealBooster = id => async (dispatch, getState) => {
  dispatch(revealRequest(id, getState().shop.boosters));

  try {
    const transaction = await ethService.revealBooster(id, getState().shop.boosters);
    log('Booster reveal result: ', transaction);
    const { boosterId } = transaction.events.BoosterRevealed.returnValues;
    const cardIds = await ethService.getCardsFromBooster(boosterId);
    log('Cards in booster: ', cardIds);

    const allCards = [...getState().gameplay.cards];
    const cards = await cardService.fetchCardsMeta(cardIds);

    dispatch(revealSuccess(allCards, cards, id, getState().shop.boosters, getState));
  } catch (e) {
    console.error(e);
    dispatch(revealError(e, id, getState().shop.boosters));
    // notify(e.message, 'error', 5000)(dispatch);
  }
};
