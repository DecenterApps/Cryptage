import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkIfCanPlayCard } from '../../../services/gameMechanicsService';

import './EmptyCardSlot.scss';

const EmptyCardSlot = ({
  card, globalStats, activeLocation, acceptedType, activeContainerIndex,
}) => {
  let canDrop = false;
  let goodCardType = false;

  if (card) {
    const { type } = card.stats;

    if (acceptedType === 'asset') goodCardType = type !== 'Location' && type !== 'Project' && type !== 'Mining';

    // for miners you need to check if the container drop slot accepts that certain miner
    if (acceptedType === 'mining') {
      const { accepts } = activeLocation.dropSlots[activeContainerIndex].lastDroppedItem.dropSlots[0];
      const goodSlotType = accepts.includes(card.metadata.id);

      goodCardType = goodSlotType && type === 'Mining';
    }

    if (goodCardType) canDrop = checkIfCanPlayCard(card.stats, globalStats, activeLocation, false);
  }

  return (
    <div
      className={`
        empty-slot-wrapper
        empty-asset-wrapper
        ${(card && goodCardType && canDrop) && 'can-drop'}
        ${(card && goodCardType && !canDrop) && 'no-drop'}
      `}
    >
      <div className="inner-empty-slot">
        {
          (!card || (card && !goodCardType)) &&
          <div className="no-location-text">Drop<b>Card</b>here</div>
        }

        {
          card && goodCardType &&
          <div className="drop-content">
            You <b>{ canDrop ? 'Can' : 'Can\'t' }</b> Drop
          </div>
        }
      </div>
    </div>
  );
};

EmptyCardSlot.defaultProps = {
  card: null,
};

EmptyCardSlot.propTypes = {
  card: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
  activeLocation: PropTypes.object.isRequired,
  acceptedType: PropTypes.string.isRequired,
  activeContainerIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ gameplay }) => ({
  globalStats: gameplay.globalStats,
  activeContainerIndex: gameplay.activeContainerIndex,
  activeLocation: gameplay.locations[gameplay.activeLocationIndex].lastDroppedItem,
});

export default connect(mapStateToProps)(EmptyCardSlot);
