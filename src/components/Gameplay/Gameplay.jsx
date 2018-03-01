import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import ActiveLocation from './ActiveLocation/ActiveLocation';
import { GP_BUY_BOOSTER, GP_LOCATION } from '../../actions/actionTypes';

import './Gameplay.scss';

const Gameplay = ({ gameplayView, locations, activeLocationIndex }) => (
  <div className="gameplay-wrapper">
    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }

    { gameplayView === GP_LOCATION && <ActiveLocation />}
  </div>
);

Gameplay.defaultProps = {
  activeLocationIndex: null,
};

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number,
};

const mapStateToProps = ({ app, location }) => ({
  gameplayView: app.gameplayView,
  locations: location.locations,
  activeLocationIndex: location.activeLocationIndex,
});

export default connect(mapStateToProps)(Gameplay);
