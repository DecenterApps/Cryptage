import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HandCard from '../../Cards/HandCard/HandCard';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import { handleAssetDrop } from '../../../actions/locationActions';

import './ActiveLocation.scss';

const ActiveLocation = ({ locations, activeLocationIndex }) => {
  const location = locations[activeLocationIndex];
  return (
    <div className="active-location-wrapper">
      <div className="active-location-header">
        <div className="location-stats-label">Location stats:</div>
        <div className="location-stats-wrapper">
          <span>Ids: { location.lastDroppedItem.cards.map(_card => _card.id).toString() }</span>
          <span>Space: 0</span>
          <span>Prestige: 0</span>
        </div>
      </div>

      <div className="active-location-field">
        <DropSlotsWrapper
          dropSlots={location.lastDroppedItem.dropSlots}
          onItemDrop={handleAssetDrop}
          element={<HandCard />}
        />
      </div>
    </div>
  );
};

ActiveLocation.propTypes = {
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  // handleAssetDrop: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleAssetDrop,
};

const mapStateToProps = ({ location }) => ({
  locations: location.locations,
  activeLocationIndex: location.activeLocationIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLocation);
