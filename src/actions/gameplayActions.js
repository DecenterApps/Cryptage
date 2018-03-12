import update from 'immutability-helper';
import {
  DROP_LOCATION, GP_LOCATION, SET_ACTIVE_LOCATION, LOCATION_ITEM_DROP_SLOTS, USERS_CARDS_ERROR,
  DROP_ASSET, LOAD_STATE_FROM_STORAGE, USERS_CARDS_FETCH, USERS_CARDS_SUCCESS, CHANGE_GAMEPLAY_VIEW,
  LEVEL_UP_CARD,
} from './actionTypes';
import cardService from '../services/cardService';
import ethService from '../services/ethereumService';
import { getLevelValuesForCard } from '../services/gameMechanicsService';
import {
  saveGameplayState, updateLocationDropSlotItems, removePlayedCards,
  calcDataForNextLevel,
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
  const cards = [...gameplay.cards];
  const { level } = item.card.stats.cost;

  if (level !== gameplay.globalStats.level) return alert('Player level not high enough to play card');

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
    // handle level up here
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

  dispatch({
    type: DROP_LOCATION, activeLocationIndex: index, locations, cards,
  });
  dispatch(changeGameplayView(GP_LOCATION));
  saveGameplayState(getState);
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
  const { level } = item.card.stats.cost;

  if (level !== gameplay.globalStats.level) return alert('Player level not high enough to play card');

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

  dispatch({ type: DROP_ASSET, locations, cards });
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
 * which appears When the location has enough stacked cards to level up
 *
 * @param {Number} index
 * @return {Function}
 */
export const levelUpLocation = index => (dispatch, getState) => {
  const gameplay = { ...getState().gameplay };
  if (gameplay.globalStats.funds === 0) return alert('Not enough funds');

  const locations = [...gameplay.locations];
  const globalStats = { ...gameplay.globalStats };

  globalStats.funds -= 1;
  locations[index].lastDroppedItem.level += 1;
  locations[index].lastDroppedItem.canLevelUp = false;

  dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
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
  if (gameplay.globalStats.funds === 0) return alert('Not enough funds');

  const locations = [...gameplay.locations];
  const globalStats = { ...gameplay.globalStats };

  globalStats.funds -= 1;

  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.level += 1;
  locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem.canLevelUp = false;

  dispatch({ type: LEVEL_UP_CARD, payload: { locations, globalStats } });
};
