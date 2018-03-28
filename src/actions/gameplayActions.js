import update from 'immutability-helper';
import {
  DROP_LOCATION,
  GP_LOCATION,
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
  LOCATION_DROP_SLOTS,
  ADD_ASSET_SLOTS,
  SWITCH_IN_GAMEPLAY_VIEW,
} from './actionTypes';
import cardService from '../services/cardService';
import ethService from '../services/ethereumService';
import {
  checkIfCanPlayCard, getLevelValuesForCard, getSlotForContainer,
  handleCardMathematics,
} from '../services/gameMechanicsService';
import {
  saveGameplayState, updateLocationDropSlotItems, removePlayedCards,
  calcDataForNextLevel, updateContainerDropSlotItems,
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
 * Gets user cards from contract and crosschecks
 * if any of those cards were played
 *
 * @return {Function}
 */
export const usersCardsFetch = () => async (dispatch, getState) => {
  dispatch({ type: USERS_CARDS_FETCH });
  try {
    const cardsIDs = await ethService.getUsersCards();
    const cards = await cardService.fetchCardsMeta(cardsIDs);

    dispatch({ type: USERS_CARDS_SUCCESS, cards: removePlayedCards(cards, getState) });
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

  if (emptyLocations.length !== 0) return;

  locations = [...locations, ...LOCATION_DROP_SLOTS];
  dispatch({ type: ADD_LOCATION_SLOTS, payload: locations });
};

/**
 * Checks if the active locations slots are full, if they are,
 * adds 6 new ones
 *
 * @param {Number} locationIndex
 * @return {Function}
 */
export const addAssetSlots = locationIndex => (dispatch, getState) => {
  let locations = [...getState().gameplay.locations];
  const currentSlots = locations[locationIndex].lastDroppedItem.dropSlots;
  const emptyLocations = currentSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null);

  if (emptyLocations.length !== 0) return;

  locations = update(locations, {
    [locationIndex]: {
      lastDroppedItem: {
        dropSlots: { $set: [...currentSlots, ...LOCATION_ITEM_DROP_SLOTS] },
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
        accepts: { $set: [item.card.metadata.id] },
        lastDroppedItem: {
          $set: {
            level: 1,
            canLevelUp: false,
            values: item.card.stats.values,
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
      accepts: [item.card.metadata.id],
      lastDroppedItem: {
        level: 1,
        canLevelUp: false,
        values: item.card.stats.values,
        cards: [{ ...item.card, index }],
        isActive: true,
        isFinished: false,
        expiryTime: app.blockNumber + item.card.stats.cost.time,
      },
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
  const { lastDroppedItem } = alteredProjects[index];
  const cost = lastDroppedItem.level > 1 ? getLevelValuesForCard(
    parseInt(item.card.metadata.id, 10),
    lastDroppedItem.level,
  ) : lastDroppedItem.cards[0].stats.cost.dev;
  const alterGlobalStats = {
    ...globalStats,
    development: globalStats.development - cost,
  };
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
 * @param {Number} index
 * @return {Function}
 */
export const activateProject = index => (dispatch, getState) => {
  const { blockNumber } = getState().app;
  const { projects } = getState().gameplay;
  const alteredProjects = [...projects];
  alteredProjects[index].lastDroppedItem.isFinished = false;
  alteredProjects[index].lastDroppedItem.isActive = true;
  alteredProjects[index].lastDroppedItem.expiryTime = blockNumber +
    alteredProjects[index].lastDroppedItem.cards[0].stats.cost.time;

  dispatch({
    type: CHANGE_PROJECT_STATE,
    projects: alteredProjects,
  });
  saveGameplayState(getState);
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
  ) : projects[index].lastDroppedItem.cards[0].stats.cost.dev;

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

  const locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];
  const slotItem = locationSlots[index].lastDroppedItem;

  if (!slotItem) {
    locations = updateLocationDropSlotItems(locationSlots, index, item, locations, activeLocationIndex);
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

  const mathRes = handleCardMathematics(item.card, locations, gameplay.globalStats, activeLocationIndex);
  locations = mathRes.locations;
  globalStats = mathRes.globalStats;

  dispatch({
    type: DROP_ASSET,
    locations,
    cards,
    globalStats,
  });
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

  const play = checkIfCanPlayCard(item.card.stats, gameplay.globalStats, locations[locationIndex].lastDroppedItem);
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
