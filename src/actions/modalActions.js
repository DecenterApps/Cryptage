import { TOGGLE_MODAL } from './actionTypes';
import { CONFIRM_REMOVE_MODAL } from '../components/Modals/modalTypes';

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
    slot, locationIndex, containerIndex, containerSlotIndex, projectCard, projectIndex, width: '271px',
  };
  dispatch(toggleModal(CONFIRM_REMOVE_MODAL, props, true));
};
