import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { switchInGameplayView } from '../../../actions/gameplayActions';
import { handleMinerDropInContainer } from '../../../actions/dropActions';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import ContainerItem from '../../ContainerItem/ContainerItem';
import EmptyCardSlot from '../EmptyCardSlot/EmptyCardSlot';
import { GP_LOCATION_MAIN } from '../../../actions/actionTypes';
import SmallButton from '../../SmallButton/SmallButton';

import './GameplayContainer.scss';

const GameplayContainer = ({
  locations, activeLocationIndex, activeContainerIndex, handleMinerDropInContainer, switchInGameplayView,
}) => {
  const activeLocation = locations[activeLocationIndex].lastDroppedItem;
  const card = activeLocation.dropSlots[activeContainerIndex].lastDroppedItem.mainCard;
  const containerSlots = activeLocation.dropSlots[activeContainerIndex].lastDroppedItem.dropSlots;
  const totalSlots = containerSlots.length;
  const fullSlots = containerSlots.filter(({ lastDroppedItem }) => lastDroppedItem !== null).length;

  return (
    <div className="active-container-wrapper">
      <div
        className="background-drop"
        style={{
          backgroundImage: `url(cardImages/${card.stats.image})`,
        }}
      />

      <h2 className="container-title">
        {card.stats.title} <span>{fullSlots} / {totalSlots}</span>
      </h2>

      <DropSlotsWrapper
        dropSlots={containerSlots}
        onItemDrop={(minerIndex, item) => {
          handleMinerDropInContainer(activeLocationIndex, activeContainerIndex, minerIndex, item);
        }}
        element={<ContainerItem
          locationIndex={activeLocationIndex}
          containerIndex={activeContainerIndex}
        />}
        emptyStateElem={<EmptyCardSlot acceptedType="mining" />}
        mainClass="active-location-slot-wrapper"
      />

      <div>
        <div className="modal-buttons-bar" />
        <span onClick={() => { switchInGameplayView(activeContainerIndex, GP_LOCATION_MAIN); }}>
          <SmallButton text="Back" />
        </span>
      </div>
    </div>
  );
};

GameplayContainer.propTypes = {
  locations: PropTypes.array.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  activeContainerIndex: PropTypes.number.isRequired,
  handleMinerDropInContainer: PropTypes.func.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  handleMinerDropInContainer, switchInGameplayView,
};

const mapStateToProps = ({ gameplay }) => ({
  locations: gameplay.locations,
  activeLocationIndex: gameplay.activeLocationIndex,
  activeContainerIndex: gameplay.activeContainerIndex,
});

export default connect(mapStateToProps, mapDispatchToProps)(GameplayContainer);
