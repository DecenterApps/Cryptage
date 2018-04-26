import update from 'immutability-helper';
import cardsPerLevel from '../constants/cardsPerLevel.json';
import {
  DROP_LOCATION,
  SET_ACTIVE_LOCATION,
  USERS_CARDS_ERROR,
  DROP_ASSET,
  LOAD_STATE_FROM_STORAGE,
  USERS_CARDS_FETCH,
  USERS_CARDS_SUCCESS,
  CHANGE_GAMEPLAY_VIEW,
  DROP_MINER,
  DROP_PROJECT,
  CHANGE_PROJECT_STATE,
  ADD_LOCATION_SLOTS,
  ADD_ASSET_SLOTS,
  SWITCH_IN_GAMEPLAY_VIEW,
  UPDATE_GLOBAL_VALUES,
  ADDITIONAL_LOCATION_DROP_SLOTS,
  ADDITIONAL_LOCATION_ITEM_DROP_SLOTS,
  GP_NO_LOCATIONS,
  SUBMIT_NICKNAME_SUCCESS,
  GP_LOCATION,
  GP_NO_NICKNAME,
  CLEAR_TURNS,
  PLAY_TURN,
  bonusDevPerLocationCards,
} from './actionTypes';
import cardService, { fetchCardStats } from '../services/cardService';
import ethService from '../services/ethereumService';
import ipfsService from '../services/ipfsService';
import {
  checkIfCanPlayCard,
  getSlotForContainer,
  handleCardMathematics,
  calcLocationPerDevBonus,
  handleBonusDevMechanics,
  assetReduceTimeForProjects,
} from '../services/gameMechanicsService';
import {
  saveGameplayState,
  updateLocationDropSlotItems,
  removePlayedCards,
  calcDataForNextLevel,
  updateContainerDropSlotItems,
  getCardAtContainer,
  updateLocationsDropSlots,
  updateProjectsDropSlots,
} from '../services/utils';

import { packMoves, readState } from '../services/stateService';
import { openNewLevelModal, openNoRestartProjectModal } from './modalActions';
import { levelUpLocation, levelUpProject, levelUpAsset } from './levelUpActions';

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
 * gets Garage, Computer case and CPU because
 * every played gets those cards for free
 */
const getNewLevelCards = (level, cards) => {
  if ((level - 1) < 0) return [];

  let minId = -1;

  if (cards.length > 0) {
    cards.reduce((min, card) => card.id < min ? card.id : min, cards[0].id);  // eslint-disable-line
  }

  let newCards = [];

  for (let i = 1; i <= level; i += 1) {
    const cardTypes = cardsPerLevel[i - 1];
    if (cardTypes) {
      const newLevelCards = cardTypes.map((metadataId, index) => ({
        id: minId - (index + 1),
        stats: fetchCardStats(metadataId, 1),
        metadata: { id: metadataId.toString() },
      }));

      newCards = [...newCards, ...newLevelCards];

      minId = newCards[newCards.length - 1].id;
    }
  }

  return newCards;
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
    const cardsIDs = await ethService.getUsersCards();
    let cards = await cardService.fetchCardsMeta(cardsIDs);
    const { level } = getState().gameplay.globalStats;

    const newLevelCards = getNewLevelCards(level, cards);
    cards = [...cards, ...newLevelCards];

    dispatch({
      type: USERS_CARDS_SUCCESS,
      allCards: cards,
      cards: removePlayedCards(cards, getState),
    });
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
 * Checks if all location slots are full, if they are,
 * adds 6 new ones
 *
 * @return {Function}
 */
export const addLocationSlots = () => (dispatch, getState) => {
  let locations = [...getState().gameplay.locations];
  const emptyLocations = locations.filter(({ lastDroppedItem }) => lastDroppedItem === null);

  if (emptyLocations.length > 1) return;

  locations = [...locations, ...ADDITIONAL_LOCATION_DROP_SLOTS];
  dispatch({ type: ADD_LOCATION_SLOTS, payload: locations });
};

/**
 * Checks if the active has only one empty slot, if it does do,
 * adds 1 new empty slot. Unless the space of the active location equals 0.
 *
 * @param {Number} locationIndex
 * @return {Function}
 */
export const addAssetSlots = locationIndex => (dispatch, getState) => {
  let locations = [...getState().gameplay.locations];
  const location = locations[locationIndex].lastDroppedItem;
  const currentSlots = location.dropSlots;

  const emptyLocations = currentSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null);

  if (emptyLocations.length > 1) return;

  if (location.values.space === 0) return;

  locations = update(locations, {
    [locationIndex]: {
      lastDroppedItem: {
        dropSlots: { $set: [...currentSlots, ...ADDITIONAL_LOCATION_ITEM_DROP_SLOTS] },
      },
    },
  });

  dispatch({ type: ADD_ASSET_SLOTS, payload: locations });
};

/**
 * Fires when the player drags a location card from his hand
 * to the location sidebar
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleLocationDrop = (index, item) => (dispatch, getState) => {
  const { gameplay } = getState();

  let locations = [...gameplay.locations];
  let globalStats = { ...gameplay.globalStats };
  const cards = [...gameplay.cards];
  const { lastDroppedItem } = locations[index];

  if (!checkIfCanPlayCard(item.card.stats, globalStats)) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  // location drop when slot is empty
  if (!lastDroppedItem) locations = updateLocationsDropSlots(locations, index, item);
  // location drop when there is/are already a card/cards in the slot (level-up)
  else locations = levelUpLocation(locations, index, lastDroppedItem, item.card);

  const { mainCard } = locations[index].lastDroppedItem;
  ({ locations, globalStats } = handleCardMathematics(mainCard, locations, gameplay.globalStats, index));

  dispatch({
    type: DROP_LOCATION, activeLocationIndex: index, locations, cards, globalStats,
  });

  saveGameplayState(getState);
};

/**
 * Fires when the player drags a project card from his hand
 * to the menu sidebar
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleProjectDrop = (index, item) => (dispatch, getState) => {
  const { gameplay } = getState();

  let projects = [...gameplay.projects];
  let globalStats = { ...gameplay.globalStats };
  const cards = [...gameplay.cards];
  const { lastDroppedItem } = projects[index];

  if (!checkIfCanPlayCard(item.card.stats, globalStats)) return;
  if (lastDroppedItem && lastDroppedItem.isActive) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  // location drop when slot is empty
  if (!lastDroppedItem) projects = updateProjectsDropSlots(projects, index, item, gameplay.blockNumber);
  // project drop when there is/are already a card/cards in the slot and the slot is not active
  if (lastDroppedItem && !lastDroppedItem.isActive) {
    projects = levelUpProject(projects, index, lastDroppedItem, item.card);
  }

  const { mainCard } = projects[index].lastDroppedItem;
  ({ globalStats } = handleCardMathematics(mainCard, [], globalStats, index));

  dispatch({ type: DROP_PROJECT, projects, cards, globalStats }); // eslint-disable-line
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

  if (!checkIfCanPlayCard(card.stats, globalStats)) return dispatch(openNoRestartProjectModal());

  alteredProjects[index].lastDroppedItem.isFinished = false;
  alteredProjects[index].lastDroppedItem.isActive = true;
  alteredProjects[index].lastDroppedItem.expiryTime = blockNumber +
    alteredProjects[index].lastDroppedItem.mainCard.stats.cost.time;

  const mathRes = handleCardMathematics(card, [], globalStats, index);
  const alterGlobalStats = mathRes.globalStats;

  // if the project is activated again
  if (card !== 'project') {
    dispatch({
      type: PLAY_TURN,
      turn: {
        add: 1,
        specificCard: 0,
        location: index,
        containerPosition: index,
        cardType: card.stats.ID,
        blockNumber,
      },
    });
  }

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
    if (addOrReduce) fpb += card.stats.bonus.funds;
    else fpb -= card.stats.bonus.funds;
  }

  if (card.stats && card.metadata.id === '23') {
    if (addOrReduce) fpb += card.stats.bonus.multiplierFunds;
    else fpb -= card.stats.bonus.multiplierFunds;
  }

  // Special mechanics for card with id 26, Adds fpb when completed;
  if (card.mainCard && card.mainCard.metadata.id === '26') {
    const { timesFinished, mainCard } = card;
    const multiplier = mainCard.stats.bonus.multiplierFunds;

    if (addOrReduce === true) fpb += multiplier;
    else fpb -= (timesFinished * multiplier);
  }

  if (card.mainCard && card.mainCard.metadata.id === '27') {
    if (addOrReduce) fpb += numToAddOrReduce;
    else fpb -= numToAddOrReduce;
  }

  return fpb;
};

/**
 * Fires when the player drags a card from his hand
 * to a empty location asset deck slot
 *
 * @param {Number} index
 * @param {Object} item
 * @return {Function}
 */
export const handleAssetDrop = (index, item) => (dispatch, getState) => {
  const { gameplay } = getState();
  const { activeLocationIndex } = gameplay;

  const cards = [...gameplay.cards];
  let locations = [...gameplay.locations];
  let globalStats = { ...gameplay.globalStats };
  const metaDataId = item.card.metadata.id;

  if (!checkIfCanPlayCard(item.card.stats, globalStats, locations[activeLocationIndex].lastDroppedItem)) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  const locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];
  const slotItem = locationSlots[index].lastDroppedItem;

  if (!slotItem) {
    let special;

    // handle special cards drop
    if (bonusDevPerLocationCards.includes(metaDataId)) {
      const cardEffect = calcLocationPerDevBonus(item, locations, activeLocationIndex, globalStats);
      ({ globalStats } = cardEffect);
      special = cardEffect.bonus;
    }

    // handle hacker unique special case
    if (metaDataId === '18' || metaDataId === '16' || metaDataId === '39') {
      globalStats.development += item.card.stats.bonus.development;
    }

    if (metaDataId === '40') dispatch(assetReduceTimeForProjects(item));

    locations = updateLocationDropSlotItems(locationSlots, index, item, locations, activeLocationIndex, special);

    // On developer drop recalculates location per dev bonus
    // if cards that have that effect were dropped
    if (item.card.stats.type === 'Person') {
      ({ globalStats, locations } = handleBonusDevMechanics(locations, activeLocationIndex, globalStats));
    }
  } else {
    // handle asset level up here
    locations = levelUpAsset(locations, activeLocationIndex, index, item.card);
  }

  const { mainCard } = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem;
  const mathRes = handleCardMathematics(mainCard, locations, globalStats, activeLocationIndex);

  ({ locations, globalStats } = mathRes);

  const fundsPerBlock = addOrReduceFromFundsPerBlock(gameplay.fundsPerBlock, mainCard, true);

  dispatch({
    type: DROP_ASSET, locations, cards, globalStats, fundsPerBlock,
  });
  dispatch(addAssetSlots(activeLocationIndex));
  saveGameplayState(getState);
};

/**
 * If the user has an account loads gameplay
 * from localStorage
 *
 * @return {Function}
 */
export const loadGameplayState = () => async (dispatch, getState) => {
  const { account } = getState().app;

  if (!account) return;

  const payload = JSON.parse(localStorage.getItem(`player-location-${account}`));

  if (!payload) {
    // const currState = await ethService.getState();
    // console.log(readState(currState));

    // // TODO: better check for inital state
    // if (readState(currState).funds === 150) {
    //   return;
    // }

    // payload = createGameplayState(readState(currState));
    return;
  }

  dispatch({ type: LOAD_STATE_FROM_STORAGE, payload });
};

export const updateFundsBlockDifference = () => async (dispatch, getState) => {
  const { app: { account }, gameplay } = getState();

  if (!account) return;

  const previousState = JSON.parse(localStorage.getItem(`player-location-${account}`));

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

// /**
//  * Fires when the user clicks the level up button on a miner card
//  * which appears when the miner has enough stacked cards to level up
//  *
//  * @param {Number} locationIndex
//  * @param {Number} containerIndex
//  * @param {Number} cardIndex
//  */
// export const levelUpContainedCard = (locationIndex, containerIndex, cardIndex) => (dispatch, getState) => {
//   const gameplay = { ...getState().gameplay };
//
//   let locations = [...gameplay.locations];
//   let globalStats = { ...gameplay.globalStats };
//
//   const { lastDroppedItem } = locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem
//     .dropSlots[cardIndex];
//   const { level } = lastDroppedItem;
//   const card = lastDroppedItem.cards[0];
//   const newCardStats = getLevelValuesForCard(card.metadata.id, level + 1);
//
//   const play = checkIfCanPlayCard(newCardStats, globalStats);
//   if (!play) return;
//
//   locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
//     .lastDroppedItem.cards[0].stats = { ...card.stats, ...newCardStats };
//   locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
//     .lastDroppedItem.level += 1;
//   locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
//     .lastDroppedItem.canLevelUp = false;
//   locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
//     .accepts = [card.metadata.id];
//
//   const mathRes = handleCardMathematics(
//     locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex].lastDroppedItem.cards[0], // eslint-disable-line
//     locations,
//     gameplay.globalStats,
//     locationIndex,
//   );
//   locations = mathRes.locations;
//   globalStats = mathRes.globalStats;
//
//   dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
//   saveGameplayState(getState);
// };

// /**
//  * Adds new drop slots to container drop slots based on bonus
//  *
//  * @param _locations
//  * @param activeLocationIndex
//  * @param index
//  * @return {Array}
//  */
// export const addDropSlotsToContainer = (_locations, activeLocationIndex, index) => {
//   const locations = [..._locations];
//   const containerDropSlots = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.dropSlots;
//   const card = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards[0];
//   const newDropSlots = getSlotForContainer(card.metadata.id, card.stats.bonus.space);
//
//   locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.dropSlots =
//     [...containerDropSlots, ...newDropSlots];
//
//   return locations;
// };

/**
 * AKA third level drop
 *
 * @param {Number} locationIndex
 * @param {Number} containerIndex
 * @param {Number} cardIndex
 * @param {Object} item
 */
export const handleMinerDropInContainer = (locationIndex, containerIndex, cardIndex, item) => (dispatch, getState) => {
  const { gameplay } = getState();

  const cards = [...gameplay.cards];
  let locations = [...gameplay.locations];

  const containerSlots = [
    ...locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots,
  ];
  const slotItem = containerSlots[cardIndex].lastDroppedItem;
  const locationItem = locations[locationIndex].lastDroppedItem;

  const play = checkIfCanPlayCard(item.card.stats, gameplay.globalStats, locationItem, true);
  if (!play) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  if (!slotItem) {
    locations = updateContainerDropSlotItems(locationIndex, containerIndex, cardIndex, item, containerSlots, locations);
  } else {
    const { lastDroppedItem } =
      locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex];
    const { level, cards } = lastDroppedItem;

    const nextLevelPercent = calcDataForNextLevel(cards.length + 1, level).percent;

    if (nextLevelPercent === 100) {
      locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
        .lastDroppedItem.canLevelUp = true;
      // // disable drop when level up is available
      locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem
        .dropSlots[cardIndex].accepts = [];
    }

    locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
      .lastDroppedItem.cards.push({ ...item.card });
  }

  const mathRes = handleCardMathematics(item.card, locations, gameplay.globalStats, locationIndex);
  const { globalStats } = mathRes;
  ({ locations } = mathRes);

  const fundsPerBlock = addOrReduceFromFundsPerBlock(gameplay.fundsPerBlock, item.card, true);

  dispatch({
    type: DROP_MINER, locations, cards, globalStats, fundsPerBlock,
  });
  saveGameplayState(getState);
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
  const card = item.card || item.cards[0];
  const { app, gameplay } = getState();

  const {
    activeLocationIndex, activeContainerIndex, locations,
    playedTurns,
  } = gameplay;

  let location;
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

  dispatch({
    type: PLAY_TURN,
    turn: {
      add: addOrRemove ? 1 : 0,
      specificCard,
      location,
      containerPosition: index,
      cardType: card.stats.ID,
      blockNumber: app.blockNumber,
    },
  });
};

/**
 * Fires when the nickname form is submitted
 *
 * @param {Object} data { nickname }
 */
export const submitNickname = ({ nickname }) => async (dispatch) => {
  // Add call to the contract here

  const cards = cardsPerLevel[0].map((metadataId, index) => ({
    id: 0 - (index + 1),
    stats: fetchCardStats(metadataId, 1),
    metadata: { id: metadataId.toString() },
  }));

  dispatch(openNewLevelModal(1, cards));

  dispatch({ type: SUBMIT_NICKNAME_SUCCESS, payload: nickname });
};

/**
 * Sends tx to contract to save current state
 */
export const saveStateToContract = () => async (dispatch, getState) => {
  // Add call to the contract here
  const { gameplay } = getState();

  if (gameplay.playedTurns.length === 0) {
    const currState = await ethService.getState();
    console.log(currState, readState(currState));
    return;
  }

  const packedMoves = packMoves(gameplay.playedTurns);

  console.log('Packed Moves: ', packedMoves);

  try {
    const ipfs = await ipfsService.uploadData(gameplay);

    await ethService.updateMoves(packedMoves, ipfs[0].hash);

    dispatch({ type: CLEAR_TURNS });
    saveGameplayState(getState);
  } catch (err) {
    console.log(err);
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
