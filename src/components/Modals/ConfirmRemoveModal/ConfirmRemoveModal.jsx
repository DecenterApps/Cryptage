import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalBody from '../ModalBody';
import { canCancelCard, handleCardCancel } from '../../../actions/removeCardActions';

import './ConfirmRemoveModal.scss';
import SmallButton from '../../SmallButton/SmallButton';

const ConfirmRemoveModal = ({
  slot, locationIndex, containerIndex, containerSlotIndex, handleCardCancel, closeModal, canCancelCard,
}) => {
  const onClose = () => { handleCardCancel(slot, locationIndex, containerIndex, containerSlotIndex); };
  const canCancel = canCancelCard(slot);

  return (
    <div className="confirm-modal-wrapper">

      <div className="modal-bar" />
      <ModalBody>
        <h3 className="title">Withdraw card?</h3>

        {
          !canCancel &&
          <div className="main-text">You can&#39;t currently withdraw this card from the game.</div>
        }

        {
          canCancel &&
          <div className="main-text">
            Withdrawing a card will not return spent funds. Are you sure you want to do this?
          </div>
        }
      </ModalBody>
      <div className="modal-bar" />

      {
        !canCancel &&
        <div className="buttons-wrapper">
          <div className="modal-buttons-bar" />

          <span onClick={closeModal}><SmallButton text="Close" /></span>
        </div>
      }

      {
        canCancel &&
        <div className="buttons-wrapper">
          <div className="modal-buttons-bar" />

          <span onClick={() => { onClose(); closeModal(); }}>
            <SmallButton text="Yes" />
          </span>

          <span onClick={closeModal}>
            <SmallButton text="No" />
          </span>
        </div>
      }

    </div>
  );
};

ConfirmRemoveModal.defaultProps = {
  slot: undefined,
  locationIndex: undefined,
  containerIndex: undefined,
  containerSlotIndex: undefined,
};

ConfirmRemoveModal.propTypes = {
  slot: PropTypes.object,
  locationIndex: PropTypes.number,
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
