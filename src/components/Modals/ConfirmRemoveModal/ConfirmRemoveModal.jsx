import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import { canCancelCard, handleCardCancel } from '../../../actions/gameplayActions';

import './ConfirmRemoveModal.scss';

const ConfirmRemoveModal = ({
  slot, locationIndex, containerIndex, containerSlotIndex, handleCardCancel, closeModal, canCancelCard,
}) => {
  const canCancel = canCancelCard(slot, locationIndex, containerIndex, containerSlotIndex);

  console.log('canCancel', canCancel);

  return (
    <div className="confirm-modal-wrapper">
      <ModalHeader closeModal={closeModal} />
      <ModalBody>
        <h3 className="title">Withdraw card?</h3>

        {
          !canCancel && [
            <div key="D">You can not currently withdraw this card from the game.</div>,
            <button key="E" onClick={closeModal}>Close</button>
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
                  handleCardCancel(slot, locationIndex, containerIndex, containerSlotIndex);
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
  containerIndex: undefined,
  containerSlotIndex: undefined,
};

ConfirmRemoveModal.propTypes = {
  slot: PropTypes.object.isRequired,
  locationIndex: PropTypes.number.isRequired,
  handleCardCancel: PropTypes.func.isRequired,
  canCancelCard: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  containerIndex: PropTypes.number,
  containerSlotIndex: PropTypes.number,
};

const mapDispatchToProps = {
  handleCardCancel, canCancelCard,
};

export default connect(null, mapDispatchToProps)(ConfirmRemoveModal);
