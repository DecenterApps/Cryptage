import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import RevealCards from '../../Gameplay/RevealCards/RevealCards';
import HeaderBar from '../../HeaderBar/HeaderBar';
import { clearRevealedCards } from '../../../actions/removeCardActions';

import './RevealBoosterCardsModal.scss';

const RevealBoosterCardsModal = ({ closeModal, cards, clearRevealedCards }) => {
  const close = () => {
    clearRevealedCards();
    closeModal();
  };

  return (
    <div className="reveal-booster-cards-wrapper">
      <ModalHeader closeModal={close} />
      <HeaderBar
        title="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        color="#FF9D14"
        fontSize="13px"
      />
      <h4>Open</h4>
      <h3>Card pack</h3>

      <ModalBody>
        <RevealCards cards={cards} />
      </ModalBody>

      <div className="button-wrapper">
        <button
          className="orange-button"
          onClick={closeModal}
        >
          Done
        </button>
      </div>
    </div>
  );
};

RevealBoosterCardsModal.defaultProps = {
};

RevealBoosterCardsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  clearRevealedCards: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  clearRevealedCards,
};

export default connect(null, mapDispatchToProps)(RevealBoosterCardsModal);
