import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IngameCard from '../Cards/IngameCard/IngameCard';
import { switchInGameplayView } from '../../actions/gameplayActions';
import { acceptedAssetLevelUpIds, containerIds, GP_LOCATION_CONTAINER } from '../../actions/actionTypes';
import {
  checkIfCanLevelUp, checkIfCanPlayCard, getContainerSlotsLength,
  getSlotForContainer,
} from '../../services/gameMechanicsService';

import './GameplayItem.scss';
import { getDropSlotsAvailableLevelUp } from '../../services/utils';

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
      containerIds.includes(this.props.card.metadataId) ||
      this.props.card.metadataId === '18' ||
      this.props.card.metadataId === '22' ||
      this.props.card.metadataId === '23' ||
      this.props.card.metadataId === '43'
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
      card, isOver, index, activeLocationIndex, slot,
      dragItem, locations, globalStats,
    } = this.props;

    const locationItem = locations[activeLocationIndex].card;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const assetLevelUpType = acceptedAssetLevelUpIds.includes(card.metadataId);
    const canLevelUp = draggingDuplicate && checkIfCanLevelUp(card, globalStats);

    const isDragMiner = dragItem && dragItem.card && dragItem.card.type === 'Mining';
    const isContainer = containerIds.includes(card.metadataId);
    let remainingSlots = null;
    let canDropMiner = false;
    let goodMinerSlotType = false;
    let fpb = 0;

    // handle hacker and coffee miner fpb
    if (card.metadataId === '18') fpb = card.bonus.funds;
    if (card.metadataId === '23') fpb = card.bonus.multiplierFunds;

    // handle grid connector fpb
    if (card.metadataId === '22') fpb = locationItem.power * card.bonus.funds;

    // handle blockchain smartlock fpb
    if (card.metadataId === '43') fpb = locationItem.space * card.bonus.multiplierFunds;

    if (isContainer) {
      // export this to another function
      if (isDragMiner) {
        const containerSlotsLength = getContainerSlotsLength(locations, locationItem, index);

        const containerId = locationItem.dropSlots[index].card.metadataId;
        const emptyContainerSlotArr = getSlotForContainer(containerId, 1);
        goodMinerSlotType = emptyContainerSlotArr[0].accepts.includes(dragItem.card.metadataId);
        const { card } = dragItem;

        if (goodMinerSlotType && containerSlotsLength) {
          canDropMiner = checkIfCanPlayCard(card, globalStats, locationItem, true);
        } else if (goodMinerSlotType && !containerSlotsLength) {
          const numLevelUp = getDropSlotsAvailableLevelUp(slot.card.dropSlots, dragItem.card, globalStats);
          canDropMiner = numLevelUp !== 0;
        }
      }

      // go to third level view if dragging a mining card
      if (isOver && dragItem.card.type === 'Mining' && canDropMiner) {
        setTimeout(() => {
          this.goToContainer(isContainer);
        }, 200);
      }

      remainingSlots = card.dropSlots.filter(({ card }) => card === null).length;

      // handle container fpb
      fpb = slot.card.dropSlots.reduce((acc, currVal) => {
        if (currVal.card) {
          acc += currVal.card.bonus.funds;
        }

        return acc;
      }, 0);
    }

    return (
      <div
        className={`
        gameplay-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
        ${assetLevelUpType ? 'right-asset-type' : 'not-right-asset-type'}
        ${isContainer && 'container'}
      `}
      >
        {
          !isContainer &&
          <div className="asset-card-wrapper">
            {/*{*/}
              {/*this.state.show &&*/}
              {/*(fpb > 0) &&*/}
              {/*<div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>*/}
            {/*}*/}

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
              ${isDragMiner && goodMinerSlotType && canDropMiner && 'can-drop-miner'}
              ${isDragMiner && goodMinerSlotType && !canDropMiner && 'no-drop-miner'}
            `}
          >
            {/*{*/}
              {/*this.state.show &&*/}
              {/*(fpb > 0) &&*/}
              {/*<div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>*/}
            {/*}*/}

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
  card: PropTypes.object,
  isOver: PropTypes.bool,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  switchInGameplayView: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  slot: PropTypes.object.isRequired,
  blockNumber: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
  globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = ({ gameplay, app }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  blockNumber: app.blockNumber,
  locations: gameplay.locationSlots,
  globalStats: gameplay.stats,
});

const mapDispatchToProps = {
  switchInGameplayView,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayItem);
