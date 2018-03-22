import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import ActiveLocation from './ActiveLocation/ActiveLocation';
import GameplayHeader from './GameplayHeader/GameplayHeader';
import { GP_BUY_BOOSTER, GP_LOCATION } from '../../actions/actionTypes';

import './Gameplay.scss';

const Gameplay = ({ gameplayView }) => (
  <div className="gameplay-wrapper">
    <GameplayHeader/>

    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }
    { gameplayView === GP_LOCATION && <ActiveLocation />}
  </div>
);

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplayView: gameplay.gameplayView,
});

export default connect(mapStateToProps)(Gameplay);
