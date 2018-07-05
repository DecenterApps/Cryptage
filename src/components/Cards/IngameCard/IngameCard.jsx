import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { guid, formatBigNumberWithBreak, range, classForRarity } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import DropCardIcon from '../../Decorative/DropCardIcon';
import MagnifyingGlassCardIcon from '../../Decorative/MagnifyingGlassCardIcon';
import InfoCardIcon from '../../Decorative/InfoCardIcon';
import { openConfirmRemoveModal } from '../../../actions/modalActions';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import PortalWrapper from '../../PortalWrapper/PortalWrapper';
import { rarities, typeGradients } from '../../../actions/actionTypes';

import './IngameCard.scss';

const classForNumber = (_number) => {
  const number = formatBigNumberWithBreak(_number);
  if (number.length > 3) return 'small';
  if (number.length === 3) return 'smaller';
  return '';
};

class IngameCard extends Component {
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
      inHand, removeNewCardOnHover,
    } = this.props;

    const uniqueId = guid();
    const rarityColor = rarities[classForRarity(card.rarityScore)] || '#9C01C2';

    return (
      <div
        className={`ingame-card-details type-${card.type.toLowerCase()}`}
        onMouseEnter={() => {
          removeNewCardOnHover(card.metadataId);
        }}
        onMouseLeave={() => { togglePortal(false); }}
        onClick={(e) => {
          if (card.type === 'Container' && played && goToContainer) goToContainer(e);
        }}
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
            />
          </PortalWrapper>
        }

        <div className="level-wrapper">
          <div className="level">{card.level}</div>
        </div>
        <div className="overlay" />
        <div className={`rarity-overlay ${classForRarity(card.rarityScore)}`} />
        <svg className="card-image">
          <defs>
            <pattern
              id={`card-background-${card.metadataId}-${uniqueId}`}
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
                href={`cardImages/${card.image}`}
              />
            </pattern>c
            <linearGradient
              id={`card-rarity-gradient-${uniqueId}`}
              x1={`${classForRarity(card.rarityScore) === 'normal' ? 20 : 0}%`}
              x2={`${classForRarity(card.rarityScore) === 'normal' ? 250 : 0}%`}
              y1={`${classForRarity(card.rarityScore) === 'normal' ? 50 : 0}%`}
              y2={`${classForRarity(card.rarityScore) === 'normal' ? 0 : 150}%`}
            >
              <stop
                offset="0%"
                style={{ stopColor: rarityColor }}
              />
              <stop
                offset="50%"
                style={{ stopColor: `${rarityColor}00` }}
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
                style={{ stopColor: typeGradients[card.type.toLowerCase()][1] }}
              />
              <stop
                offset="100%"
                style={{ stopColor: typeGradients[card.type.toLowerCase()][0] }}
              />
            </linearGradient>
          </defs>
          <polygon
            className="card-image-bg"
            points="8,0 100,0 100,134 92,142 0,142 0,8"
            fill={`url(#card-rarity-gradient-${uniqueId})`}
          />
          <polygon
            className="card-image-bg-inner"
            points="9,1 99,1 99,133 91,141 1,141 1,9"
            fill="black"
          />
          <polygon
            className="card-image-inner"
            points="10,2 98,2 98,132 90,140 2,140 2,10"
            fill={`url(#card-background-${card.metadataId}-${uniqueId})`}
          />
          <polygon
            className="card-meta-bg"
            points="2,70 98,70 98,132 90,140 2,140 "
            fill={`url(#card-type-gradient-${uniqueId})`}
          />
        </svg>
        <div className={`meta ${card.type.toLowerCase()}`}>
          <div className="title">{card.title}</div>
          <div className="border" />
          <div className="type">{card.type}</div>
        </div>
        {
          showCount && card.count > 1 &&
          <div className="count-wrapper">
            <div className="count">x{card.count}</div>
          </div>
        }

        {/*{*/}
          {/*inHand && newCardTypes.includes(card.metadataId) &&*/}
          {/*<div className="new-card">new</div>*/}
        {/*}*/}

        {
          card.type === 'Container' && played &&
          <div className="container-slots-outer-wrapper">
            <div className="container-slots-wrapper">
              <div
                className="slots-bar"
                style={{
                  height: `${100 - 100 * remainingSlots / card.space}%`,
                }}
              />
            </div>
          </div>
        }

        {
          costErrors && costErrors.special &&
          <div className="special-errors">{costErrors.special}</div>
        }
        <div
          className="actions"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="hover-info-wrapper"
            onMouseEnter={() => {
              togglePortal(true);
            }}
          >
            <InfoCardIcon />
          </div>
          {
            played &&
            canRemove &&
            <div
              className="remove-card-wrapper"
              onClick={() => {
                openConfirmRemoveModal(slot, locationIndex, containerIndex, containerSlotIndex);
              }}
            >
              <DropCardIcon />
            </div>
          }

          {
            card.type === 'Container' && played && goToContainer &&
            <div className="go-to-container-wrapper" onClick={goToContainer}>
              <MagnifyingGlassCardIcon />
            </div>
          }
        </div>
      </div>
    );
  }
}

IngameCard.defaultProps = {
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

IngameCard.propTypes = {
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
};

const mapStateToProps = ({ app, gameplay }) => ({
  draggingCard: app.draggingCard,
});

const mapDispatchToProps = {
  openConfirmRemoveModal, removeNewCardOnHover,
};

export default connect(mapStateToProps, mapDispatchToProps)(IngameCard);
