import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameplayItem from '../../GameplayItem/GameplayItem';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import GameplayContainer from '../GameplayContainer/GameplayContainer';
import EmptyCardSlot from '../EmptyCardSlot/EmptyCardSlot';
import { getMaxValueForLocation } from '../../../services/gameMechanicsService';
import { handleAssetDrop } from '../../../actions/gameplayActions';

import './ActiveLocation.scss';
import { GP_LOCATION_CONTAINER, GP_LOCATION_MAIN } from '../../../actions/actionTypes';

const ActiveLocation = ({
  locations,
  activeLocationIndex,
  activeContainerIndex,
  handleAssetDrop,
  inGameplayView,
}) => {
  const location = locations[activeLocationIndex];
  const { space, power } = location.lastDroppedItem.values;
  const card = location.lastDroppedItem.mainCard;
  const maxSpace = getMaxValueForLocation(card, 'space');
  let maxPower = getMaxValueForLocation(card, 'power');

  const powerCards = location.lastDroppedItem.dropSlots.filter(({ lastDroppedItem }) => (
    lastDroppedItem && lastDroppedItem.mainCard.stats.type === 'Power'
  )).map(({ lastDroppedItem }) => lastDroppedItem.mainCard);

  // recalculate max power for location if power cards were played
  if (powerCards.length > 0) powerCards.forEach(({ stats }) => {
    maxPower += stats.bonus.power;
  });

  const spacePercent = Math.floor((space / maxSpace) * 100) || 0;
  const powerPercent = Math.floor((power / maxPower) * 100) || 0;

  return (
    <div className="active-location-wrapper">
      <div className="active-location-content">

        <div className="active-location-header">
          <div className="title-and-bars-wrapper">
            <div className="bar-wrapper">
              <div className="bar-label left">
                <span>Space</span>{`${space} / ${maxSpace}`}
              </div>
              <div className="bar left background" />
              <div className="bar left" style={{ width: `${spacePercent}%` }} />
            </div>
            <div className="location-name">{card.stats.title}</div>
            <div className="bar-wrapper">
              <div className="bar-label">
                <span>Power</span>{`${power} / ${maxPower}`}
              </div>
              <div className="bar background" />
              <div className="bar" style={{ width: `${powerPercent}%` }} />
            </div>
          </div>

          <div
            className="background-drop"
            style={{
              backgroundImage: `url(cardImages/${
                inGameplayView === GP_LOCATION_CONTAINER ?
                  location.lastDroppedItem.dropSlots[activeContainerIndex].lastDroppedItem.mainCard.stats.image
                  : card.stats.image
                })`,
            }}
          />
        </div>

        {
          inGameplayView === GP_LOCATION_MAIN &&
          <div className="active-location-field">
            <DropSlotsWrapper
              dropSlots={location.lastDroppedItem.dropSlots}
              onItemDrop={handleAssetDrop}
              element={<GameplayItem />}
              emptyStateElem={<EmptyCardSlot acceptedType="asset" />}
              mainClass="active-location-slot-wrapper"
            />
          </div>
        }

        {
          inGameplayView === GP_LOCATION_CONTAINER &&
          <div className="active-location-field"><GameplayContainer /></div>
        }
      </div>
    </div>
  );
};

ActiveLocation.propTypes = {
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  activeContainerIndex: PropTypes.number.isRequired,
  handleAssetDrop: PropTypes.func.isRequired,
  inGameplayView: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  handleAssetDrop,
};

const mapStateToProps = ({ gameplay }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
  inGameplayView: gameplay.inGameplayView,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLocation);
