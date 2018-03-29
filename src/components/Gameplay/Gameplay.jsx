import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import Collection from './Collection/Collection';
import ActiveLocation from './ActiveLocation/ActiveLocation';
import GameplayHeader from './GameplayHeader/GameplayHeader';
import NoLocations from './NoLocations/NoLocations';
import {
  GP_BUY_BOOSTER,
  GP_LOCATION,
  GP_NO_LOCATIONS,
  GP_LOCATION_COLLECTION,
} from '../../actions/actionTypes';
import Cards from '../Cards/Cards';

import './Gameplay.scss';

const Gameplay = ({ gameplayView, locations }) => (
  <div className="gameplay-wrapper">
    <GameplayHeader />

    { locations.length === 0 && gameplayView === GP_NO_LOCATIONS && <NoLocations /> }
    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }
    { gameplayView === GP_LOCATION && <ActiveLocation />}
    { gameplayView === GP_LOCATION_COLLECTION && <Collection /> }

    {
      (gameplayView === GP_NO_LOCATIONS || gameplayView === GP_LOCATION) &&
      <Cards />
    }
  </div>
);

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplayView: gameplay.gameplayView,
  locations: gameplay.locations.filter(({ lastDroppedItem }) => lastDroppedItem !== null),
});

export default connect(mapStateToProps)(Gameplay);
