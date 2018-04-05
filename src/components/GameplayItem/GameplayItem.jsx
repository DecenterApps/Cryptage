import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Line } from 'rc-progress';
import { connect } from 'react-redux';
import HandCard from '../Cards/HandCard/HandCard';
import { calcDataForNextLevel } from '../../services/utils';
import { levelUpAsset, switchInGameplayView, handleCardCancel } from '../../actions/gameplayActions';
import { containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';

import './GameplayItem.scss';
import {
  checkIfCanPlayCard,
  checkSlotsAvailableForCardType,
  getContainerSlotsLength,
  getSlotForContainer,
} from '../../services/gameMechanicsService';

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
      containerIds.includes(this.props.cards[0].metadata.id) ||
      this.props.cards[0].metadata.id === '18' ||
      this.props.cards[0].metadata.id === '22' ||
      this.props.cards[0].metadata.id === '23'
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
      cards, isOver, index, activeLocationIndex, level, canLevelUp, levelUpAsset, dropSlots, slot, handleCardCancel,
      dragItem, locations, globalStats,
    } = this.props;

    const { percent, remainingCardsToDropForNextLevel } = calcDataForNextLevel(cards.length, level);
    const locationItem = locations[activeLocationIndex].lastDroppedItem;

    const isDragMiner = dragItem && dragItem.card.stats.type === 'Mining';
    const isContainer = containerIds.includes(cards[0].metadata.id);
    let remainingSlots = null;
    let canDropMiner = false;
    let goodMinerSlotType = false;
    let fpb = 0;

    // handle hacker and coffee miner fpb
    if (cards[0].metadata.id === '18' || cards[0].metadata.id === '23') fpb = cards[0].stats.bonus.funds;

    // handle grid connector fpb
    if (cards[0].metadata.id === '22') {
      fpb = locationItem.cards[0].stats.values.power * cards[0].stats.bonus.funds;
    }

    if (isContainer) {
      // export this to another function
      if (isDragMiner) {
        const containerSlotsLength = getContainerSlotsLength(locations, locationItem, index);

        const containerId = locationItem.dropSlots[index].lastDroppedItem.cards[0].metadata.id;
        const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
        goodMinerSlotType = emptyContainerSlotArr[0].accepts.includes(dragItem.card.metadata.id);
        const { stats } = dragItem.card;

        canDropMiner =
          goodMinerSlotType && containerSlotsLength && checkIfCanPlayCard(stats, globalStats, locationItem, true);
      }

      // go to third level view if dragging a mining card
      if (isOver && dragItem.card.stats.type === 'Mining' && canDropMiner) {
        this.goToContainer(isContainer);
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
              <div className="fpb">+ { fpb } { fpb === 1 ? 'fund' : 'funds' }</div>
            }

            <HandCard
              showCount={false}
              card={cards[0]}
              slot={slot}
              handleCardCancel={handleCardCancel}
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
              <div className="fpb">+ { fpb } { fpb === 1 ? 'fund' : 'funds' }</div>
            }

            <HandCard
              goToContainer={() => { this.goToContainer(isContainer); }}
              showCount={false}
              card={cards[0]}
              remainingSlots={remainingSlots}
              handleCardCancel={handleCardCancel}
              locationIndex={activeLocationIndex}
              containerIndex={index}
              slot={slot}
              played
            />
          </div>
        }
        <div className="level-up">
          {!canLevelUp && <div>Cards to drop for next level: {remainingCardsToDropForNextLevel}</div>}
          {
            canLevelUp &&
            <button
              onClick={() => { levelUpAsset(activeLocationIndex, index); }}
            >
              Upgrade to next level
            </button>
          }
        </div>
      </div>
    );
  }
}

GameplayItem.defaultProps = {
  cards: [],
  isOver: false,
  dropSlots: null,
  dragItem: null,
};

GameplayItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
  level: PropTypes.number.isRequired,
  canLevelUp: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  levelUpAsset: PropTypes.func.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
  dropSlots: PropTypes.array,
  locations: PropTypes.array.isRequired,
  slot: PropTypes.object.isRequired,
  handleCardCancel: PropTypes.func.isRequired,
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
  levelUpAsset, switchInGameplayView, handleCardCancel,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
