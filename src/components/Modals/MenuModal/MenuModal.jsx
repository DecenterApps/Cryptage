import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ModalBody from '../ModalBody';
import SmallButton from '../../SmallButton/SmallButton';
import { GP_LOCATION_COLLECTION, GP_LEADERBOARD } from '../../../actions/actionTypes';
import { changeGameplayView } from '../../../actions/gameplayActions';
import { resetGame } from '../../../actions/appActions';
import ethService from '../../../services/ethereumService';

import './MenuModal.scss';

class MenuModal extends Component { 

constructor() {
 super();
 this.state = {
   showResetConfirmation: false
 };
 this.toggleResetConfirmation = this.toggleResetConfirmation.bind(this);
}

toggleResetConfirmation() {
  this.setState({ showResetConfirmation: !this.state.showResetConfirmation });
}
  
render() {
  const {
    closeModal, changeGameplayView, resetGame, toggleResetConfirmation
  } = this.props;

  return (
  <div className="menu-modal-wrapper">
    <div className="modal-bar" />
    <ModalBody>
      {
        !this.state.showResetConfirmation &&
        <div
        className="menu"
        >
          <div className="links">
            <a
              onClick={() => {
                changeGameplayView(GP_LOCATION_COLLECTION);
                closeModal();
              }}
            >
              My collection
            </a>
            <a
              onClick={() => {
                changeGameplayView(GP_LEADERBOARD);
                closeModal();
              }}
            >
              Leaderboard
            </a>
            <a
              onClick={this.toggleResetConfirmation}
            >
              Reset Game
            </a>
            <a className="coming-soon">
              <span>Coming soon</span>
              Marketplace
            </a>
            <a className="coming-soon">
              <span>Coming soon</span>
              Achievements
            </a>
          </div>
        </div>
      }
      {
        this.state.showResetConfirmation &&
        <div className="menu reset-confirmation">
          <span className="title">Are you sure?</span>
          <span className="description">This will delete your current progress.</span>
          <div className="links">
            <a onClick={resetGame}>Yes</a>
            <a onClick={this.toggleResetConfirmation}>No</a>
          </div>
        </div>
      }
    </ModalBody>
    <div className="modal-bar" />

    <div className="buttons-wrapper">
      <div className="modal-buttons-bar" />

      <span onClick={closeModal}><SmallButton text="Close" /></span>
    </div>
  </div>
  )}
}

MenuModal.defaultProps = {
};

MenuModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  changeGameplayView, resetGame,
};

export default connect(null, mapDispatchToProps)(MenuModal);

