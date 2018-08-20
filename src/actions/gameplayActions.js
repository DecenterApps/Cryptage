import cardsPerLevel from '../constants/cardsPerLevel.json';
import {
  SET_ACTIVE_LOCATION,
  USERS_CARDS_ERROR,
  USERS_CARDS_FETCH,
  USERS_CARDS_SUCCESS,
  CHANGE_GAMEPLAY_VIEW,
  SWITCH_IN_GAMEPLAY_VIEW,
  GP_NO_LOCATIONS,
  SUBMIT_NICKNAME_SUCCESS,
  GP_LOCATION,
  GP_NO_NICKNAME,
  CLEAR_TURNS,
  PLAY_TURN,
  SAVE_STATE_ERROR,
  SAVE_STATE_SUCCESS,
  SAVE_STATE_REQUEST,
  INCREMENT_TURN,
  RESTART_PROJECT,
} from './actionTypes';
import ethService from '../services/ethereumService';
import { removePlayedCards, getCardAtContainer } from '../services/utils';
import { METAMASK_MODAL } from '../components/Modals/modalTypes';

import { packMoves } from '../services/stateService';
import {
  openErrorModal,
  openNewLevelModal,
  openNoRestartProjectModal,
  toggleModal,
} from './modalActions';
import Card from '../classes/Card';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch) => {
  dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload });
};

/**
 * Saves the users turn for later contract submission
 *
 * @param item
 * @param slotType
 * @param index
 * @param addOrRemove
 * @return {Function}
 */

// 0 za rig 1 za computer case
export const playTurn = (item, slotType, index, addOrRemove) => (dispatch, getState) => {
  const card = item.card || item.mainCard;
  const { app, gameplay } = getState();

  const {
    activeLocationIndex, activeContainerIndex, locations,
    playedTurns,
  } = gameplay;

  let location = 0;
  let cardSpecificNumber = 0;
  let containerCard;
  let specificCard = 0;

  switch (slotType) {
    case 'location':
      location = index;
      break;
    case 'project':
      cardSpecificNumber = index;
      break;
    case 'location_slot':
      location = gameplay.activeLocationIndex;
      break;
    case 'container_slot':
      location = gameplay.activeLocationIndex;
      containerCard = getCardAtContainer(locations, activeLocationIndex, activeContainerIndex);
      break;
    default:
      break;
  }

  // cardtype == gpu set specificCard to 1
  if (card.stats.ID === 10) {
    specificCard = 1;
  }

  const projectIndex = playedTurns.findIndex(item => item.uid === card.id);

  if (card.stats.type === 'Project' && projectIndex >= 0) {
    const turns = [...playedTurns];
    turns[projectIndex].counter += 1;
    return dispatch({
      type: INCREMENT_TURN,
      playedTurns: turns,
    });
  }

  dispatch({
    type: PLAY_TURN,
    turn: {
      add: addOrRemove ? 1 : 0,
      specificCard,
      location,
      level: card.stats.level,
      containerPosition: index,
      cardType: card.stats.ID,
      blockNumber: app.blockNumber,
      counter: 0,
      uid: card.id,
    },
  });
};

/**
 * gets Garage, Computer case and CPU because
 * every played gets those cards for free
 */
const getNewLevelCards = async (gameplay, cardIds) => {
  const { level } = gameplay.stats;

  if ((level - 1) < 0) return [];

  let minId = -1;

  if (cardIds.length > 0) {
    cardIds.reduce((min, cardId) => cardId.id < min ? cardId.id : min, cardIds[0]);  // eslint-disable-line
  }

  let newCards = [];

  for (let i = 1; i <= level; i += 1) {
    const cardTypes = cardsPerLevel[i - 1];

    if (cardTypes) {
      const newLevelCards = cardTypes.map((metadataId, index) => ({
        id: minId - (index + 1),
        metadataId: metadataId.toString(),
      }));

      newCards = [...newCards, ...newLevelCards];

      minId = newCards[newCards.length - 1].id;
    }
  }

  return Promise.all(newCards.map(({ id, metadataId }) => Card.getInstance(gameplay, id, 1, metadataId)));
};

/**
 * Gets user cards from contract and crosschecks
 * if any of those cards were played
 *
 * @return {Function}
 */
export const usersCardsFetch = () => async (dispatch, getState) => {
  dispatch({ type: USERS_CARDS_FETCH });

  try {
    const cardsIds = await ethService.getUsersCards();
    const { gameplay } = getState();

    const userCards = await Promise.all(cardsIds.map(cardId => Card.getInstance(gameplay, cardId, 1)));
    const newLevelCards = await getNewLevelCards(gameplay, cardsIds);

    const cards = removePlayedCards(gameplay.cards, [...userCards, ...newLevelCards]);
    // set which cards are played from current state

    dispatch({ type: USERS_CARDS_SUCCESS, payload: cards });
  } catch (error) {
    dispatch({ type: USERS_CARDS_ERROR, error });
  }
};

/**
 * Fires when a user click on a active location
 *
 * @param {Number} payload - activeLocationIndex
 * @return {Function}
 */
export const setActiveLocation = payload => (dispatch) => {
  dispatch({ type: SET_ACTIVE_LOCATION, payload });
};

/**
 * Activates a dropped project
 *
 * @param {Object} card
 * @return {Function}
 */
export const activateProject = card => (dispatch, getState) => {
  const { gameplay } = getState();

  const constPlayErrors = card.canRestart(gameplay);

  if (!constPlayErrors.allowed) {
    return dispatch(openNoRestartProjectModal(constPlayErrors));
  }

  const newState = card.restartProject(gameplay);
  dispatch({ type: RESTART_PROJECT, payload: newState });
};

/**
 * Dispatches when a user clickes on a container card.
 * It then takes him to the container card view
 *
 * @param containerIndex
 * @param viewType
 * @return {Function}
 */
export const switchInGameplayView = (containerIndex, viewType) => (dispatch) => {
  dispatch({ type: SWITCH_IN_GAMEPLAY_VIEW, payload: { viewType, containerIndex } });
};

/**
 * Fires when the nickname form is submitted
 *
 * @param {Object} data { nickname }
 */
export const submitNickname = ({ nickname }) => async (dispatch, getState) => {
  const cardsPromise = cardsPerLevel[0].map(async (metadataId, index) => {
    const id = 0 - (index + 1);

    return Card.getInstance(getState().gameplay, id, 1, metadataId.toString());
  });

  Promise.all(cardsPromise).then((cards) => {
    dispatch(openNewLevelModal(1, cards));

    dispatch({ type: SUBMIT_NICKNAME_SUCCESS, payload: nickname });
  });
};

/**
 * Sends tx to contract to save current state
 */
export const saveStateToContract = () => async (dispatch, getState) => {
  if (!window.hasMetaMask) return dispatch(toggleModal(METAMASK_MODAL, { tried: 'save game state' }, true));
  // Add call to the contract here
  const { gameplay } = getState();
  dispatch({ type: SAVE_STATE_REQUEST, payload: { isSaving: true } });

  if (gameplay.playedTurns.length === 0) {
    dispatch(openErrorModal(
      'Play something first',
      'In order to save your state you need to play some cards.',
    ));
    dispatch({
      type: SAVE_STATE_ERROR,
      payload: { isSaving: false, saveError: 'No turns played.' },
    });
    return;
  }

  const packedMoves = packMoves(gameplay.playedTurns, gameplay.blockNumber, gameplay.globalStats.experience);

  try {
    // const ipfs = await ipfsService.uploadData(gameplay);
    await ethService.updateMoves(packedMoves, gameplay.nickname);

    dispatch({ type: CLEAR_TURNS });
    dispatch({ type: SAVE_STATE_SUCCESS, payload: { isSaving: false } });
  } catch (err) {
    console.log(err);
    dispatch(openErrorModal(
      'State error',
      'There has been an error while saving the state or you have rejected the transaction.',
    ));
    dispatch({
      type: SAVE_STATE_ERROR,
      payload: { isSaving: false, saveError: 'No turns played.' },
    });
  }
};

/**
 * Used in shop and collections view to get back to game
 */
export const exitNotLocationsView = () => (dispatch, getState) => {
  let toGoView = GP_LOCATION;
  const { gameplay } = getState();
  const locations = gameplay.locations.filter(({ card }) => card);

  if (locations.length === 0) toGoView = GP_NO_LOCATIONS;
  if (!gameplay.nickname) toGoView = GP_NO_NICKNAME;

  dispatch(changeGameplayView(toGoView));
};
