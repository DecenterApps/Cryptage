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
  updateLocationDropSlotItems,
  updateContainerDropSlotItems,
  updateProjectsDropSlots,
} from '../services/utils';
import {
  checkIfCanPlayCard,
  handleBonusDevMechanics,
  handleCardMathematics,
  getLevelCardBonusStatDiff,
  updateProjectModifiedFunds,
  calcTinkererPerLocationBonus,
} from '../services/gameMechanicsService';
import { levelUpAsset, levelUpMiner, levelUpProject } from './levelUpActions';
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
 * @param {CardSlot} slot
 * @param {Object} item
 * @param {Number} index
 */
export const handleLocationDrop = (slot, item, index) => (dispatch, getState) => {
  const newGameplay = slot.dropCard(getState().gameplay, item.card);

  dispatch({ type: DROP_LOCATION, payload: { newGameplay, index } });
  saveGameplayState(getState);
};


/**
 * Fires when the player drags a card from his hand
 * to a empty location asset deck slot
 *
 * @param {CardSlot} slot
 * @param {Object} item
 */
export const handleAssetDrop = (slot, item) => (dispatch, getState) => {
  const payload = slot.dropCard(getState().gameplay, item.card);

  dispatch({ type: DROP_ASSET, payload });
  saveGameplayState(getState);
};
// export const handleAssetDrop = (index, item) => (dispatch, getState) => {
//   const { gameplay } = getState();
//   const { activeLocationIndex } = gameplay;
//
//   const cards = [...gameplay.cards];
//   let locations = [...gameplay.locations];
//   let globalStats = { ...gameplay.globalStats };
//   const metaDataId = item.card.metadataId;
//
//   if (!checkIfCanPlayCard(item.card, globalStats, locations[activeLocationIndex].lastDroppedItem)) return;
//
//   const draggedCardIndex = cards.findIndex(card => parseInt(card.id, 10) === parseInt(item.card.id, 10));
//   cards.splice(draggedCardIndex, 1);
//
//   const locationSlots = [...locations[activeLocationIndex].lastDroppedItem.dropSlots];
//   const slotItem = locationSlots[index].lastDroppedItem;
//
//   if (!slotItem) {
//     locations = updateLocationDropSlotItems(locationSlots, index, item, locations, activeLocationIndex, 0);
//   } else {
//     // handle asset level up here
//     locations = levelUpAsset(locations, activeLocationIndex, index, item.card);
//   }
//
//   // On developer drop recalculates location per dev bonus
//   // if cards that have that effect were dropped
//   if (bonusDevPerLocationCards.includes(metaDataId) || item.card.stats.type === 'Person') {
//     ({ globalStats, locations } = handleBonusDevMechanics(locations, activeLocationIndex, globalStats));
//   }
//
//   const { mainCard } = locations[activeLocationIndex].lastDroppedItem.dropSlots[index].lastDroppedItem;
//   const mathRes = handleCardMathematics(mainCard, locations, globalStats, activeLocationIndex);
//
//   ({ locations, globalStats } = mathRes);
//
//   // special cards that need their development to be added to globalStats
//   if (metaDataId === '18' || metaDataId === '16' || metaDataId === '39' || metaDataId === '44') {
//     globalStats.development += getLevelCardBonusStatDiff(mainCard, 'development');
//   }
//
//   let fundsPerBlock = addOrReduceFromFundsPerBlock(gameplay.fundsPerBlock, mainCard, true);
//
//   if (metaDataId === '43') {
//     fundsPerBlock += locations[activeLocationIndex].lastDroppedItem.values.space * mainCard.stats.bonus.multiplierFunds;
//   }
//
//   if (metaDataId === '44') {
//     fundsPerBlock += calcTinkererPerLocationBonus(locations, activeLocationIndex, mainCard);
//   }
//
//   dispatch({
//     type: DROP_ASSET, locations, cards, globalStats, fundsPerBlock,
//   });
//   dispatch(addAssetSlots(activeLocationIndex));
//
//   if (metaDataId === '41' || metaDataId === '42') dispatch(updateProjectModifiedFunds());
//
//   if (timeReduceIds.includes(metaDataId)) {
//     dispatch(assetReduceTimeForProjects(locations, activeLocationIndex, index, item.card));
//   }
//
//   saveGameplayState(getState);
// };

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

  if (!checkIfCanPlayCard(item.card, globalStats)) return;
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
