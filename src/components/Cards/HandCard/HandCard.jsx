import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { guid, classForRarity } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import { openConfirmRemoveModal } from '../../../actions/modalActions';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import PortalWrapper from '../../PortalWrapper/PortalWrapper';
import { rarities, typeGradients } from '../../../actions/actionTypes';

import './HandCard.scss';
import RarityBorder from '../RarityBorder/RarityBorder';

class HandCard extends Component {
  constructor() {
    super();
    this.state = { showPortal: false };
    this.togglePortal = this.togglePortal.bind(this);
  }

  togglePortal(showOrHide) { this.setState({ showPortal: showOrHide }); }

  render() {
    const { togglePortal } = this;
    const { showPortal } = this.state;
    const {
      card, showCount, hoverCentered, played, remainingSlots, goToContainer, openConfirmRemoveModal,
      locationIndex, containerIndex, slot, containerSlotIndex, draggingCard, canRemove, costErrors,
      inHand, removeNewCardOnHover, newCardTypes,
    } = this.props;

    const uniqueId = guid();

    const rarityColor = rarities[classForRarity(card.stats.rarityScore)] || '#9C01C2';
    const typeColor = typeGradients[card.stats.type.toLowerCase()][0];
    const borderColor = classForRarity(card.stats.rarityScore) !== 'normal' ? typeColor : '#9797FB';

    return (
      <div
        className={`card-details type-${card.stats.type.toLowerCase()}`}
        onMouseEnter={() => {
          removeNewCardOnHover(card.metadata.id);
          togglePortal(true);
        }}
        onMouseLeave={() => { togglePortal(false); }}
        ref={(ref) => { this.myRef = ref; }}
      >
        {
          !draggingCard &&
          showPortal &&
          <PortalWrapper>
            <HoverInfo
              card={card}
              center={hoverCentered}
              parent={hoverCentered ? null : this.myRef}
              type={hoverCentered ? null : 'asset'}
              backdrop={hoverCentered}
              showLevel={false}
              delayHover
            />
          </PortalWrapper>
        }

        <RarityBorder card={card} />
        <svg className="card-image">
          <defs>
            <pattern
              id={`card-background-${card.metadata.id}-${uniqueId}`}
              height="100%"
              width="100%"
              patternContentUnits="objectBoundingBox"
              viewBox="0 0 1 1"
              preserveAspectRatio="xMidYMid slice"
            >
              <image
                height="1"
                width="1"
                preserveAspectRatio="xMidYMid slice"
                href={`cardImages/${card.stats.image}`}
              />
            </pattern>
            <linearGradient
              id={`card-rarity-gradient-${uniqueId}`}
              x1={`${classForRarity(card.stats.rarityScore) === 'normal' ? 20 : 0}%`}
              x2={`${classForRarity(card.stats.rarityScore) === 'normal' ? 250 : 0}%`}
              y1={`${classForRarity(card.stats.rarityScore) === 'normal' ? 50 : 0}%`}
              y2={`${classForRarity(card.stats.rarityScore) === 'normal' ? 0 : 150}%`}
            >
              <stop
                offset="0%"
                style={{ stopColor: borderColor }}
              />
              <stop
                offset="50%"
                style={{ stopColor: `${borderColor}00` }}
              />
            </linearGradient>
            <linearGradient
              id={`card-type-gradient-${uniqueId}`}
              y1="0%"
              y2="100%"
              x1="0%"
              x2="0%"
            >
              <stop
                offset="0%"
                style={{ stopColor: typeGradients[card.stats.type.toLowerCase()][1] }}
              />
              <stop
                offset="100%"
                style={{ stopColor: typeGradients[card.stats.type.toLowerCase()][0] }}
              />
            </linearGradient>
          </defs>
          <polygon
            className="card-image-bg"
            points="8,0 84,0 84,115 76,123 0,123 0,8"
            fill={`url(#card-rarity-gradient-${uniqueId})`}
          />
          <polygon
            className="card-image-bg-inner"
            points="9,1 83,1 83,114 75,122 1,122 1,9"
            fill="black"
          />
          <polygon
            className="card-image-inner"
            points="10,2 82,2 82,113 74,121 2,121 2,10"
            fill={`url(#card-background-${card.metadata.id}-${uniqueId})`}
          />
          <polygon
            className="card-meta-bg"
            points="2,50 82,50 82,113 74,121 2,121 "
            fill={`url(#card-type-gradient-${uniqueId})`}
          />
        </svg>
        <div className={`meta ${card.stats.type.toLowerCase()}`}>
          <div className="title">{card.stats.title}</div>
          <div className="border" />
          <div className="type">{card.stats.type}</div>
        </div>
        {
          showCount && card.count > 1 &&
          <div className="count-wrapper">
            <div className="count">x{card.count}</div>
          </div>
        }

        {
          inHand && newCardTypes.includes(card.metadata.id) &&
          <div className="new-card"><span>new</span></div>
        }

        {
          costErrors && costErrors.special &&
          <div className="special-errors">{costErrors.special}</div>
        }
      </div>
    );
  }
}

HandCard.defaultProps = {
  card: {
    stats: {
      title: '',
      image: '',
    },
  },
  canRemove: true,
  showCount: true,
  hoverCentered: false,
  played: false,
  remainingSlots: 0,
  goToContainer: null,
  locationIndex: undefined,
  containerIndex: undefined,
  containerSlotIndex: undefined,
  slot: null,
  draggingCard: false,
  costErrors: null,
  inHand: false,
};

HandCard.propTypes = {
  card: PropTypes.shape({
    stats: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
  showCount: PropTypes.bool,
  hoverCentered: PropTypes.bool,
  remainingSlots: PropTypes.number,
  played: PropTypes.bool,
  goToContainer: PropTypes.func,
  openConfirmRemoveModal: PropTypes.func.isRequired,
  locationIndex: PropTypes.number,
  containerIndex: PropTypes.number,
  containerSlotIndex: PropTypes.number,
  slot: PropTypes.object,
  draggingCard: PropTypes.bool,
  canRemove: PropTypes.bool,
  costErrors: PropTypes.object,
  inHand: PropTypes.bool,
  removeNewCardOnHover: PropTypes.func.isRequired,
  newCardTypes: PropTypes.array.isRequired,
};

const mapStateToProps = ({ app, gameplay }) => ({
  draggingCard: app.draggingCard,
  newCardTypes: gameplay.newCardTypes,
});

const mapDispatchToProps = {
  openConfirmRemoveModal, removeNewCardOnHover,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandCard);
