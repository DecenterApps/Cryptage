import serialize from 'serialijse';
import update from 'immutability-helper';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import {
  GENERATE_NEW_GAMEPLAY,
  SET_ACTIVE_LOCATION,
  USERS_CARDS_ERROR,
  LOAD_STATE_FROM_STORAGE,
  USERS_CARDS_FETCH,
  USERS_CARDS_SUCCESS,
  CHANGE_GAMEPLAY_VIEW,
  CHANGE_PROJECT_STATE,
  SWITCH_IN_GAMEPLAY_VIEW,
  UPDATE_GLOBAL_VALUES,
  ADDITIONAL_LOCATION_DROP_SLOTS,
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
  CHANGE_LOCATIONS_STATE,
  UPDATE_PROJECT_EXECUTION_TIME_PERCENT,
  REMOVE_ASSET_SLOTS,
} from './actionTypes';
import cardService, { fetchCardStats } from '../services/cardService';
import ethService from '../services/ethereumService';
import ipfsService from '../services/ipfsService';
import {
  checkIfCanPlayCard,
  getSlotForContainer,
  handleCardMathematics,
  getLevelCardBonusStatDiff,
  getMathErrors,
} from '../services/gameMechanicsService';
import {
  saveGameplayState,
  removePlayedCards,
  getCardAtContainer,
} from '../services/utils';

import { packMoves, readState } from '../services/stateService';
import { openErrorModal, openNewLevelModal, openNoRestartProjectModal } from './modalActions';
import Card from '../classes/Card';

/**
 * Dispatches action to change the view of central gameplay view
 *
 * @param {String} payload - view name
 * @return {Function}
 */
export const changeGameplayView = payload => (dispatch, getState) => {
  dispatch({ type: CHANGE_GAMEPLAY_VIEW, payload });
  saveGameplayState(getState);
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
    saveGameplayState(getState);
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
export const setActiveLocation = payload => (dispatch, getState) => {
  dispatch({ type: SET_ACTIVE_LOCATION, payload });
  saveGameplayState(getState);
};

/**
 * Activates a dropped project
 *
 * @param {Object} card
 * @param {Number} index
 * @return {Function}
 */
export const activateProject = (card, index) => (dispatch, getState) => {
  const { blockNumber } = getState().app;
  const { projects, globalStats } = getState().gameplay;
  const alteredProjects = [...projects];

  if (!checkIfCanPlayCard(card, globalStats)) {
    return dispatch(openNoRestartProjectModal(getMathErrors(card.stats, globalStats)));
  }

  if (card.stats.level > 1 && card.stats.cost.development > globalStats.development) {
    return dispatch(openNoRestartProjectModal({ development: true, funds: false }));
  }

  alteredProjects[index].lastDroppedItem.isFinished = false;
  alteredProjects[index].lastDroppedItem.isActive = true;
  alteredProjects[index].lastDroppedItem.expiryTime = blockNumber +
    alteredProjects[index].lastDroppedItem.mainCard.stats.cost.time;

  const mathRes = handleCardMathematics(card, [], globalStats, index);
  const alterGlobalStats = mathRes.globalStats;

  // dispatch(playTurn({ card }, 'project', index, true));

  dispatch({
    type: CHANGE_PROJECT_STATE,
    projects: alteredProjects,
  });
  dispatch({
    type: UPDATE_GLOBAL_VALUES,
    payload: alterGlobalStats,
  });
  saveGameplayState(getState);
};

/**
 * Checks if dropped card should update global fpb
 *
 * @param {Number} _fpb
 * @param {Object} card
 * @param {Boolean} addOrReduce - true is add, false is reduce
 * @param {Number} numToAddOrReduce - number which takes a lot of logic to calculate
 * (on purpose outside of function)
 * @return {Number}
 */
export const addOrReduceFromFundsPerBlock = (_fpb, card, addOrReduce, numToAddOrReduce = 0) => {
  let fpb = _fpb;

  if (card.stats && (card.stats.type === 'Mining' || card.metadata.id === '18' || card.metadata.id === '22')) { // eslint-disable-line
    if (addOrReduce) fpb += getLevelCardBonusStatDiff(card, 'funds');
    else fpb -= card.stats.bonus.funds;
  }

  if (card.stats && card.metadata.id === '23') {
    if (addOrReduce) fpb += getLevelCardBonusStatDiff(card, 'multiplierFunds');
    else fpb -= card.stats.bonus.multiplierFunds;
  }

  // Special mechanics for card with id 26, Adds fpb when completed;
  if (card.mainCard && card.mainCard.metadata.id === '26') {
    const { timesFinished, mainCard } = card;

    if (addOrReduce) fpb += getLevelCardBonusStatDiff(card, 'multiplierFunds');
    else fpb -= (timesFinished * mainCard.stats.bonus.multiplierFunds);
  }

  if (card.mainCard && card.mainCard.metadata.id === '27') {
    if (addOrReduce) fpb += numToAddOrReduce;
    else fpb -= numToAddOrReduce;
  }

  return fpb;
};

export const updateFundsBlockDifference = () => async (dispatch, getState) => {
  console.log('updateFundsBlockDifference');
  const { app: { account }, gameplay } = getState();

  if (!account) return;

  const previousState = serialize.deserialize(localStorage.getItem(`cryptage-${account}`));

  if (previousState) {
    const currentBlock = await ethService.getBlockNumber();
    const blockDiff = currentBlock - previousState.blockNumber;
    console.log(`Add ${previousState.fundsPerBlock} funds for ${blockDiff} blocks`);

    const locations = [...gameplay.locations];
    const globalStats = { ...gameplay.globalStats };

    globalStats.funds += blockDiff * previousState.fundsPerBlock;

    dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });
  }
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
    saveGameplayState(getState);
  });
};

/**
 * Sends tx to contract to save current state
 */
export const saveStateToContract = () => async (dispatch, getState) => {
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
    saveGameplayState(getState);
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
  const locations = gameplay.locations.filter(({ lastDroppedItem }) => lastDroppedItem !== null);

  if (locations.length === 0) toGoView = GP_NO_LOCATIONS;
  if (!gameplay.nickname) toGoView = GP_NO_NICKNAME;

  dispatch(changeGameplayView(toGoView));
};

/**
 * Checks if bonus for projects is still visible, disables it if it is.
 */
export const checkProjectsBonus = () => (dispatch, getState) => {
  let changed = false;
  let projects = [...getState().gameplay.projects];

  projects = projects.map((_project) => {
    const project = { ..._project };

    if (project.lastDroppedItem && project.lastDroppedItem.showFpb) {
      changed = true;
      project.lastDroppedItem.showFpb = false;
    }

    return project;
  });

  if (changed) dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Updates projectExecutionTimePercent based on how much a card alters it
 *
 * @param {Object} card
 * @param {Number} lastDecrease
 * @return {Number} percentDecreased
 */
export const updateProjectExecutionTimePercent = (card, lastDecrease) => (dispatch, getState) => {
  let { projectExecutionTimePercent } = getState().gameplay;

  // add how much was taken in order to decrease again
  projectExecutionTimePercent += lastDecrease;

  // calc how much percent is going to be decreased
  const percentDecreased = Math.ceil((card.stats.bonus.multiplierTime / 100) * projectExecutionTimePercent);
  projectExecutionTimePercent -= percentDecreased;

  if (projectExecutionTimePercent < 0) projectExecutionTimePercent = 0;

  dispatch({ type: UPDATE_PROJECT_EXECUTION_TIME_PERCENT, payload: projectExecutionTimePercent });
  return percentDecreased;
};

/**
 * Reduces projects execution time when asset it dropped/leveled up
 *
 * @param {Array} _projects
 * @param {Number} index
 * @param {Object} card
 */
export const projectReduceTimeForProjects = (_projects, index, card) => (dispatch) => {
  const projects = [..._projects];
  const lastDecrease = card.stats.level === 1 ? 0 : projects[index].lastDroppedItem.special;

  const percentDecreased = dispatch(updateProjectExecutionTimePercent(card, lastDecrease));
  projects[index].lastDroppedItem.special = percentDecreased;
  dispatch({ type: CHANGE_PROJECT_STATE, projects });
};

/**
 * Reduces projects execution time when asset it dropped/leveled up
 *
 * @param {Array} _locations
 * @param {Number} activeLocationIndex
 * @param {Number} index
 * @param {Object} card
 */
export const assetReduceTimeForProjects = (_locations, activeLocationIndex, index, card) => (dispatch) => {
  const locations = [..._locations];
  const lastDecrease = card.stats.level === 1 ? 0 : locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.special; // eslint-disable-line

  const percentDecreased = dispatch(updateProjectExecutionTimePercent(card, lastDecrease));
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.special = percentDecreased;
  dispatch({ type: CHANGE_LOCATIONS_STATE, payload: locations });
};
