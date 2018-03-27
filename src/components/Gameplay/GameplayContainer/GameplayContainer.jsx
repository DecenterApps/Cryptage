import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleMinerDropInContainer, switchInGameplayView } from '../../../actions/gameplayActions';
import DropSlotsWrapper from '../../DropSlotsWrapper/DropSlotsWrapper';
import ContainerItem from '../../ContainerItem/ContainerItem';
import EmptyCardSlot from '../EmptyCardSlot/EmptyCardSlot';
import HeaderBar from '../../HeaderBar/HeaderBar';
import CloseIcon from '../../CloseIcon/CloseIcon';
import HandCard from '../../Cards/HandCard/HandCard';

import './GameplayContainer.scss';
import { GP_LOCATION_MAIN } from '../../../actions/actionTypes';

const GameplayContainer = ({
  locations, activeLocationIndex, activeContainerIndex, handleMinerDropInContainer, switchInGameplayView,
}) => {
  const activeLocation = locations[activeLocationIndex].lastDroppedItem;
  const card = activeLocation.dropSlots[activeContainerIndex].lastDroppedItem.cards[0];
  const containerSlots = activeLocation.dropSlots[activeContainerIndex].lastDroppedItem.dropSlots;
  return (
    <div className="active-container-wrapper">
      <div
        onClick={() => { switchInGameplayView(activeContainerIndex, GP_LOCATION_MAIN); }}
      >
        <CloseIcon />
      </div>

      <div className="active-container-card-wrapper">
        <HandCard showCount={false} card={card} />
      </div>

      <div className="container-bottom-wrapper">
        <HeaderBar title={card.stats.title} color="#FFF" fontSize="12px" />

        <div className="container-slots">
          <DropSlotsWrapper
            dropSlots={containerSlots}
            onItemDrop={(minerIndex, item) => {
              handleMinerDropInContainer(activeLocationIndex, activeContainerIndex, minerIndex, item);
            }}
            element={<ContainerItem
              locationIndex={activeLocationIndex}
              containerIndex={activeContainerIndex}
            />}
            emptyStateElem={() => (<EmptyCardSlot />)}
            mainClass="active-location-slot-wrapper"
          />
        </div>
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
