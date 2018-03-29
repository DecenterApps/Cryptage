import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CloseIcon from '../CloseIcon/CloseIcon';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_LOCATION_COLLECTION, GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Menu.scss';

class Menu extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  render() {
    const { gameplayView, changeGameplayView } = this.props;
    return (
      <div className="menu-wrapper">
        <div className="hamburger" onClick={() => this.setState({ open: true })}>
          <span>|||</span>
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
  gameplayView: PropTypes.string.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
