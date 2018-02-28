import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HandCard from '../../Cards/HandCard/HandCard';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import { handleAssetDrop } from '../../../actions/locationActions';

import './ActiveLocation.scss';

const ActiveLocation = ({ location, handleAssetDrop }) => (
  <div className="active-location-wrapper">
    <div className="active-location-header">
      <div className="location-stats-label">Location stats:</div>
      <div className="location-stats-wrapper">
        <span>Id: { location.id }</span>
        <span>Space: 0</span>
        <span>Prestige: 0</span>
      </div>
    </div>

    <div className="active-location-field">
      <DropSlotsWrapper
        dropSlots={location.dropSlots}
        onItemDrop={handleAssetDrop}
        element={<HandCard />}
      />
    </div>
  </div>
);

ActiveLocation.propTypes = {
  location: PropTypes.object.isRequired,
  handleAssetDrop: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleAssetDrop,
};

export default connect(null, mapDispatchToProps)(ActiveLocation);
