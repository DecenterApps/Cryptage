import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameplayItem from '../../GameplayItem/GameplayItem';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import OpenLocationHeaderBar from './OpenLocationHeaderBar';
import OpenLocationHeaderTiltedShape from './OpenLocationHeaderTiltedShape';
import { getMaxValueForLocation } from '../../../services/gameMechanicsService';
import { handleAssetDrop } from '../../../actions/gameplayActions';

import './ActiveLocation.scss';

const ActiveLocation = ({ locations, activeLocationIndex, handleAssetDrop }) => {
  const location = locations[activeLocationIndex];
  const { space, power } = location.lastDroppedItem.values;
  const card = location.lastDroppedItem.cards[0];
  const maxSpace = getMaxValueForLocation(card.metadata.id, location.lastDroppedItem.level, 'space');
  const maxPower = getMaxValueForLocation(card.metadata.id, location.lastDroppedItem.level, 'power');

  const spacePercent = Math.floor((space / maxSpace) * 100);
  const powerPercent = Math.floor((power / maxPower) * 100);

  return (
    <div className="active-location-wrapper">
      <div className="active-location-content">

        <div className="active-location-header">
          <div className="title-and-bars-wrapper">
            <div className="bar-wrapper">
              <div className="bar-label left">
                <span>Space</span> - { `${space} / ${maxSpace}` }
              </div>
              <div className="bar left" />
            </div>
            <div className="location-name">{ card.stats.title }</div>
            <div className="bar-wrapper">
              <div className="bar-label">
                <span>Power</span> - { `${power} / ${maxPower}` }
              </div>
              <div className="bar" />
            </div>
          </div>

          <div className="background-drop" />
        </div>

        <div className="active-location-field">
          <DropSlotsWrapper
            dropSlots={location.lastDroppedItem.dropSlots}
            onItemDrop={handleAssetDrop}
            element={<GameplayItem />}
            emptyStateElem={() => (
              <div className="active-location-empty-slot">
                <div className="inner-empty-slot">Drop<b>Card</b>here</div>
              </div>
            )}
            mainClass="active-location-slot-wrapper"
          />
        </div>
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
