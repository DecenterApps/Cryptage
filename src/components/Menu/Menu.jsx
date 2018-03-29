import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_LOCATION_COLLECTION } from '../../actions/actionTypes';

import './Menu.scss';

const Menu = ({ gameplayView, changeGameplayView }) => (
  <div className="menu-wrapper">
    <div className="hamburger">
      <span>|||</span>
      <div className="menu">
        <a onClick={() => changeGameplayView(GP_LOCATION_COLLECTION)}>Collection</a>
      </div>
    </div>
  </div>
);

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
