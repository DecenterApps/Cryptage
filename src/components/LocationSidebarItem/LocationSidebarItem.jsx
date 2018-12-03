import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import HoverInfo from '../HoverInfo/HoverInfo';
import { setActiveLocation } from '../../actions/gameplayActions';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { classForRarity, formattedNumber } from '../../services/utils';
import PortalWrapper from '../PortalWrapper/PortalWrapper';
import SidebarItemNotActive from './SidebarItemNotActive';
import RarityBorderActive from './RarityBorderActive/RarityBorderActive';
import RarityBorderNotActive from './RarityBorderNotActive/RarityBorderNotActive';
import eventData from '../../constants/events.json';
import CardUpgradeButton from '../CardUpgradeButton/CardUpgradeButton';
import { handleAssetUpgrade } from '../../actions/dropActions';
import StackIcon from '../Decorative/StackIcon';

import './LocationSidebarItem.scss';
import InfoCardIcon from '../Decorative/InfoCardIcon';
import DropCardIcon from '../Decorative/DropCardIcon';
import SidebarItemActive from './SidebarItemActive';

class LocationSidebarItem extends Component {
  constructor() {
    super();

    this.state = {
      showPortal: false,
      show: false,
      eventType: undefined,
      eventExpiryTime: undefined,
    };
    this.togglePortal = this.togglePortal.bind(this);
    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { blockNumber, card } = this.props;
    if (prevProps.blockNumber === blockNumber) return false;
    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
    if (!card.additionalData.activeEvent) {
      this.handleEventTimer(undefined, undefined);
      return false;
    }
    const { expiryTime, eventId, eventDuration } = card.additionalData.activeEvent;
    const { type } = eventData.events[eventId.toString()];
    const blocksLeft = expiryTime - blockNumber;
    const percents = Math.ceil(((eventDuration - blocksLeft) / eventDuration) * 100);
    this.handleEventTimer(percents, type);
  }

  togglePortal(showOrHide) { this.setState({ showPortal: showOrHide }); }

  toggleFundsStat() {
    this.setState({ show: !this.state.show });
  }

  handleEventTimer(percents, type) {
    this.setState({ eventExpiryTime: percents, eventType: type });
  }

  render() {
    const { togglePortal } = this;
    const { showPortal } = this.state;
    const {
      card, slot, setActiveLocation, index, activeLocationIndex, gameplayView, openConfirmRemoveModal,
      gameplay, dragItem, draggingCard, handleAssetUpgrade,
    } = this.props;

    const fpc = [];
    card.dropSlots.forEach((dropSlot) => {
      if (!dropSlot.card) {
        fpc.push(0);
      } else if (dropSlot.card.constructor.name === 'ContainerCard') {
        const ccf = [];
        const containerCard = dropSlot.card;
        containerCard.dropSlots.forEach((containerSlot) => {
          if (!containerSlot.card) {
            ccf.push(0);
          } else {
            ccf.push(containerSlot.card.getBonusStatValue('fundsPerBlock'));
          }
        });
        const sum = ccf.reduce((a, b) => a + b, 0);
        fpc.push(sum);
      } else if (dropSlot.card.constructor.name === 'Card') {
        fpc.push(dropSlot.card.getBonusStatValue('fundsPerBlock'));
      }
    });

    const fpb = fpc.reduce((a, b) => a + b, 0);
    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate ? slot.canDrop(gameplay, dragItem.card).allowed : false;
    const active = (activeLocationIndex === index) && gameplayView === GP_LOCATION;
    const canUpgrade = card.canLevelUp(gameplay);

    return (
      <div
        className={`location-sidebar-item-wrapper ${active && 'active'}`}
        onClick={() => { setActiveLocation(index); }}
      >
        {
          !draggingCard &&
          showPortal &&
          <PortalWrapper>
            <HoverInfo card={card} center backdrop />
          </PortalWrapper>
        }

        {
          (fpb > 0) &&
          this.state.show &&
          <div className={`fpb
            ${(activeLocationIndex === index) ? 'right' : ''}`}
          >+ {formattedNumber(fpb)} {fpb === 1 ? 'FUND' : 'FUNDS'}
          </div>
        }

        {
          !active &&
          <div
            className={`
            location-sidebar-small
            rarity-border
            ${classForRarity(card.rarityScore)}`}
          >
            {
              (this.state.eventExpiryTime !== undefined) &&
              <Circle
                className={`${this.state.eventType.toLowerCase()}`}
                strokeWidth="49"
                trailColor="transparent"
                strokeLinecap="butt"
                percent={this.state.eventExpiryTime}
              />
            }
            <RarityBorderNotActive card={card} />
            <SidebarItemNotActive
              draggingCard={draggingCard}
              canLevelUp={canLevelUp}
              id={card.id}
              image={`cardImages/${card.image}`}
            />

            <div className="upgrade-wrapper">
              <CardUpgradeButton
                gameplay={gameplay}
                card={card}
                upgradeLevel={card.level}
                handleUpgrade={() => {
                  if (!slot) return;

                  handleAssetUpgrade(slot);
                }}
                slot={slot}
                small
                canUpgrade={canUpgrade}
              />
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

        {
          active &&
          <div className={`
            location-sidebar-big
            rarity-border
            ${classForRarity(card.rarityScore)}`}
          >
            {
              (this.state.eventExpiryTime !== undefined) &&
              <Circle
                className={`${this.state.eventType.toLowerCase()}`}
                strokeWidth="49"
                trailColor="transparent"
                strokeLinecap="butt"
                percent={this.state.eventExpiryTime}
              />
            }
            <RarityBorderActive card={card} />
            <SidebarItemActive
              draggingCard={draggingCard}
              canLevelUp={canLevelUp}
              id={card.id}
              image={`cardImages/${card.image}`}
            />

            <div className="location-data">
              <div className="loc-name">{card.title}</div>
            </div>

            <div className="upgrades-wrapper">
              <CardUpgradeButton
                gameplay={gameplay}
                card={card}
                upgradeLevel={card.level}
                handleUpgrade={() => {
                  if (!slot) return;

                  handleAssetUpgrade(slot);
                }}
                slot={slot}
                canUpgrade={canUpgrade}
              />

              <span className="stacked-number">
                <span>{card.stackedCards.length}</span>
                <StackIcon />
              </span>
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
  gameplay: PropTypes.object.isRequired,
  card: PropTypes.object,
  setActiveLocation: PropTypes.func.isRequired,
  handleAssetUpgrade: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  activeLocationIndex: PropTypes.number.isRequired,
  gameplayView: PropTypes.string.isRequired,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  slot: PropTypes.object.isRequired,
  blockNumber: PropTypes.number.isRequired,
  dragItem: PropTypes.object,
  draggingCard: PropTypes.bool,
};

const mapStateToProps = ({ gameplay, app }) => ({
  gameplay,
  activeLocationIndex: gameplay.activeLocationIndex,
  gameplayView: gameplay.gameplayView,
  blockNumber: gameplay.blockNumber,
  draggingCard: app.draggingCard,
});

const mapDispatchToProp = {
  setActiveLocation, openConfirmRemoveModal, handleAssetUpgrade,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
