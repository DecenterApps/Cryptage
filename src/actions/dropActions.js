import { DROP_LOCATION, DROP_ASSET, UPGRADE_ASSET } from './actionTypes';

/**
 * Fires when the player drags a location card from his hand
 * to the location sidebar
 *
 * @param {CardSlot} slot
 * @param {Object} item
 * @param {Number} index
 */
export const handleLocationDrop = (slot, item, index) => (dispatch, getState) => {
  const { gameplay } = getState();

  if (!slot.canDrop(gameplay, item.card).allowed) return;

  const newGameplay = slot.dropCard(gameplay, item.card);

  dispatch({ type: DROP_LOCATION, payload: { newGameplay, index } });
};


/**
 * Fires when the player drags a card from his hand
 * to a empty location asset deck slot
 *
 * @param {CardSlot} slot
 * @param {Object} item
 */
export const handleAssetDrop = (slot, item) => (dispatch, getState) => {
  const { gameplay } = getState();

  if (!slot.canDrop(gameplay, item.card).allowed) return;

  const payload = slot.dropCard(gameplay, item.card);

  dispatch({ type: DROP_ASSET, payload });
};

/**
 * Handles card upgrade when the user clicks on the green button on the card
 *
 * @param slot
 * @return {Function}
 */
export const handleAssetUpgrade = slot => (dispatch, getState) => {
  const { gameplay } = getState();

  if (!slot.card.canLevelUp(gameplay).allowed) return;

  const payload = slot.card.levelUp(gameplay);

  dispatch({ type: UPGRADE_ASSET, payload });
};
