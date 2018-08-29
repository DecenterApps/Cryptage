import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BoostersMenu from './BoostersMenu/BoostersMenu';
import Collection from './Collection/Collection';
import ActiveLocation from './ActiveLocation/ActiveLocation';
import GameplayHeader from './GameplayHeader/GameplayHeader';
import NoLocations from './NoLocations/NoLocations';
import Leaderboard from './Leaderboard/Leaderboard';
import {
  GP_BUY_BOOSTER,
  GP_LOCATION,
  GP_NO_LOCATIONS,
  GP_LOCATION_COLLECTION,
  GP_LEADERBOARD,
} from '../../actions/actionTypes';
import Cards from '../Cards/Cards';

import './Gameplay.scss';

const Gameplay = ({ gameplayView, locationSlots }) => (
  <div className="gameplay-wrapper">
    <GameplayHeader />
    { locationSlots.length === 0 && gameplayView === GP_NO_LOCATIONS && <NoLocations /> }
    { gameplayView === GP_BUY_BOOSTER && <BoostersMenu /> }
    { gameplayView === GP_LOCATION && <ActiveLocation />}
    { gameplayView === GP_LOCATION_COLLECTION && <Collection /> }
    { gameplayView === GP_LEADERBOARD && <Leaderboard /> }

    {
      (gameplayView === GP_NO_LOCATIONS || gameplayView === GP_LOCATION) &&
      <Cards />
    }
  </div>
);

Gameplay.propTypes = {
  gameplayView: PropTypes.string.isRequired,
  locationSlots: PropTypes.array.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  gameplayView: gameplay.gameplayView,
  locationSlots: [...gameplay.locationSlots].filter(({ card }) => card !== undefined),
});

export default connect(mapStateToProps)(Gameplay);
