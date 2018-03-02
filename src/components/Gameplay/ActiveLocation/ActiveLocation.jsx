import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameplayItem from '../../GameplayItem/GameplayItem';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import { handleAssetDrop } from '../../../actions/gameplayActions';

import './ActiveLocation.scss';

const ActiveLocation = ({ locations, activeLocationIndex, handleAssetDrop }) => {
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
          element={<GameplayItem />}
        />
      </div>
    </div>
  );
};

ActiveLocation.propTypes = {
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  handleAssetDrop: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleAssetDrop,
};

const mapStateToProps = ({ gameplay }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLocation);
