import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleLocationDrop, changeGameplayView } from '../../actions/gameplayActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';
import { GP_BUY_BOOSTER } from '../../actions/actionTypes';

import './Locations.scss';

const Locations = ({ locations, handleLocationDrop, gameplayView, changeGameplayView }) => (
  <div className="locations-wrapper">
    <div className="buy-boosters-wrapper">
      <button
        disabled={gameplayView === GP_BUY_BOOSTER}
        onClick={() => { changeGameplayView(GP_BUY_BOOSTER); }}
      >
        Buy boosters
      </button>
    </div>

    <div className="locations-header">
      <div className="bar-wrapper">
        <div className="bar-1" />
        <div className="bar-2" />
        <div className="bar-3" />
        <div className="bar-4" />
        <div className="bar-text">Location</div>
      </div>
    </div>

    <div className="active-locations-wrapper">
      <DropSlotsWrapper
        dropSlots={locations}
        onItemDrop={handleLocationDrop}
        element={<LocationSidebarItem />}
        emptyStateElem={() => (<div className="empty-loc-slot">Drop Location here</div>)}
        mainClass="location-slots-wrapper"
      />
    </div>
  </div>
);

Locations.propTypes = {
  locations: PropTypes.array.isRequired,
  handleLocationDrop: PropTypes.func.isRequired,
  changeGameplayView: PropTypes.func.isRequired,
  gameplayView: PropTypes.string.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
});

const mapDispatchToProp = {
  handleLocationDrop,
  changeGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
