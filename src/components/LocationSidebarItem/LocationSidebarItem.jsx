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
import PortalWrapper from '../PortalWrapper/PortalWrapper';
import SidebarItemNotActive from './SidebarItemNotActive';

import './LocationSidebarItem.scss';
import InfoCardIcon from '../Decorative/InfoCardIcon';
import DropCardIcon from '../Decorative/DropCardIcon';
import SidebarItemActive from './SidebarItemActive';

class LocationSidebarItem extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
      showPortal: false,
    };

    this.toggleFundsStat = this.toggleFundsStat.bind(this);
    this.togglePortal = this.togglePortal.bind(this);
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

  togglePortal(showOrHide) { this.setState({ showPortal: showOrHide }); }

  render() {
    const { togglePortal } = this;
    const { showPortal } = this.state;
    const {
      card, slot, setActiveLocation, index, activeLocationIndex, gameplayView, openConfirmRemoveModal,
      globalStats, dragItem, draggingCard,
    } = this.props;

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && checkIfCanLevelUp(card, globalStats);

    // let fpb = 0;

    // slot.lastDroppedItem.dropSlots.forEach(({ lastDroppedItem }) => {
    //   // get hackers and coffee miners fpb
    //   if (lastDroppedItem && lastDroppedItem.card.metadata.id === '18') {
    //     fpb += lastDroppedItem.card.bonus.funds;
    //   }
    //
    //   if ((lastDroppedItem && lastDroppedItem.card.metadata.id === '23')) {
    //     fpb += lastDroppedItem.card.bonus.multiplierFunds;
    //   }
    //
    //   // get grid connector fpb
    //   if (lastDroppedItem && lastDroppedItem.card.metadata.id === '22') {
    //     const { power } = slot.lastDroppedItem.values;
    //     fpb += (power * lastDroppedItem.card.bonus.funds);
    //   }
    //
    //   // get containers fpb
    //   if (lastDroppedItem && lastDroppedItem.dropSlots) {
    //     lastDroppedItem.dropSlots.forEach((containerSlot) => {
    //       if (containerSlot.lastDroppedItem) {
    //         fpb += containerSlot.lastDroppedItem.card.bonus.funds;
    //       }
    //     });
    //   }
    // });

    const active = (activeLocationIndex === index) && gameplayView === GP_LOCATION;

    return (
      <div
        className={`
        location-sidebar-item-wrapper
        ${canLevelUp ? 'level-up-success' : 'level-up-fail'}
        ${draggingDuplicate ? 'dragging-success' : 'dragging-fail'}
        ${active && 'active'}
      `}
        onClick={() => { setActiveLocation(index); }}
        ref={(ref) => { this.myRef = ref; }}
      >
        {
          !draggingCard &&
          showPortal &&
          <PortalWrapper>
            <HoverInfo card={card} parent={this.myRef} type="location" />
          </PortalWrapper>
        }

        {
          !active &&
          <div
            className={`
            location-sidebar-small
            rarity-border
            ${classForRarity(card.rarityScore)}`}
          >
            <SidebarItemNotActive id={card.id} image={`cardImages/${card.image}`} />

            <div className="actions" onClick={e => e.stopPropagation()}>
              <div
                className="hover-info-wrapper"
                onMouseEnter={() => { togglePortal(true); }}
                onMouseLeave={() => { togglePortal(false); }}
              >
                <InfoCardIcon />
              </div>
              <div className="remove-card-wrapper" onClick={() => { openConfirmRemoveModal(slot, index); }}>
                <DropCardIcon />
              </div>
            </div>
          </div>
        }

        {
          active &&
          <div className={`
            location-sidebar-big
            rarity-border
            ${classForRarity(card.rarityScore)}`}
          >
            <SidebarItemActive id={card.id} image={`cardImages/${card.image}`} />

            <div className="location-data">
              <div className="loc-name">{card.title}</div>
              <div className="loc-lvl">Level {card.level}</div>
            </div>

            <div className="actions" onClick={e => e.stopPropagation()}>
              <div
                className="hover-info-wrapper"
                onMouseEnter={() => { togglePortal(true); }}
                onMouseLeave={() => { togglePortal(false); }}
              >
                <InfoCardIcon />
              </div>
              <div className="remove-card-wrapper" onClick={() => { openConfirmRemoveModal(slot, index); }}>
                <DropCardIcon />
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

LocationSidebarItem.defaultProps = {
  card: null,
  dragItem: null,
  draggingCard: false,
};

LocationSidebarItem.propTypes = {
  card: PropTypes.object,
  setActiveLocation: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  slot: PropTypes.object.isRequired,
  blockNumber: PropTypes.number.isRequired,
  globalStats: PropTypes.object.isRequired,
  dragItem: PropTypes.object,
  draggingCard: PropTypes.bool,
};

const mapStateToProps = ({ gameplay, app }) => ({
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
  blockNumber: gameplay.blockNumber,
  globalStats: gameplay.stats,
  draggingCard: app.draggingCard,
});

const mapDispatchToProp = {
  setActiveLocation, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
