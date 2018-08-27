import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HoverInfo from '../HoverInfo/HoverInfo';
import { setActiveLocation } from '../../actions/gameplayActions';
import { openConfirmRemoveModal } from '../../actions/modalActions';
import { GP_LOCATION } from '../../actions/actionTypes';
import { classForRarity, formattedNumber } from '../../services/utils';
import PortalWrapper from '../PortalWrapper/PortalWrapper';
import SidebarItemNotActive from './SidebarItemNotActive';

import './LocationSidebarItem.scss';
import InfoCardIcon from '../Decorative/InfoCardIcon';
import DropCardIcon from '../Decorative/DropCardIcon';
import SidebarItemActive from './SidebarItemActive';

class LocationSidebarItem extends Component {
  constructor() {
    super();

    this.state = { showPortal: false, show: false };

    this.togglePortal = this.togglePortal.bind(this);
    this.toggleFundsStat = this.toggleFundsStat.bind(this);
  }

  togglePortal(showOrHide) { this.setState({ showPortal: showOrHide }); }

  componentDidUpdate(prevProps) {
    if (prevProps.blockNumber === this.props.blockNumber) return false;
    this.toggleFundsStat();
    setTimeout(this.toggleFundsStat, 2000);
  }

  toggleFundsStat() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { togglePortal } = this;
    const { showPortal } = this.state;
    const {
      card, slot, setActiveLocation, index, activeLocationIndex, gameplayView, openConfirmRemoveModal,
      gameplay, dragItem, draggingCard,
    } = this.props;

    let fpc = [];
    for (let i of card.dropSlots) {
      if (!i.card) {
        fpc.push(0);
      } else if (i.card.constructor.name === 'ContainerCard') {
        let ccf = [];
        let containerCard = i.card;
        for (let i of containerCard.dropSlots) {
          if (!i.card) {
            ccf.push(0);
          } else {
            ccf.push(i.card.getBonusStatValue('fundsPerBlock'));
          }
        }
        let sum = ccf.reduce((a, b) => a + b, 0)
        fpc.push(sum)
      } else if (i.card.constructor.name === 'Card') {
        fpc.push(i.card.getBonusStatValue('fundsPerBlock'));
      }
    }
    let fpb = fpc.reduce((a, b) => a + b, 0);

    const draggingDuplicate = dragItem && (dragItem.card.metadataId === card.metadataId);
    const canLevelUp = draggingDuplicate && slot.canDrop(gameplay, dragItem.card).allowed;
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
          <div className="fpb" style={ { textAlign: (activeLocationIndex === index) ? 'right' : '' } }>+ {formattedNumber(fpb)} {fpb === 1 ? 'FUND' : 'FUNDS'}</div>
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
              <div className="loc-lvl">Level {card.level}</div>
              <div className="loc-name">{card.title}</div>
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
  setActiveLocation, openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProp)(LocationSidebarItem);
