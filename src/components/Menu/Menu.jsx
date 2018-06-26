import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveStateToContract } from '../../actions/gameplayActions';

import './Menu.scss';
import FutureButton from '../FutureButton/FutureButton';
import { openMenuModal } from '../../actions/modalActions';

class Menu extends Component {
  render() {
    const {
      openMenuModal,
      saveStateToContract,
      isSaving,
    } = this.props;
    return (
      <div className="menu-wrapper">

        <div className="menu-buttons">
          <div className="save-button" onClick={saveStateToContract}>
            <FutureButton reverse text="Save" loading={isSaving} disabled={isSaving} />
          </div>

          <div className="menu-button" onClick={openMenuModal}>
            <FutureButton reverse text="Menu" loading={false} disabled={false} />
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  saveStateToContract: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  openMenuModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay, contractState }) => ({
  currentBlock: gameplay.blockNumber,
  isSaving: contractState.isSaving,
  saveError: contractState.saveError,
});

const mapDispatchToProps = {
  saveStateToContract, openMenuModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
