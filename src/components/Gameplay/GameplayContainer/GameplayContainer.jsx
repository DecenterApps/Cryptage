import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { switchInGameplayView } from '../../../actions/gameplayActions';
import { handleAssetDrop } from '../../../actions/dropActions';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import ContainerItem from '../../ContainerItem/ContainerItem';
import EmptyCardSlot from '../EmptyCardSlot/EmptyCardSlot';
import { GP_LOCATION_MAIN } from '../../../actions/actionTypes';
import SmallButton from '../../SmallButton/SmallButton';

import './GameplayContainer.scss';

const GameplayContainer = ({
  locations, activeLocationIndex, activeContainerIndex, handleAssetDrop, switchInGameplayView,
}) => {
  const activeLocation = locations[activeLocationIndex].card;
  const { card } = activeLocation.dropSlots[activeContainerIndex];
  const containerSlots = activeLocation.dropSlots[activeContainerIndex].card.dropSlots;
  const totalSlots = containerSlots.length;
  const fullSlots = containerSlots.filter(({ card }) => card).length;

  return (
    <div className="active-container-wrapper">
      <div
        className="background-drop"
        style={{
          backgroundImage: `url(cardImages/${card.image})`,
        }}
      />

      <h2 className="container-title">
        {card.title} <span>{fullSlots}/{totalSlots}</span>
      </h2>

      <DropSlotsWrapper
        dropSlots={containerSlots}
        onItemDrop={handleAssetDrop}
        element={<ContainerItem
          locationIndex={activeLocationIndex}
          containerIndex={activeContainerIndex}
        />}
        emptyStateElem={<EmptyCardSlot acceptedType="mining" />}
        mainClass="active-location-slot-wrapper"
      />

      <span onClick={() => { switchInGameplayView(activeContainerIndex, GP_LOCATION_MAIN); }}>
        <SmallButton text="Back" />
      </span>
    </div>
  );
};

GameplayContainer.propTypes = {
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  activeContainerIndex: PropTypes.number.isRequired,
  handleAssetDrop: PropTypes.func.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleAssetDrop, switchInGameplayView,
};

const mapStateToProps = ({ gameplay }) => ({
  locations: [...gameplay.locationSlots],
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameplayContainer);
