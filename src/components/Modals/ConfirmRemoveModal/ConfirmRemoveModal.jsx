import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import { canCancelCard, handleCardCancel, removeProject } from '../../../actions/gameplayActions';

import './ConfirmRemoveModal.scss';

const ConfirmRemoveModal = ({
  slot, locationIndex, containerIndex, containerSlotIndex, handleCardCancel, closeModal, canCancelCard,
  projectCard, projectIndex, removeProject,
}) => {
  let canCancel = true;

  let onClose = () => { handleCardCancel(slot, locationIndex, containerIndex, containerSlotIndex); };

  if (projectCard) onClose = () => { removeProject(projectCard, projectIndex); };
  else canCancel = canCancelCard(slot, locationIndex, containerIndex);

  return (
    <div className="confirm-modal-wrapper">
      <ModalHeader closeModal={closeModal} />
      <ModalBody>
        <h3 className="title">Withdraw card?</h3>

        {
          !canCancel && [
            <div key="D" className="main-text">You can not currently withdraw this card from the game.</div>,
            <button key="E" className="orange-button" onClick={closeModal}>Close</button>,
          ]
        }

        {
          canCancel && [
            <div key="F" className="main-text">
              Withdrawing a card will not return spent funds. Are you sure you want to do this?
            </div>,

            <div key="G" className="buttons-wrapper">
              <button
                className="orange-button"
                onClick={closeModal}
              >
                No
              </button>
              <button
                className="orange-button"
                onClick={() => {
                  onClose();
                  closeModal();
                }}
              >
                Yes
              </button>
            </div>,
          ]
        }
      </ModalBody>
    </div>
  );
};

ConfirmRemoveModal.defaultProps = {
  slot: undefined,
  locationIndex: undefined,
  containerIndex: undefined,
  containerSlotIndex: undefined,
  projectCard: undefined,
  projectIndex: undefined,
};

ConfirmRemoveModal.propTypes = {
  slot: PropTypes.object,
  locationIndex: PropTypes.number,
  handleCardCancel: PropTypes.func.isRequired,
  canCancelCard: PropTypes.func.isRequired,
  removeProject: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  containerIndex: PropTypes.number,
  containerSlotIndex: PropTypes.number,
  projectCard: PropTypes.object,
  projectIndex: PropTypes.number,
};

const mapDispatchToProps = {
  handleCardCancel, canCancelCard, removeProject,
};

export default connect(null, mapDispatchToProps)(ConfirmRemoveModal);
