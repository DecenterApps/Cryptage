import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HandCard from '../../Cards/HandCard/HandCard';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';

import './ActiveLocation.scss';

const ActiveLocation = ({ location }) => (
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
        onItemDrop={() => { console.log('Drop'); }}
        element={<HandCard />}
      />
    </div>
  </div>
);

ActiveLocation.propTypes = {
  location: PropTypes.object.isRequired,
};

export default connect(null, null)(ActiveLocation);
