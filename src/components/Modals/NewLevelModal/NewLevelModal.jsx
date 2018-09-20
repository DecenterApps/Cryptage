import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalBody from '../ModalBody';
import RevealCards from '../../Gameplay/RevealCards/RevealCards';
import { getPagesForTutorial, toggleTutorial } from '../../../actions/tutorialsActions';
import SmallButton from '../../SmallButton/SmallButton';

import './NewLevelModal.scss';

const NewLevelModal = ({
  closeModal, level, cards, toggleTutorial, getPagesForTutorial,
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

      <span
        onClick={() => {
            closeModal();
            if (getPagesForTutorial()) toggleTutorial();
          }
        }
      >
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
  getPagesForTutorial: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  cards: PropTypes.array.isRequired,
};

export default connect(null, { toggleTutorial, getPagesForTutorial })(NewLevelModal);
