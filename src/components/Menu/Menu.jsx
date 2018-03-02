import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Menu.scss';

const Menu = ({ gameplayView, changeGameplayView }) => (
  <div className="menu-wrapper">
    <div className="buy-booster-wrapper">
      <button
        disabled={gameplayView === GP_BUY_BOOSTER}
        onClick={() => { changeGameplayView(GP_BUY_BOOSTER); }}
      >
        Store
      </button>

      <div className="separator" />

      <div className="stats-wrapper">
        <div>Coins: 0</div>
        <div>Development: 0</div>
        <div>Security: 0</div>
        <div>Influence: 0</div>
        <div>Hashrate: 0</div>
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
