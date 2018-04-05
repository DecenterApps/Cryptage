import update from 'immutability-helper';
import {
  DROP_LOCATION,
  SET_ACTIVE_LOCATION,
  LOCATION_ITEM_DROP_SLOTS,
  USERS_CARDS_ERROR,
  DROP_ASSET,
  LOAD_STATE_FROM_STORAGE,
  USERS_CARDS_FETCH,
  USERS_CARDS_SUCCESS,
  CHANGE_GAMEPLAY_VIEW,
  LEVEL_UP_CARD,
  DROP_MINER,
  DROP_PROJECT,
  CHANGE_PROJECT_STATE,
  ADD_LOCATION_SLOTS,
  ADD_ASSET_SLOTS,
  SWITCH_IN_GAMEPLAY_VIEW,
  PLAY_TURN, UPDATE_GLOBAL_VALUES,
  ADDITIONAL_LOCATION_DROP_SLOTS,
  ADDITIONAL_LOCATION_ITEM_DROP_SLOTS,
  REMOVE_CARD, GP_NO_LOCATIONS,
  SUBMIT_NICKNAME_SUCCESS,
  acceptedLocationDropIds,
  acceptedAssetDropIds,
  acceptedProjectDropIds,
  RETURN_CARD,
  GP_LOCATION,
  GP_NO_NICKNAME,
  UPDATE_LOCATIONS,
} from './actionTypes';
import cardService, { fetchCardStats } from '../services/cardService';
import ethService from '../services/ethereumService';
import {
  checkIfCanPlayCard, getLevelValuesForCard, getSlotForContainer,
  handleCardMathematics, handleCoffeeMinerEffect,
} from '../services/gameMechanicsService';
import {
  saveGameplayState, updateLocationDropSlotItems, removePlayedCards,
  calcDataForNextLevel, updateContainerDropSlotItems, getCardAtContainer,
} from '../services/utils';

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
const getOnboardingCards = async () => {
  const cardTypes = [0, 6, 9, 12, 24];
  return cardTypes.map((metadataId, index) => ({
    id: index - 3,
    stats: fetchCardStats(metadataId),
    metadata: { id: metadataId.toString() },
  }));
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

    const onboardingCards = await getOnboardingCards();
    cards = [...cards, ...onboardingCards];

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

  const play = checkIfCanPlayCard(item.card.stats, globalStats);
  if (!play) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  if (!locations[index].lastDroppedItem) {
    // location drop when slot is empty
    locations = update(locations, {
      [index]: {
        // only allow the card type that has been dropped now to be dropped again
        accepts: { $set: [] },
        lastDroppedItem: {
          $set: {
            level: 1,
            canLevelUp: false,
            values: { ...item.card.stats.values },
            dropSlots: LOCATION_ITEM_DROP_SLOTS,
            cards: [{ ...item.card, index }],
          },
        },
      },
    });
  } else {
    // location drop when there is/are already a card/cards in the slot
    const { lastDroppedItem } = locations[index];
    const { level, cards } = lastDroppedItem;

    const nextLevelPercent = calcDataForNextLevel(cards.length + 1, level).percent;
    if (nextLevelPercent === 100) {
      locations[index].lastDroppedItem.canLevelUp = true;
      // disable drop when level up is available
      locations[index].accepts = [];
    }

    locations[index].lastDroppedItem.cards.push({ ...item.card });
  }

  const mathRes = handleCardMathematics(item.card, locations, gameplay.globalStats, index);
  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

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
  const { gameplay, app } = getState();
  const { projects, globalStats, cards } = gameplay;

  if (!checkIfCanPlayCard(item.card.stats, globalStats)) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  const alteredProjects = [...projects];
  let cardsLeft = cards;

  if ((projects[index].lastDroppedItem && !projects[index].lastDroppedItem.isActive) ||
    (!projects[index].lastDroppedItem)) {
    cardsLeft = [
      ...cards.slice(0, draggedCardIndex),
      ...cards.slice(draggedCardIndex + 1),
    ];
  }

  if (!projects[index].lastDroppedItem) {
    // location drop when slot is empty
    alteredProjects[index] = {
      // only allow the card type that has been dropped now to be dropped again
      accepts: [],
      lastDroppedItem: {
        level: 1,
        canLevelUp: false,
        values: { ...item.card.stats.values },
        cards: [{ ...item.card, index }],
        isActive: true,
        isFinished: false,
        expiryTime: app.blockNumber + item.card.stats.cost.time,
      },
      slotType: 'project',
    };
  } else if (!projects[index].lastDroppedItem.isActive) {
    // location drop when there is/are already a card/cards in the slot
    // handle level up here
    const { lastDroppedItem } = alteredProjects[index];
    const { level, cards } = lastDroppedItem;

    const nextLevelPercent = calcDataForNextLevel(cards.length + 1, level).percent;
    if (nextLevelPercent === 100) {
      alteredProjects[index].lastDroppedItem.canLevelUp = true;
      // disable drop when level up is available
      alteredProjects[index].accepts = [];
    }

    alteredProjects[index].lastDroppedItem.cards.push({ ...item.card });
  }
  const mathRes = handleCardMathematics(item.card, [], gameplay.globalStats, index);
  const alterGlobalStats = mathRes.globalStats;

  dispatch({
    type: DROP_PROJECT,
    projects: alteredProjects,
    cards: cardsLeft,
    globalStats: alterGlobalStats,
  });
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

  if (!checkIfCanPlayCard(card.stats, globalStats)) return;

  alteredProjects[index].lastDroppedItem.isFinished = false;
  alteredProjects[index].lastDroppedItem.isActive = true;
  alteredProjects[index].lastDroppedItem.expiryTime = blockNumber +
    alteredProjects[index].lastDroppedItem.cards[0].stats.cost.time;

  const mathRes = handleCardMathematics(card, [], globalStats, index);
  const alterGlobalStats = mathRes.globalStats;

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
 * Removes a project at an index
 *
 * @param {Object} card
 * @param {Number} index
 * @return {Function}
 */
export const removeProject = (card, index) => (dispatch, getState) => {
  const { projects } = getState().gameplay;
  const alteredProjects = [...projects];

  alteredProjects[index].accepts = acceptedProjectDropIds;
  alteredProjects[index].lastDroppedItem = null;

  dispatch({
    type: CHANGE_PROJECT_STATE,
    projects: alteredProjects,
  });
  dispatch({
    type: RETURN_CARD,
    card,
  });
};

/**
 * Fires when the user clicks the level up button on the project card
 * which appears When the project has enough stacked cards to level up
 *
 * @param {Number} index
 * @return {Function}
 */
export const levelUpProject = index => (dispatch, getState) => {
  const gameplay = { ...getState().gameplay };
  if (gameplay.globalStats.funds === 0) return alert('Not enough funds');

  const projects = [...gameplay.projects];
  const globalStats = { ...gameplay.globalStats };

  const { level, cards } = projects[index].lastDroppedItem;
  const newCardStats = getLevelValuesForCard(cards[0].metadata.id, level + 1);

  const play = checkIfCanPlayCard(newCardStats, globalStats);
  if (!play) return;

  projects[index].lastDroppedItem.level += 1;
  projects[index].lastDroppedItem.canLevelUp = false;

  globalStats.development -= projects[index].lastDroppedItem.level > 1 ? getLevelValuesForCard(
    parseInt(projects[index].lastDroppedItem.cards[0].metadata.id, 10),
    projects[index].lastDroppedItem.level,
  ) : projects[index].lastDroppedItem.cards[0].stats.cost.development;

  dispatch({ type: LEVEL_UP_CARD, payload: { projects, globalStats } });
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

  const play = checkIfCanPlayCard(item.card.stats, globalStats, locations[activeLocationIndex].lastDroppedItem);
  if (!play) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  let locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];
  const slotItem = locationSlots[index].lastDroppedItem;

  if (!slotItem) {
    let special;

    // handle special cards drop
    if (item.card.metadata.id === '23') {
      const minerEffect = handleCoffeeMinerEffect(item, locations, activeLocationIndex, globalStats);
      globalStats = minerEffect.globalStats;
      special = minerEffect.bonus;
    }

    // handle hacker unique special case
    if (item.card.metadata.id === '18') {
      globalStats.development += item.card.stats.bonus.development;
    }

    locations = updateLocationDropSlotItems(locationSlots, index, item, locations, activeLocationIndex, special);

    // On developer drop checks if a coffee miner was dropped in that location
    // If it was recalculate coffee miner effect
    if (item.card.stats.type === 'Development') {
      // TODO export this to func
      const coffeeMinerIndex = locationSlots.findIndex(({ lastDroppedItem }) =>
        lastDroppedItem && lastDroppedItem.cards[0].metadata.id === '23');

      if (coffeeMinerIndex !== -1) {
        locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];

        const coffeeMiner = locationSlots[coffeeMinerIndex].lastDroppedItem;
        const coffeeMinerItem = { card: coffeeMiner.cards[0] };
        globalStats.development -= coffeeMiner.special;

        const minerEffect = handleCoffeeMinerEffect(coffeeMinerItem, locations, activeLocationIndex, globalStats);
        globalStats = minerEffect.globalStats;
        const coffeeSpecial = minerEffect.bonus;

        locations = updateLocationDropSlotItems(locationSlots, coffeeMinerIndex, coffeeMinerItem, locations, activeLocationIndex, coffeeSpecial); // eslint-disable-line
      }
    }
  } else {
    // TODO put in separate function
    // handle asset level up here
    const { lastDroppedItem } = locations[activeLocationIndex].lastDroppedItem.dropSlots[index];
    const { level, cards } = lastDroppedItem;

    const nextLevelPercent = calcDataForNextLevel(cards.length + 1, level).percent;

    if (nextLevelPercent === 100) {
      locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.canLevelUp = true;
      // // disable drop when level up is available
      locations[activeLocationIndex].lastDroppedItem.dropSlots[index].accepts = [];
    }

    locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards.push({ ...item.card });
  }

  const mathRes = handleCardMathematics(item.card, locations, globalStats, activeLocationIndex);
  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

  dispatch({
    type: DROP_ASSET,
    locations,
    cards,
    globalStats,
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
export const loadGameplayState = () => (dispatch, getState) => {
  const { account } = getState().app;

  if (!account) return;

  const payload = JSON.parse(localStorage.getItem(`player-location-${account}`));

  if (!payload) return;

  dispatch({ type: LOAD_STATE_FROM_STORAGE, payload });
};

/**
 * Fires when the user clicks the level up button on the location card
 * which appears when the location has enough stacked cards to level up
 *
 * @param {Number} index
 * @return {Function}
 */
export const levelUpLocation = index => (dispatch, getState) => {
  const gameplay = { ...getState().gameplay };

  let locations = [...gameplay.locations];
  let globalStats = { ...gameplay.globalStats };

  const { level, cards } = locations[index].lastDroppedItem;
  const newCardStats = getLevelValuesForCard(cards[0].metadata.id, level + 1);

  const play = checkIfCanPlayCard(newCardStats, globalStats);
  if (!play) return;

  locations[index].lastDroppedItem.cards[0].stats = { ...cards[0].stats, ...newCardStats };

  locations[index].lastDroppedItem.level += 1;
  locations[index].lastDroppedItem.canLevelUp = false;
  locations[index].accepts = [cards[0].metadata.id];

  const mathRes =
    handleCardMathematics(locations[index].lastDroppedItem.cards[0], locations, gameplay.globalStats, index);
  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

  dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
  saveGameplayState(getState);
};

/**
 * Fires when the user clicks the level up button on a miner card
 * which appears when the miner has enough stacked cards to level up
 *
 * @param {Number} locationIndex
 * @param {Number} containerIndex
 * @param {Number} cardIndex
 */
export const levelUpContainedCard = (locationIndex, containerIndex, cardIndex) => (dispatch, getState) => {
  const gameplay = { ...getState().gameplay };

  let locations = [...gameplay.locations];
  let globalStats = { ...gameplay.globalStats };

  const { lastDroppedItem } = locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem
    .dropSlots[cardIndex];
  const { level } = lastDroppedItem;
  const card = lastDroppedItem.cards[0];
  const newCardStats = getLevelValuesForCard(card.metadata.id, level + 1);

  const play = checkIfCanPlayCard(newCardStats, globalStats);
  if (!play) return;

  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .lastDroppedItem.cards[0].stats = { ...card.stats, ...newCardStats };
  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .lastDroppedItem.level += 1;
  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .lastDroppedItem.canLevelUp = false;
  locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex]
    .accepts = [card.metadata.id];

  const mathRes = handleCardMathematics(
    locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex].lastDroppedItem.cards[0], // eslint-disable-line
    locations,
    gameplay.globalStats,
    locationIndex,
  );
  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

  dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
  saveGameplayState(getState);
};

/**
 * Adds new drop slots to container drop slots based on bonus
 *
 * @param _locations
 * @param activeLocationIndex
 * @param index
 * @return {Array}
 */
export const addDropSlotsToContainer = (_locations, activeLocationIndex, index) => {
  const locations = [..._locations];
  const containerDropSlots = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.dropSlots;
  const card = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards[0];
  const newDropSlots = getSlotForContainer(card.metadata.id, card.stats.bonus.space);

  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.dropSlots =
    [...containerDropSlots, ...newDropSlots];

  return locations;
};

/**
 * Fires when the user clicks the level up button on the asset card
 * which appears When the location has enough stacked cards to level up
 *
 * @param {Number} activeLocationIndex
 * @param {Number} index
 * @return {Function}
 */
export const levelUpAsset = (activeLocationIndex, index) => (dispatch, getState) => {
  const gameplay = { ...getState().gameplay };

  let locations = [...gameplay.locations];
  let globalStats = { ...gameplay.globalStats };

  const card = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards[0];
  const { level } = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem;
  const newCardStats = getLevelValuesForCard(card.metadata.id, level + 1);

  const play = checkIfCanPlayCard(newCardStats, globalStats);
  if (!play) return;

  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards[0].stats =
    { ...card.stats, ...newCardStats };
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.level += 1;
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.canLevelUp = false;
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].accepts = [card.metadata.id];

  if (card.stats.type === 'Container') {
    locations = addDropSlotsToContainer(locations, activeLocationIndex, index);
  }

  const mathRes = handleCardMathematics(
    locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.cards[0],
    locations,
    gameplay.globalStats,
    activeLocationIndex,
  );

  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

  dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
  saveGameplayState(getState);
};

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
  locations = mathRes.locations;

  dispatch({
    type: DROP_MINER,
    locations,
    cards,
    globalStats,
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
  const { card } = item;
  const { app, gameplay } = getState();
  const { activeLocationIndex, activeContainerIndex, locations } = gameplay;
  let location;
  let cardSpecificNumber = 0;
  let containerCard;
  switch (slotType) {
    case 'location':
      location = index;
      break;
    case 'project':
      location = -1;
      cardSpecificNumber = index;
      break;
    case 'location_slot':
      location = gameplay.activeLocationIndex;
      break;
    case 'container_slot':
      location = gameplay.activeLocationIndex;
      containerCard = getCardAtContainer(locations, activeLocationIndex, activeContainerIndex);

      cardSpecificNumber = containerCard[0].metadata.id === '1' ? 1 : 0;
      break;
    default:
      break;
  }

  dispatch({
    type: PLAY_TURN,
    turn: {
      shift: addOrRemove ? 1 : 0,
      location,
      cardSpecificNumber,
      cardId: card.metadata.id,
      blockNumber: app.blockNumber,
    },
  });
};

export const handleCardCancel = (slot, locationIndex, containerIndex, containerSlotIndex) => (dispatch, getState) => {
  const { gameplay } = getState();
  const _locations = [...gameplay.locations];
  let { gameplayView } = gameplay;
  const item = { ...slot.lastDroppedItem };
  const returnedCards = [];
  let currentItem;
  let totalDev = 0;
  let totalPower = 0;
  if (item.dropSlots) {
    for (let i = 0; i < item.dropSlots.length; i += 1) {
      currentItem = item.dropSlots[i].lastDroppedItem;

      if (currentItem !== null && currentItem.dropSlots === null) {
        if (currentItem.cards[0].stats.type === 'Development') {
          totalDev += currentItem.cards[0].stats.bonus.development;
        }
        if (currentItem.cards[0].metadata.id === '23') {
          totalDev += currentItem.special;
        }
        returnedCards.push(currentItem.cards[0]);
      }
      if (currentItem !== null && (currentItem.dropSlots !== null && currentItem.dropSlots !== undefined)) {
        dispatch(handleCardCancel(item.dropSlots[i], locationIndex, i));
      }

      if (currentItem !== null && currentItem.dropSlots === undefined) {
        if (currentItem.cards[0].stats.type === 'Mining') {
          totalPower -= currentItem.cards[0].stats.cost.power;
        }
        returnedCards.push(currentItem.cards[0]);
      }
    }
  } else {
    if (item.cards[0].metadata.id === '23') {
      totalDev += item.special;
    }
    if (item.cards[0].stats.type === 'Development') {
      totalDev += item.cards[0].stats.bonus.development;
    }
  }

  if (totalDev > gameplay.globalStats.development) {
    return null;
  }

  if (locationIndex !== undefined && containerIndex !== undefined && containerSlotIndex !== undefined) {
    const { power } = item.cards[0].stats.cost;
    let accepts = [];
    const id = parseInt(_locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem.cards[0].metadata.id, 10);
    returnedCards.push(item.cards[0]);
    // Computer Case only accepts CPU and Graphics card
    if (id === 6) accepts = ['9', '10'];
    // Mining Rig only accepts Graphics card
    if (id === 7) accepts = ['10'];
    // ASIC Mount only accepts ASIC miner
    if (id === 8) accepts = ['11'];
    _locations[locationIndex].lastDroppedItem.values.power += power;
    _locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem
      .dropSlots[containerSlotIndex].accepts = accepts;
    _locations[locationIndex].lastDroppedItem
      .dropSlots[containerIndex].lastDroppedItem
      .dropSlots[containerSlotIndex].lastDroppedItem = null;
  } else if (locationIndex !== undefined && containerIndex !== undefined && containerSlotIndex === undefined) {
    let power = totalPower;
    const { space } = item.cards[0].stats.cost;
    if (item.cards[0].stats.bonus) power = item.cards[0].stats.bonus.power || 0;
    returnedCards.push(_locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.cards[0]);
    _locations[locationIndex].lastDroppedItem.values.space += space;
    // HANDLE ERROR HERE
    if (_locations[locationIndex].lastDroppedItem.values.power - power < 0) return;
    _locations[locationIndex].lastDroppedItem.values.power -= power;
    _locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].accepts = acceptedAssetDropIds;
    _locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem = null;
  } else if (locationIndex !== undefined && containerIndex === undefined) {
    returnedCards.push(_locations[locationIndex].lastDroppedItem.cards[0]);
    _locations[locationIndex].accepts = acceptedLocationDropIds;
    _locations[locationIndex].lastDroppedItem = null;
  }
  if (locationIndex === gameplay.activeLocationIndex && containerIndex === undefined) {
    gameplayView = GP_NO_LOCATIONS;
  }
  /* DO NOT REMOVE getState() */
  dispatch({
    type: REMOVE_CARD,
    locations: _locations,
    cards: [...getState().gameplay.cards, ...returnedCards],
    globalStats: {
      ...getState().gameplay.globalStats,
      development: getState().gameplay.globalStats.development - totalDev,
    },
    gameplayView,
  });

  if (item.cards[0].stats.type === 'Development') {
    // TODO export this to separate function
    const gameplay = { ...getState().gameplay };
    let locations = [...gameplay.locations];
    let globalStats = { ...gameplay.globalStats };

    // check if coffee miner was dropped and recalculate
    let locationSlots = [...locations[locationIndex].lastDroppedItem.dropSlots];

    const coffeeMinerIndex = locationSlots.findIndex(({ lastDroppedItem }) =>
      lastDroppedItem && lastDroppedItem.cards[0].metadata.id === '23');

    if (coffeeMinerIndex !== -1) {
      locationSlots = [..._locations[locationIndex].lastDroppedItem.dropSlots];

      const coffeeMiner = locationSlots[coffeeMinerIndex].lastDroppedItem;
      const coffeeMinerItem = { card: coffeeMiner.cards[0] };
      globalStats.development -= coffeeMiner.special;

      const minerEffect = handleCoffeeMinerEffect(coffeeMinerItem, locations, locationIndex, globalStats);

      ({ globalStats } = minerEffect);
      const coffeeSpecial = minerEffect.bonus;

      dispatch({ type: UPDATE_GLOBAL_VALUES, payload: globalStats });

      locations = updateLocationDropSlotItems(locationSlots, coffeeMinerIndex, coffeeMinerItem, locations, locationIndex, coffeeSpecial); // eslint-disable-line
      dispatch({ type: UPDATE_LOCATIONS, payload: locations });
    }
  }
};

/**
 * Fires when the nickname form is submitted
 *
 * @param {Object} data { nickname }
 */
export const submitNickname = ({ nickname }) => (dispatch) => {
  // Add call to the contract here

  dispatch({ type: SUBMIT_NICKNAME_SUCCESS, payload: nickname });
};

/**
 * Sends tx to contract to save current state
 */
export const saveStateToContract = () => () => {
  // Add call to the contract here
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
