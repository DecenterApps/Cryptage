import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngameCard from '../Cards/IngameCard/IngameCard';
import { switchInGameplayView } from '../../actions/gameplayActions';
import { formattedNumber } from '../../services/utils';
import { containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';

import './GameplayItem.scss';

class GameplayItem extends Component {
  constructor() {
    super();
    this.state = { show: false };
    this.goToContainer = this.goToContainer.bind(this);
    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.blockNumber === this.props.blockNumber) return false;
    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
  }

  toggleFundsStat() {
    this.setState({ show: !this.state.show });
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

    let fpb = card ? card.getBonusStatValue('fundsPerBlock') : 0;

    let remainingSlots = null;
    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate ? slot.canDrop(gameplay, dragItem.card).allowed : false;

    const isDragMiner = dragItem && dragItem.card && dragItem.card.type === 'Mining';
    const isContainer = containerIds.includes(card.metadataId);
    let canDropMiner = false;

    if (isContainer) {
      remainingSlots = card.dropSlots.filter(({ card }) => !card).length;

      let fpc = [];
      for (let i of card.dropSlots) {
        if (!i.card) {
          fpc.push(0);
        } else {
          fpc.push(i.card.getBonusStatValue('fundsPerBlock'));
        }
      }

      fpb = fpc.reduce((a, b) => a + b, 0)

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
        className={`gameplay-item-wrapper ${isContainer && 'container'}`}
      >
        {
          !isContainer &&
          <div className="asset-card-wrapper">
            {
              this.state.show &&
              (fpb > 0) &&
              <div className="fpb">+ { formattedNumber(fpb) } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
            }

            <IngameCard
              canLevelUp={canLevelUp}
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
          <div className="container-card-wrapper">
            {
              this.state.show &&
              (fpb > 0) &&
              <div className="fpb">+ { formattedNumber(fpb) } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
            }

            <IngameCard
              goToContainer={() => { this.goToContainer(isContainer); }}
              showCount={false}
              card={card}
              canLevelUp={canDropMiner}
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
  blockNumber: PropTypes.number.isRequired
};

const mapStateToProps = ({ gameplay }) => ({
  gameplay,
  activeLocationIndex: gameplay.activeLocationIndex,
  locations: [...gameplay.locationSlots],
  blockNumber: gameplay.blockNumber
});

const mapDispatchToProps = {
  switchInGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
