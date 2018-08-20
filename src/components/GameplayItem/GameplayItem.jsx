import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngameCard from '../Cards/IngameCard/IngameCard';
import { switchInGameplayView } from '../../actions/gameplayActions';
import { containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';

import './GameplayItem.scss';

class GameplayItem extends Component {
  constructor() {
    super();

    this.goToContainer = this.goToContainer.bind(this);
  }

  /**
   * When clicking on a container card
   * goes to third level view
   *
   * @param isContainer
   */
  goToContainer(isContainer) {
    if (!isContainer) return;
    this.props.switchInGameplayView(this.props.index, GP_LOCATION_CONTAINER);
  }

  render() {
    const {
      card, isOver, index, activeLocationIndex, slot,
      dragItem, locations, gameplay,
    } = this.props;

    let remainingSlots = null;
    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && slot.canDrop(gameplay, dragItem.card).allowed;

    const isDragMiner = dragItem && dragItem.card && dragItem.card.type === 'Mining';
    const isContainer = containerIds.includes(card.metadataId);
    let canDropMiner = false;

    if (isContainer) {
      remainingSlots = card.dropSlots.filter(({ card }) => card === null).length;

      if (isDragMiner) {
        canDropMiner = card.dropSlots.reduce((_acc, dropSlot) => {
          let acc = _acc;
          const canDrop = dropSlot.canDrop(gameplay, dragItem.card).allowed;
          if (canDrop) acc = [...acc, canDrop];

          return acc;
        }, []).includes(true);
      }

      if (isDragMiner && isOver && canDropMiner) {
        setTimeout(() => {
          this.goToContainer(isContainer);
        }, 200);
      }
    }

    return (
      <div
        className={`
        gameplay-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
        ${isContainer && 'container'}
      `}
      >
        {
          !isContainer &&
          <div className="asset-card-wrapper">
            {
              this.state.show &&
              (fpb > 0) &&
              <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
            }

            <IngameCard
              showCount={false}
              card={card}
              slot={slot}
              locationIndex={activeLocationIndex}
              containerIndex={index}
              played
            />
          </div>
        }
        {
          isContainer &&
          <div
            className={`
              container-card-wrapper
              ${isDragMiner && canDropMiner && 'can-drop-miner'}
              ${isDragMiner && !canDropMiner && 'no-drop-miner'}
            `}
          >
            {
              this.state.show &&
              (fpb > 0) &&
              <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
            }

            <IngameCard
              goToContainer={() => { this.goToContainer(isContainer); }}
              showCount={false}
              card={card}
              remainingSlots={remainingSlots}
              locationIndex={activeLocationIndex}
              containerIndex={index}
              slot={slot}
              played
            />
          </div>
        }
      </div>
    );
  }
}

GameplayItem.defaultProps = {
  card: null,
  isOver: false,
  dragItem: null,
};

GameplayItem.propTypes = {
  gameplay: PropTypes.object.isRequired,
  card: PropTypes.object,
  isOver: PropTypes.bool,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  slot: PropTypes.object.isRequired,
  dragItem: PropTypes.object,
};

const mapStateToProps = ({ gameplay /* app */ }) => ({
  gameplay,
  activeLocationIndex: gameplay.activeLocationIndex,
  locations: [...gameplay.locationSlots],
});

const mapDispatchToProps = {
  switchInGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
