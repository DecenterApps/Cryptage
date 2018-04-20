import React from 'react';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import HeaderBar from '../../HeaderBar/HeaderBar';
import RevealCards from '../../Gameplay/RevealCards/RevealCards';

import './NewLevelModal.scss';

const NewLevelModal = ({ closeModal, level, cards }) => (
  <div className="new-level-modal-wrapper">
    <ModalHeader closeModal={closeModal} />
    <HeaderBar title="          " color="#FFF" fontSize="12px" />
    <ModalBody>
      <div className="main-text">
        <div className="congratulation">congratulations!</div>
        <div className="level">Level { level }</div>
      </div>

      <RevealCards cards={cards} />

      <div className="button-wrapper">
        <button
          className="orange-button"
          onClick={closeModal}
        >
          Done
        </button>
      </div>
    </ModalBody>
  </div>
);

NewLevelModal.defaultProps = {
};

NewLevelModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
};

export default NewLevelModal;
