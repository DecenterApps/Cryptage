import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/appActions';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Menu.scss';

const Menu = ({ changeGameplayView }) => (
  <div className="menu-wrapper">
    <div className="buy-booster-wrapper">
      <button onClick={() => { changeGameplayView(GP_BUY_BOOSTER); }}>
        Buy booster
      </button>
    </div>
  </div>
);

Menu.propTypes = {
  changeGameplayView: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(null, mapDispatchToProps)(Menu);
