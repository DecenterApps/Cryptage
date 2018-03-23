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
          <span className="bar-wrapper"><OpenLocationHeaderBar /></span>
          <div className="location-name">{ card.stats.title }</div>
          <span className="shape-left"><OpenLocationHeaderTiltedShape /></span>
          <span className="shape-right"><OpenLocationHeaderTiltedShape /></span>

          <div className="background-drop" />

          <div className="meta-wrapper space">
            <span>Space</span>
            - { `${space} / ${maxSpace}` }
          </div>

          <div className="meta-wrapper power">
            <span>Power</span>
            - { `${power} / ${maxPower}` }
          </div>

          <svg className="values-progress-bar space" viewBox="0 0 225 12">
            <polygon
              x="0"
              y="0"
              points={`12,12 0,0 ${Math.floor(2.13 * spacePercent)},0 ${Math.floor((12 + (2.13 * spacePercent)))},12`}
              className="progress-bar"
            />
          </svg>

          <svg className="values-progress-bar power" viewBox="0 0 225 12">
            <polygon
              x="0"
              y="0"
              points={`12,12 0,0 ${Math.floor(2.13 * powerPercent)},0 ${Math.floor((12 + (2.13 * powerPercent)))},12`}
              className="progress-bar"
            />
          </svg>
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
