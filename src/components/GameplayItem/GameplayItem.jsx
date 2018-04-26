import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HandCard from '../Cards/HandCard/HandCard';
import { switchInGameplayView } from '../../actions/gameplayActions';
import { containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';
import { checkIfCanPlayCard, getContainerSlotsLength, getSlotForContainer } from '../../services/gameMechanicsService';

import './GameplayItem.scss';

class GameplayItem extends Component {
  constructor() {
    super();
    this.state = { show: false };

    this.toggleFundsStat = this.toggleFundsStat.bind(this);
    this.goToContainer = this.goToContainer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blockNumber === this.props.blockNumber) return;

    if (
      containerIds.includes(this.props.mainCard.metadata.id) ||
      this.props.mainCard.metadata.id === '18' ||
      this.props.mainCard.metadata.id === '22' ||
      this.props.mainCard.metadata.id === '23'
    ) {
      this.toggleFundsStat();
      setTimeout(this.toggleFundsStat, 2000);
    }
  }

  /**
   * Shows or hides funds stats per block
   */
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
      mainCard, isOver, index, activeLocationIndex, dropSlots, slot,
      dragItem, locations, globalStats,
    } = this.props;

    const locationItem = locations[activeLocationIndex].lastDroppedItem;

    const isDragMiner = dragItem && dragItem.card && dragItem.card.stats.type === 'Mining';
    const isContainer = containerIds.includes(mainCard.metadata.id);
    let remainingSlots = null;
    let canDropMiner = false;
    let goodMinerSlotType = false;
    let fpb = 0;

    // handle hacker and coffee miner fpb
    if (mainCard.metadata.id === '18') fpb = mainCard.stats.bonus.funds;
    if (mainCard.metadata.id === '23') fpb = mainCard.stats.bonus.multiplierFunds;

    // handle grid connector fpb
    if (mainCard.metadata.id === '22') fpb = locationItem.values.power * mainCard.stats.bonus.funds;

    if (isContainer) {
      // export this to another function
      if (isDragMiner) {
        const containerSlotsLength = getContainerSlotsLength(locations, locationItem, index);

        const containerId = locationItem.dropSlots[index].lastDroppedItem.mainCard.metadata.id;
        const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
        goodMinerSlotType = emptyContainerSlotArr[0].accepts.includes(dragItem.card.metadata.id);
        const { stats } = dragItem.card;

        canDropMiner =
          goodMinerSlotType && containerSlotsLength && checkIfCanPlayCard(stats, globalStats, locationItem, true);
      }

      // go to third level view if dragging a mining card
      if (isOver && dragItem.card.stats.type === 'Mining' && canDropMiner) {
        setTimeout(() => {
          this.goToContainer(isContainer);
        }, 200);
      }

      remainingSlots = dropSlots.filter(({ lastDroppedItem }) => lastDroppedItem === null).length;

      // handle container fpb
      fpb = slot.lastDroppedItem.dropSlots.reduce((acc, currVal) => {
        if (currVal.lastDroppedItem) {
          acc += currVal.lastDroppedItem.cards[0].stats.bonus.funds;
        }

        return acc;
      }, 0);
    }

    return (
      <div
        className={`
        gameplay-item-wrapper
        ${isOver && 'hovering'}
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

            <HandCard
              showCount={false}
              card={mainCard}
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
              ${isDragMiner && goodMinerSlotType && canDropMiner && 'can-drop-miner'}
              ${isDragMiner && goodMinerSlotType && !canDropMiner && 'no-drop-miner'}
            `}
          >
            {
              this.state.show &&
              (fpb > 0) &&
              <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
            }

            <HandCard
              goToContainer={() => { this.goToContainer(isContainer); }}
              showCount={false}
              card={mainCard}
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
  mainCard: null,
  isOver: false,
  dropSlots: null,
  dragItem: null,
};

GameplayItem.propTypes = {
  mainCard: PropTypes.object,
  isOver: PropTypes.bool,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
  dropSlots: PropTypes.array,
  locations: PropTypes.array.isRequired,
  slot: PropTypes.object.isRequired,
  blockNumber: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  blockNumber: app.blockNumber,
  locations: gameplay.locations,
  globalStats: gameplay.globalStats,
});

const mapDispatchToProps = {
  switchInGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
