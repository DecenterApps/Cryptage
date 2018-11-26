import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Circle } from 'rc-progress';
import PropTypes from 'prop-types';
import { guid, classForRarity } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import DropCardIcon from '../../Decorative/DropCardIcon';
import MagnifyingGlassCardIcon from '../../Decorative/MagnifyingGlassCardIcon';
import InfoCardIcon from '../../Decorative/InfoCardIcon';
import { openConfirmRemoveModal } from '../../../actions/modalActions';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';
import { handleAssetUpgrade } from '../../../actions/dropActions';
import PortalWrapper from '../../PortalWrapper/PortalWrapper';
import { typeGradients } from '../../../actions/actionTypes';
import RarityBorder from '../RarityBorder/RarityBorder';
import { getMaxValueForLocation } from '../../../services/gameMechanicsService';
import CardUpgradeButton from '../../CardUpgradeButton/CardUpgradeButton';
import StackIcon from '../../Decorative/StackIcon';

import './IngameCard.scss';

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
      card, showCount, played, remainingSlots, goToContainer, openConfirmRemoveModal,
      locationIndex, containerIndex, slot, containerSlotIndex, draggingCard, canRemove, costErrors,
      removeNewCardOnHover, canLevelUp, gameplay, handleAssetUpgrade,
    } = this.props;

    const uniqueId = guid();
    const typeColor = typeGradients[card.type.toLowerCase()][0];
    const borderColor = classForRarity(card.rarityScore) !== 'normal' ? typeColor : '#9797FB';
    const canUpgrade = card.canLevelUp(gameplay).allowed;

    return (
      <div
        className={`ingame-card-details type-${card.type.toLowerCase()}`}
        onMouseEnter={() => {
          if (card.newCard) removeNewCardOnHover(card.metadataId);
        }}
        onClick={(e) => {
          if (card.type === 'Container' && played && goToContainer) goToContainer(e);
        }}
      >
        {
          !draggingCard &&
          showPortal &&
          <PortalWrapper>
            <HoverInfo card={card} center backdrop />
          </PortalWrapper>
        }

        {
          card.type !== 'Container' && played &&
          <div className="upgrades-wrapper">
            <CardUpgradeButton
              gameplay={gameplay}
              card={card}
              upgradeLevel={card.level}
              handleUpgrade={() => {
                if (!slot) return;

                handleAssetUpgrade(slot);
              }}
              canUpgrade={slot && canUpgrade}
            />
          </div>
        }
        <div className="overlay" />
        <RarityBorder card={card} />

        {
          card.type !== 'Container' && played &&
          <div className="upgrade-delay-wrapper">
            <Circle
              strokeWidth="7"
              strokeColor="#FF9D14"
              trailColor="transparent"
              percent={10}
            />

            <div className="circle-trail" />

            <div className="delay-num">50</div>
          </div>
        }

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
            </pattern>
            <linearGradient
              id={`card-rarity-gradient-${uniqueId}`}
              x1={`${classForRarity(card.rarityScore) === 'normal' ? 20 : 0}%`}
              x2={`${classForRarity(card.rarityScore) === 'normal' ? 250 : 0}%`}
              y1={`${classForRarity(card.rarityScore) === 'normal' ? 50 : 50}%`}
              y2={`${classForRarity(card.rarityScore) === 'normal' ? 0 : 250}%`}
            >
              <stop
                offset="0%"
                style={{ stopColor: borderColor }}
              />
              <stop
                offset="50%"
                style={{ stopColor: `${borderColor}30` }}
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
            points="9,0 100,0 100,136 91,145 0,145 0,9"
            fill={`url(#card-rarity-gradient-${uniqueId})`}
          />
          <polygon
            className="card-image-bg-inner"
            points="10,1 99,1 99,135 90,144 1,144 1,10"
            fill="black"
          />
          <polygon
            className="card-image-inner"
            points="11,2 98,2 98,134 89,143 2,143 2,11"
            fill={`url(#card-background-${card.metadataId}-${uniqueId})`}
          />
          <polygon
            className="card-meta-bg"
            points="2,70 98,70 98,134 89,143 2,143 "
            fill={`url(#card-type-gradient-${uniqueId})`}
          />
          {
            draggingCard && canLevelUp &&
            <polygon
              className="card-image-inner"
              points="11,2 98,2 98,134 89,143 2,143 2,11"
              fill="rgba(35, 175, 0, 0.4)"
            />
          }
          {
            draggingCard && !canLevelUp &&
            <polygon
              className="card-image-inner"
              points="11,2 98,2 98,134 89,143 2,143 2,11"
              fill="rgba(221, 15, 48, 0.4)"
            />
          }
        </svg>
        <div className={`meta ${card.type.toLowerCase()}`}>
          {
            card.type !== 'Container' && played &&
            <div className="stacked-number">
              <span>{card.stackedCards.length}</span>
              <StackIcon />
            </div>
          }
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

        {
          card.type === 'Container' && played &&
          <div className="container-slots-outer-wrapper">
            <div className="container-slots-wrapper">
              <div
                className="slots-bar"
                style={{
                  height: `${100 - (100 * (remainingSlots / getMaxValueForLocation(card, 'space')))}%`,
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
            onMouseEnter={() => { togglePortal(true); }}
            onMouseLeave={() => { togglePortal(false); }}
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
  played: false,
  remainingSlots: 0,
  goToContainer: null,
  locationIndex: undefined,
  containerIndex: undefined,
  containerSlotIndex: undefined,
  slot: null,
  draggingCard: false,
  costErrors: null,
};

IngameCard.propTypes = {
  card: PropTypes.shape({
    stats: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
  showCount: PropTypes.bool,
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
  removeNewCardOnHover: PropTypes.func.isRequired,
  handleAssetUpgrade: PropTypes.func.isRequired,
  canLevelUp: PropTypes.bool.isRequired,
  gameplay: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  draggingCard: app.draggingCard,
});

const mapDispatchToProps = {
  openConfirmRemoveModal, removeNewCardOnHover, handleAssetUpgrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(IngameCard);
