import { TOGGLE_MODAL } from './actionTypes';
import {
  CONFIRM_REMOVE_MODAL,
  NEW_LEVEL_MODAL,
  REVEAL_BOOSTER_CARDS_MODAL,
  NO_RESTART_PROJECT_MODAL, ERROR_MODAL,
} from '../components/Modals/modalTypes';

/**
 * Dispatches action to toggle modal.
 *
 * @param {String} modalType
 * @param {Object} modalProps
 * @param {Boolean} action - to close or to open
 */
export const toggleModal = (modalType, modalProps, action) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { modalType, modalProps, action },
  });
};

/**
 * Closes the modal that is currently open
 */
export const closeModal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: { modalType: '', modalProps: {}, action: false },
  });
};

/**
 * Opens confirm remove modal when player wants to remove card
 */
export const openConfirmRemoveModal = (
  slot,
  locationIndex,
  containerIndex = undefined,
  containerSlotIndex = undefined,
  projectCard = undefined,
  projectIndex = undefined,
) => (dispatch) => {
  const props = {
    slot,
    locationIndex,
    containerIndex,
    containerSlotIndex,
    projectCard,
    projectIndex,
    width: '271px',
  };
  dispatch(toggleModal(CONFIRM_REMOVE_MODAL, props, true));
};

/**
 * Opens confirm remove modal when player wants to remove card
 *
 * @param {Number} level
 * @param {Object} cards
 */
export const openNewLevelModal = (level, cards) => (dispatch) => {
  dispatch(toggleModal(NEW_LEVEL_MODAL, { level, cards }, true));
};

/**
 * Opens the reveal new booster cards modal
 *
 * @param {Object} cards
 */
export const openRevealBoosterCardsModal = cards => (dispatch) => {
  dispatch(toggleModal(REVEAL_BOOSTER_CARDS_MODAL, { cards, className: 'reveal-modal' }, true));
};

/**
 * Opens the no restart project modal
 *
 * @param {Object} errors
 */
export const openNoRestartProjectModal = errors => (dispatch) => {
  dispatch(toggleModal(NO_RESTART_PROJECT_MODAL, { width: '271px', errors }, true));
};

/**
 * Opens a default error modal
 *
 * @param {String} title
 * @param {String} body
 */
export const openErrorModal = (title, body) => (dispatch) => {
  dispatch(toggleModal(ERROR_MODAL, {
    width: '271px',
    errors: { title, body },
  }, true));
};
