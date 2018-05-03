import {
  DROP_LOCATION,
  DROP_ASSET,
  DROP_MINER,
  DROP_PROJECT,
  bonusDevPerLocationCards,
  timeReduceIds,
} from './actionTypes';
import {
  saveGameplayState,
  updateLocationsDropSlots,
  updateLocationDropSlotItems,
  updateContainerDropSlotItems,
  updateProjectsDropSlots,
} from '../services/utils';
import {
  checkIfCanPlayCard,
  calcLocationPerDevBonus,
  handleBonusDevMechanics,
  handleCardMathematics,
  getLevelCardBonusStatDiff,
  updateProjectModifiedFunds,
} from '../services/gameMechanicsService';
import { levelUpLocation, levelUpAsset, levelUpMiner, levelUpProject } from './levelUpActions';
import {
  addOrReduceFromFundsPerBlock,
  addAssetSlots,
  assetReduceTimeForProjects,
  projectReduceTimeForProjects,
} from './gameplayActions';

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

  // special cards that need their development to be added to globalStats
  if (metaDataId === '18' || metaDataId === '16' || metaDataId === '39') {
    globalStats.development += getLevelCardBonusStatDiff(mainCard, 'development');
  }

  const fundsPerBlock = addOrReduceFromFundsPerBlock(gameplay.fundsPerBlock, mainCard, true);

  dispatch({
    type: DROP_ASSET, locations, cards, globalStats, fundsPerBlock,
  });
  dispatch(addAssetSlots(activeLocationIndex));

  if (metaDataId === '41' || metaDataId === '42') dispatch(updateProjectModifiedFunds());

  if (timeReduceIds.includes(metaDataId)) {
    dispatch(assetReduceTimeForProjects(locations, activeLocationIndex, index, item.card));
  }

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

  if (!checkIfCanPlayCard(item.card.stats, gameplay.globalStats, locationItem, true)) return;

  const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
  cards.splice(draggedCardIndex, 1);

  if (!slotItem) {
    locations = updateContainerDropSlotItems(locationIndex, containerIndex, cardIndex, item, containerSlots, locations);
  } else {
    locations = levelUpMiner(locations, locationIndex, containerIndex, cardIndex, item.card);
  }

  const { mainCard } = locations[locationIndex].lastDroppedItem.dropSlots[containerIndex].lastDroppedItem.dropSlots[cardIndex].lastDroppedItem; // eslint-disable-line
  const mathRes = handleCardMathematics(mainCard, locations, gameplay.globalStats, locationIndex);
  const { globalStats } = mathRes;
  ({ locations } = mathRes);

  const fundsPerBlock = addOrReduceFromFundsPerBlock(gameplay.fundsPerBlock, mainCard, true);

  dispatch({
    type: DROP_MINER, locations, cards, globalStats, fundsPerBlock,
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
    globalStats.development += item.card.stats.cost.development; // disables global development cost for project level up
  }

  const { mainCard } = projects[index].lastDroppedItem;
  ({ globalStats } = handleCardMathematics(mainCard, [], globalStats, index));

  dispatch({ type: DROP_PROJECT, projects, cards, globalStats }); // eslint-disable-line

  if (mainCard.metadata.id === '24' || mainCard.metadata.id === '37') dispatch(updateProjectModifiedFunds());

  if (timeReduceIds.includes(mainCard.metadata.id)) {
    dispatch(projectReduceTimeForProjects(projects, index, item.card));
  }

  saveGameplayState(getState);
};
