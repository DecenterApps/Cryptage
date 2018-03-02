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
      Active locations
    </div>

    <div className="active-locations-wrapper">
      { locations.length === 0 && <div className="no-locations">You do not have any active locations.</div> }

      <DropSlotsWrapper
        dropSlots={locations}
        onItemDrop={handleLocationDrop}
        element={<LocationSidebarItem />}
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
