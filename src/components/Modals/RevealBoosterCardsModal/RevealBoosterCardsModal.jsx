import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SmallButton from '../../SmallButton/SmallButton';
import ModalBody from '../ModalBody';
import RevealCards from '../../Gameplay/RevealCards/RevealCards';
import { clearRevealedCards } from '../../../actions/removeCardActions';

import './RevealBoosterCardsModal.scss';

const RevealBoosterCardsModal = ({ closeModal, cards, clearRevealedCards }) => {
  const close = () => {
    clearRevealedCards();
    closeModal();
  };

  return (
    <div className="reveal-booster-cards-wrapper">
      <div className="modal-bar" />
      <ModalBody>
        <h4>Open</h4>
        <h3>Card pack</h3>
        <RevealCards cards={cards} />
      </ModalBody>
      <div className="modal-bar" />

      <div className="button-wrapper">
        <div className="modal-buttons-bar" />

        <span onClick={close}>
          <SmallButton text="Done" />
        </span>
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
