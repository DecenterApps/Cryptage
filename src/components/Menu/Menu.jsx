import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Menu.scss';

const Menu = ({ gameplayView, changeGameplayView, blockNumber }) => (
  <div className="menu-wrapper">
    <div className="buy-booster-wrapper">
      <button
        disabled={gameplayView === GP_BUY_BOOSTER}
        onClick={() => { changeGameplayView(GP_BUY_BOOSTER); }}
      >
        Store
      </button>

      <div className="separator" />

      <div className="block-number-wrapper">
        Current block: { blockNumber }
      </div>

      <div className="separator" />

      <div className="stats-wrapper">
        <div>Funds: 0</div>
        <div>Development: 0</div>
      </div>
    </div>
  </div>
);

Menu.propTypes = {
  blockNumber: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplayView: gameplay.gameplayView,
  blockNumber: app.blockNumber,
});

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
