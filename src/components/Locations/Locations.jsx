import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleLocationDrop } from '../../actions/gameplayActions';
import DropSlotsWrapper from '../DropSlotsWrapper/DropSlotsWrapper';
import LocationSidebarItem from '../LocationSidebarItem/LocationSidebarItem';

import './Locations.scss';

const Locations = ({ locations, handleLocationDrop }) => (
  <div className="locations-wrapper">
    <div className="locations-header">
      <div className="bar-wrapper">
        <div className="bar-1" />
        <div className="bar-2" />
        <div className="bar-3" />
        <div className="bar-4" />
        <div className="loc-text">Location</div>
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
};

const mapStateToProps = ({ gameplay }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
});

const mapDispatchToProp = {
  handleLocationDrop,
};

export default connect(mapStateToProps, mapDispatchToProp)(Locations);
