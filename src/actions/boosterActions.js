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
import ethService from '../services/ethereumService';
import { openRevealBoosterCardsModal, toggleModal } from './modalActions';
import Card from '../classes/Card';
import { METAMASK_MODAL } from '../components/Modals/modalTypes';

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
  let cards = [...getState().gameplay.cards];

  revealedCards.forEach((_revealCard) => {
    const revealCard = _revealCard;
    const foundCard = cards.find(card => card.metadataId === revealCard.metadataId);
    if (!foundCard) revealCard.isNew = true;
  });

  cards = [...cards, ...revealedCards];

  const boosters = [..._boosters];
  const boosterIndex = boosters.findIndex(({ id }) => id === _id);
  boosters.splice(boosterIndex, 1);

  dispatch({
    type: REVEAL_SUCCESS,
    cards,
    boosters,
    revealedCards,
    isRevealing: false,
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
  const { gameplay } = getState();

  try {
    const cardIds = await ethService.getCardsFromBooster(boosterId);

    const revealedCards = await Promise.all(cardIds.map(cardId => Card.getInstance(gameplay, cardId, 1)));

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
  if (!window.hasMetaMask) return dispatch(toggleModal(METAMASK_MODAL, { tried: 'buy a card pack' }, true));
  const { blockNumber } = getState().app;
  dispatch(buyBoosterRequest());
  try {
    const result = await ethService.buyBooster();

    const booster = {
      id: result.events.BoosterInstantBought.returnValues.boosterId,
      blockNumber,
    };
    dispatch(buyBoosterSuccess(booster));
    dispatch(revealBooster(booster.id));
  } catch (e) {
    dispatch(buyBoosterError(e.message));
  }
};
