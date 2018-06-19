import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import { canCancelCard, handleCardCancel, removeProject } from '../../../actions/removeCardActions';

import './ConfirmRemoveModal.scss';
import SmallButton from '../../SmallButton/SmallButton';

const ConfirmRemoveModal = ({
  slot, locationIndex, containerIndex, containerSlotIndex, handleCardCancel, closeModal, canCancelCard,
  projectCard, projectIndex, removeProject,
}) => {
  let canCancel = true;

  let onClose = () => { handleCardCancel(slot, locationIndex, containerIndex, containerSlotIndex); };

  if (projectCard) onClose = () => { removeProject(projectCard, projectIndex); };
  else canCancel = canCancelCard(slot, locationIndex);

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
