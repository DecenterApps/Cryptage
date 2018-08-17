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

import { log } from '../services/utils';
import ethService from '../services/ethereumService';
import cardService from '../services/cardService';
import { openRevealBoosterCardsModal } from './modalActions';
import sdk from '../services/bitGuildPortalSDK_v0.1';

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

export const revealRequest = (_id, _boosters) => {
  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters[boosterIndex].revealing = true;

  return { type: REVEAL_REQUEST, boosters, isRevealing: true };
};

export const revealSuccess = (revealedCards, _id, _boosters) => (dispatch, getState) => {
  let allCards = [...getState().gameplay.allCards];
  let cards = [...getState().gameplay.cards];

  let newCardTypes = revealedCards
    .filter(revealedCard => allCards.findIndex(card => card.metadata.id === revealedCard.metadata.id) === -1)
    .map(({ metadata }) => metadata.id);

  newCardTypes = newCardTypes.filter((type, index) => newCardTypes.indexOf(type) === index);

  cards = [...cards, ...revealedCards];
  allCards = [...allCards, ...revealedCards];

  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters.splice(boosterIndex, 1);

  dispatch({
    type: REVEAL_SUCCESS,
    cards,
    allCards,
    boosters,
    revealedCards,
    isRevealing: false,
    newCardTypes,
  });

  dispatch(openRevealBoosterCardsModal(revealedCards));
};

export const revealError = (error, _id, _boosters) => {
  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters[boosterIndex].revealing = false;

  return { type: REVEAL_ERROR, isRevealing: false, error, };
};


export const revealBooster = boosterId => async (dispatch, getState) => {
  dispatch(revealRequest(boosterId, getState().shop.boosters));

  try {
    const cardIds = await ethService.getCardsFromBooster(boosterId);
    log('Cards in booster: ', cardIds);

    const revealedCards = await cardService.fetchCardsMeta(cardIds);

    dispatch(revealSuccess(revealedCards, boosterId, getState().shop.boosters));
  } catch (e) {
    console.error(e);
    dispatch(revealError(e, boosterId, getState().shop.boosters));
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
  const { blockNumber, account } = getState().app;
  dispatch(buyBoosterRequest());
  try {
    sdk.isOnPortal()
      .then( async (isOnPortal) => {
        if (isOnPortal) {
          console.log('isOnPortal: ', isOnPortal);

          let result = await ethService.buyBoosterBitGuild(account);
          console.log(result);

          if (result.error) {
            dispatch(buyBoosterError(error));
            return;
          }

          let booster = {
            id: result,
            blockNumber,
          };

          dispatch(buyBoosterSuccess(booster));
          dispatch(revealBooster(booster.id));
        } else {
          console.log('isOnPortal: ', isOnPortal);
          return Promise.reject();
        }
    })
    .catch(async () => {
      try {
        let result = await ethService.buyBooster();
        let booster = {
          id: result.events.BoosterInstantBought.returnValues.boosterId,
          blockNumber,
        };
        console.log('isOnPortal.catch result: ', result);
        dispatch(buyBoosterSuccess(booster));
        dispatch(revealBooster(booster.id));
      } catch (e) {
        dispatch(buyBoosterError(e.message));
      }
    });
  } catch (e) {
    dispatch(buyBoosterError(e.message));
  }
};