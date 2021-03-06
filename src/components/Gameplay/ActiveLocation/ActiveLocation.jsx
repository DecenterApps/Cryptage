import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameplayItem from '../../GameplayItem/GameplayItem';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import GameplayContainer from '../GameplayContainer/GameplayContainer';
import EmptyCardSlot from '../EmptyCardSlot/EmptyCardSlot';
import { getMaxValueForLocation } from '../../../services/gameMechanicsService';
import { handleAssetDrop } from '../../../actions/dropActions';
import { GP_LOCATION_CONTAINER, GP_LOCATION_MAIN } from '../../../actions/actionTypes';

import './ActiveLocation.scss';

const ActiveLocation = ({
  locations,
  activeLocationIndex,
  activeContainerIndex,
  handleAssetDrop,
  inGameplayView,
}) => {
  const location = locations[activeLocationIndex];
  const { card } = location;
  const { space, power } = card;
  const maxSpace = getMaxValueForLocation(card, 'space');
  let maxPower = getMaxValueForLocation(card, 'power');

  const powerCards = location.card.dropSlots.filter(({ card }) => (
    card && card.type === 'Power'
  )).map(({ card }) => card);

  // recalculate max power for location if power cards were played
  if (powerCards.length > 0) powerCards.forEach((card) => { maxPower += card.bonus.power; });

  const spacePercent = Math.floor((space / maxSpace) * 100) || 0;
  const powerPercent = Math.floor((power / maxPower) * 100) || 0;

  return (
    <div className="active-location-wrapper">
      <div className="active-location-content">

        <div className="active-location-header">
          <div className="title-and-bars-wrapper">
            <div className="bar-wrapper left">
              <div className="bar-label left">
                <span>Space</span>{`${space} / ${maxSpace}`}
              </div>
              <div className="bar left background" />
              <div className="bar left" style={{ width: `${spacePercent}%` }} />
            </div>
            <div className="location-name">{card.title}</div>
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
                  location.card.dropSlots[activeContainerIndex].card.image
                  : card.image
                })`,
            }}
          />
        </div>

        <div
          className={`active-location-field location ${inGameplayView === GP_LOCATION_MAIN ? 'shown' : 'hidden'}`}
        >
          <DropSlotsWrapper
            dropSlots={location.card.dropSlots}
            onItemDrop={handleAssetDrop}
            element={<GameplayItem />}
            emptyStateElem={<EmptyCardSlot acceptedType="asset" />}
            mainClass="active-location-slot-wrapper"
          />
        </div>

        <div
          className={`active-location-field container ${inGameplayView === GP_LOCATION_CONTAINER ? 'shown' : 'hidden'}`}
        >
          {
            inGameplayView === GP_LOCATION_CONTAINER &&
            <GameplayContainer />
          }
        </div>
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
  locations: [...gameplay.locationSlots],
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
  inGameplayView: gameplay.inGameplayView,
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveLocation);
