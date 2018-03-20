import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeGameplayView } from '../../actions/gameplayActions';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';
import { guid } from '../../services/utils';

import './Menu.scss';

import Projects from '../Projects/Projects';

const Menu = ({ gameplayView, changeGameplayView, blockNumber, globalStats }) => (
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
        Current block: {blockNumber}
      </div>

      <div className="separator" />

      <div className="stats-wrapper">
        {
          Object.keys(globalStats).map(globalStat => (
            <div key={guid()}>{globalStat}: {globalStats[globalStat]}</div>
          ))
        }
      </div>
      <Projects projects={[1, 2, 3]} />
    </div>
  </div>
);

Menu.propTypes = {
  blockNumber: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
  globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplayView: gameplay.gameplayView,
  blockNumber: app.blockNumber,
  globalStats: gameplay.globalStats,
});

const mapDispatchToProps = {
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
