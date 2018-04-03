import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '../CloseIcon/CloseIcon';
import { changeGameplayView, saveStateToContract } from '../../actions/gameplayActions';
import { GP_LOCATION_COLLECTION, GP_BUY_BOOSTER } from '../../actions/actionTypes';
import BlocksLoadingBar from '../BlocksLoadingBar/BlocksLoadingBar';

import './Menu.scss';

class Menu extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  render() {
    const {
      lastSavedStateBlock,
      changeGameplayView,
      saveStateToContract,
      currentBlock,
    } = this.props;

    let blocksLeftToSave = null;

    // 86400 is a ~ amount of blocks in 15 days
    if (lastSavedStateBlock) blocksLeftToSave = lastSavedStateBlock;

    return (
      <div className="menu-wrapper">
        <div className="actions-wrapper">
          <div className="save-button-wrapper">
            <button
              className="orange-button"
              onClick={saveStateToContract}
            >
              Save
            </button>

            {
              (lastSavedStateBlock !== 0) &&
              <BlocksLoadingBar currentBlock={currentBlock} width={65} blockNumber={blocksLeftToSave} />
            }
          </div>

          <div className="hamburger" onClick={() => this.setState({ open: true })}>
            <span>|||</span>
          </div>
        </div>

        <div
          className={`menu-inner-wrapper ${this.state.open ? 'open' : ''}`}
          onClick={() => this.setState({ open: false })}
        >
          <div
            className="menu"
            onClick={e => e.stopPropagation()}
          >
            <div className="close" onClick={() => this.setState({ open: false })}>
              <CloseIcon />
            </div>
            <div className="links">
              <a
                onClick={() => {
                  this.setState({ open: false });
                  changeGameplayView(GP_LOCATION_COLLECTION);
                }}
              >
                Collection
              </a>
              <a
                onClick={() => {
                  this.setState({ open: false });
                  changeGameplayView(GP_BUY_BOOSTER);
                }}
              >
                Shop
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  changeGameplayView: PropTypes.func.isRequired,
  saveStateToContract: PropTypes.func.isRequired,
  lastSavedStateBlock: PropTypes.number.isRequired,
  currentBlock: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  lastSavedStateBlock: gameplay.lastSavedStateBlock,
  currentBlock: app.blockNumber,
});

const mapDispatchToProps = {
  changeGameplayView, saveStateToContract,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
