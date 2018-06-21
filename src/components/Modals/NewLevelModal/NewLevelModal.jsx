import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalHeader from '../ModalHeader';
import ModalBody from '../ModalBody';
import HeaderBar from '../../HeaderBar/HeaderBar';
import RevealCards from '../../Gameplay/RevealCards/RevealCards';
import { toggleTutorial } from '../../../actions/appActions';

import './NewLevelModal.scss';
import SmallButton from '../../SmallButton/SmallButton';

const NewLevelModal = ({
  closeModal, level, cards, toggleTutorial,
}) => (
  <div className="new-level-modal-wrapper">

    <div className="modal-bar" />
    <ModalBody>
      {
        level === 1 &&
        <div className="main-text">
          <div className="level">Welcome!</div>
          <div className="secondary">Here are some free cards to get you started (click to reveal)</div>
        </div>
      }
      {
        level > 1 &&
        <div className="main-text">
          <div className="congratulation">congratulations!</div>
          <div className="secondary">You&apos;ve reached</div>
          <div className="level">Level { level }</div>
        </div>
      }

      <RevealCards cards={cards} />
    </ModalBody>
    <div className="modal-bar" />

    <div className="button-wrapper">
      <div className="modal-buttons-bar" />

      <span onClick={() => { closeModal(); toggleTutorial(); }}>
        <SmallButton text="Done" />
      </span>
    </div>
  </div>
);

NewLevelModal.defaultProps = {
};

NewLevelModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  toggleTutorial: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
};

export default connect(null, { toggleTutorial })(NewLevelModal);
