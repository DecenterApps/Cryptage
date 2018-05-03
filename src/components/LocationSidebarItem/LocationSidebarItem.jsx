import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverInfo from '../HoverInfo/HoverInfo';
import { setActiveLocation } from '../../actions/gameplayActions';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { classForRarity } from '../../services/utils';
import MagnifyingGlassIcon from '../Decorative/MagnifyingGlassIcon';
import ChevronDownIcon from '../Decorative/ChevronDownIcon';
import { checkIfCanLevelUp } from '../../services/gameMechanicsService';

import './LocationSidebarItem.scss';

class LocationSidebarItem extends Component {
  constructor() {
    super();
    this.state = { show: false };

    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.blockNumber === this.props.blockNumber) return;

    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
  }

  /**
   * Shows or hides funds stats per block
   */
  toggleFundsStat() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const {
      mainCard, slot, setActiveLocation, index, activeLocationIndex, gameplayView, openConfirmRemoveModal,
      globalStats, dragItem,
    } = this.props;

    const draggingDuplicate = dragItem && (dragItem.card.metadata.id === mainCard.metadata.id);
    const canLevelUp = draggingDuplicate && checkIfCanLevelUp(mainCard, globalStats);

    let fpb = 0;

    slot.lastDroppedItem.dropSlots.forEach(({ lastDroppedItem }) => {
      // get hackers and coffee miners fpb
      if (lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '18') {
        fpb += lastDroppedItem.mainCard.stats.bonus.funds;
      }

      if ((lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '23')) {
        fpb += lastDroppedItem.mainCard.stats.bonus.multiplierFunds;
      }

      // get grid connector fpb
      if (lastDroppedItem && lastDroppedItem.mainCard.metadata.id === '22') {
        const { power } = slot.lastDroppedItem.values;
        fpb += (power * lastDroppedItem.mainCard.stats.bonus.funds);
      }

      // get containers fpb
      if (lastDroppedItem && lastDroppedItem.dropSlots) {
        lastDroppedItem.dropSlots.forEach((containerSlot) => {
          if (containerSlot.lastDroppedItem) {
            fpb += containerSlot.lastDroppedItem.mainCard.stats.bonus.funds;
          }
        });
      }
    });

    return (
      <div
        className={`
        location-sidebar-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
        ${((activeLocationIndex === index) && gameplayView === GP_LOCATION) && 'active'}
      `}
      >
        <HoverInfo card={mainCard} />

        {
          (activeLocationIndex !== index) &&
          (fpb > 0) &&
          this.state.show &&
          <div className="fpb">+ { fpb } { fpb === 1 ? 'FUND' : 'FUNDS' }</div>
        }

        <div className="hover-addons">
          <div className="magnifying-glass-wrapper" onClick={() => { setActiveLocation(index); }}>
            <MagnifyingGlassIcon />
          </div>
          <div className="drop-wrapper">
            <svg className="drop-background">
              <polygon points="0,0 29,29 29,46 0,46" fill="#1F1638" />
            </svg>
            <div className="drop-icon" onClick={() => { openConfirmRemoveModal(slot, index); }}>
              <ChevronDownIcon width={17} />
            </div>
          </div>
        </div>
        <div className={`rarity-border ${classForRarity(mainCard.stats.rarityScore)}`} />
        <div
          className="location-sidebar-item-inner-wrapper"
          style={{ backgroundImage: `url('cardImages/${mainCard.stats.image}')` }}
        >
          <div className="level-outer">
            <svg className="level-background">
              <defs>
                <linearGradient id={`sidebar-location-level-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3CC8CC' }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(60, 200, 204, 0.33)' }} />
                </linearGradient>
              </defs>
              <polygon points="0,0 27,0 27,27" fill={`url(#sidebar-location-level-${index})`} />
            </svg>
            <span className="level">{mainCard.stats.level}</span>
          </div>
          <div className="title">{mainCard.stats.title}</div>
        </div>
      </div>
    );
  }
}

LocationSidebarItem.defaultProps = {
  mainCard: null,
  dragItem: null,
};

LocationSidebarItem.propTypes = {
  mainCard: PropTypes.object,
  setActiveLocation: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  slot: PropTypes.object.isRequired,
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  dragItem: PropTypes.object,
};

const mapStateToProps = ({ gameplay }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
  blockNumber: gameplay.blockNumber,
  globalStats: gameplay.globalStats,
});

const mapDispatchToProp = {
  setActiveLocation, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
