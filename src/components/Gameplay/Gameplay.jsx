import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import ActiveLocation from './ActiveLocation/ActiveLocation';
import { GP_BUY_BOOSTER, GP_LOCATION } from '../../actions/actionTypes';

import './Gameplay.scss';

const Gameplay = ({ gameplayView, activeLocation }) => (
  <div className="gameplay-wrapper">
    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }

    { gameplayView === GP_LOCATION && <ActiveLocation location={activeLocation} />}
  </div>
);

Gameplay.defaultProps = {
  activeLocation: {},
};

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
  activeLocation: PropTypes.object,
};

const mapStateToProps = ({ app, location }) => ({
  gameplayView: app.gameplayView,
  activeLocation: location.locations[location.activeLocationIndex],
});

export default connect(mapStateToProps)(Gameplay);
