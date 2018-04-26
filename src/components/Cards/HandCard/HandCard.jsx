import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { guid, formatBigNumberWithBreak, range, classForRarity } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import ChevronDownIcon from '../../Decorative/ChevronDownIcon';
import MagnifyingGlassIcon from '../../Decorative/MagnifyingGlassIcon';
import { openConfirmRemoveModal } from '../../../actions/modalActions';
import { removeNewCardOnHover } from '../../../actions/removeCardActions';

import './HandCard.scss';

const classForNumber = (_number) => {
  const number = formatBigNumberWithBreak(_number);
  if (number.length > 3) return 'small';
  if (number.length === 3) return 'smaller';
  return '';

  // const number = parseInt(_number, 10);
  // if (number >= 10000000) return 'small';
  // if (number >= 1000000) return '';
  // if (number >= 10000) return 'small';
  // if (number >= 1000) return '';
  // if (number >= 100) return 'smaller';
  // return '';
};

const HandCard = ({
  card, showCount, hoverCentered, played, remainingSlots, goToContainer, openConfirmRemoveModal,
  locationIndex, containerIndex, slot, containerSlotIndex, draggingCard, canRemove, costErrors,
  inHand, removeNewCardOnHover, newCardTypes,
}) => {
  const uniqueId = guid();
  const gradients = {
    misc: ['#3215E6', 'rgba(49, 20, 230, 0.33)'],
    power: ['#CE060D', 'rgba(206, 5, 13, 0.43)'],
    location: ['#3CC8CC', 'rgba(60, 200, 204, 0.33)'],
    development: ['#9F00C7', 'rgba(95, 38, 79, 0.41)'],
    project: ['#878787', 'rgba(135, 135, 135, 0.36)'],
    mining: ['#75341F', 'rgba(117, 52, 30, 0.57)'],
    container: ['#4A7420', 'rgba(74, 116, 32, 0.41)'],
  };
  const rarities = {
    normal: '#36265f',
    blue: '#0086D1',
    gold: '#9B01C1',
    red: '#FF9D14',
  };

  return (
    <div
      className={`card-details type-${card.stats.type.toLowerCase()}`}
      onMouseEnter={() => { removeNewCardOnHover(card.metadata.id); }}
    >
      {!draggingCard && <HoverInfo card={card} center={hoverCentered} />}
      <div className="level-wrapper">
        <svg className="level-background">
          <defs>
            <linearGradient
              id={`card-level-gradient-${uniqueId}`}
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{
                  stopColor: gradients[card.stats.type.toLowerCase()]
                    ? gradients[card.stats.type.toLowerCase()][0]
                    : gradients.misc[0],
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: gradients[card.stats.type.toLowerCase()]
                    ? gradients[card.stats.type.toLowerCase()][1]
                    : gradients.misc[1],
                }}
              />
            </linearGradient>
          </defs>
          <polygon points="0,0 27,0 27,27" fill={`url(#card-level-gradient-${uniqueId})`} />
        </svg>
        <div className="level">{card.stats.level}</div>
      </div>
      <div className="overlay" />
      <div className={`rarity-overlay ${classForRarity(card.stats.rarityScore)}`} />
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
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: rarities[classForRarity(card.stats.rarityScore)] }}
            />
            <stop
              offset="50%"
              style={{ stopColor: '#36265f' }}
            />
          </linearGradient>
        </defs>
        <polygon
          className="card-image-bg"
          points="0,0 40,0 70,30 70,90 0,90"
          fill={`url(#card-rarity-gradient-${uniqueId})`}
        />
        <polygon
          className="card-image-inner"
          points="2,2 39,2 68,31 68,88 2,88"
          fill={`url(#card-background-${card.metadata.id}-${uniqueId})`}
        />
      </svg>
      {
        showCount && card.count > 1 &&
        <div className="count-wrapper">
          <div className="count">x{card.count}</div>
        </div>
      }

      {
        inHand && newCardTypes.includes(card.metadata.id) &&
        <div className="new-card">new</div>
      }

      {
        card.stats.type === 'Container' && played &&
        <div className="container-slots-wrapper">
          {
            range(0, card.stats.values.space).reverse()
              .map(i => <span key={i} className={i < remainingSlots ? 'empty' : ''} />)
          }
        </div>
      }

      {
        costErrors && costErrors.special &&
        <div className="special-errors">{costErrors.special}</div>
      }

      {
        card.stats.cost &&
        <div className="cost">
          {
            card.stats.cost.space > 1 &&
            <div
              data-name="Space"
              className={`circle space
                ${classForNumber(card.stats.cost.space)}
                ${costErrors && costErrors.space ? 'error' : ''}`}
            >
              {formatBigNumberWithBreak(card.stats.cost.space)}
            </div>
          }
          {
            card.stats.cost.power > 0 &&
            <div
              data-name="Power"
              className={`circle power
                ${classForNumber(card.stats.cost.power)}
                ${costErrors && costErrors.power ? 'error' : ''}`}
            >
              {formatBigNumberWithBreak(card.stats.cost.power)}
            </div>
          }
          {
            card.stats.cost.funds > 0 &&
            <div
              data-name="Funds"
              className={`circle funds
                ${classForNumber(card.stats.cost.funds)}
                ${costErrors && costErrors.funds ? 'error' : ''}`}
            >
              {formatBigNumberWithBreak(card.stats.cost.funds)}
            </div>
          }
          {
            card.stats.cost.level > 1 &&
            <div
              data-name="Level"
              className={`circle level
                ${classForNumber(card.stats.cost.level)}
                ${costErrors && costErrors.level ? 'error' : ''}`}
            >
              {formatBigNumberWithBreak(card.stats.cost.level)}
            </div>
          }
          {
            card.stats.cost.development > 0 &&
            <div
              data-name="Dev"
              className={`circle development
                ${classForNumber(card.stats.cost.development)}
                ${costErrors && costErrors.development ? 'error' : ''}`}
            >
              {formatBigNumberWithBreak(card.stats.cost.development)}
            </div>
          }
        </div>
      }
      {
        (card.stats.values || card.stats.bonus) &&
        card.stats.type !== 'Container' &&
        <div className="values">
          {
            card.stats.values &&
            card.stats.values.space > 0 &&
            <div className={`circle space ${classForNumber(card.stats.values.space)}`}>
              {formatBigNumberWithBreak(card.stats.values.space)}
            </div>
          }
          {
            card.stats.values &&
            card.stats.values.power > 0 &&
            <div className={`circle power ${classForNumber(card.stats.values.power)}`}>
              {formatBigNumberWithBreak(card.stats.values.power)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.funds > 0 &&
            <div className={`circle funds ${classForNumber(card.stats.bonus.funds)}`}>
              {formatBigNumberWithBreak(card.stats.bonus.funds)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.xp > 0 &&
            <div className={`circle xp ${classForNumber(card.stats.bonus.xp)}`}>
              {formatBigNumberWithBreak(card.stats.bonus.xp)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.power > 0 &&
            <div className={`circle power ${classForNumber(card.stats.bonus.power)}`}>
              {formatBigNumberWithBreak(card.stats.bonus.power)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.development > 0 &&
            <div className={`circle development ${classForNumber(card.stats.bonus.development)}`}>
              {formatBigNumberWithBreak(card.stats.bonus.development)}
            </div>
          }
        </div>
      }

      {
        played &&
        canRemove &&
        <div
          className="remove-card-wrapper"
          onClick={() => {
            openConfirmRemoveModal(slot, locationIndex, containerIndex, containerSlotIndex);
          }}
        >
          <ChevronDownIcon />
        </div>
      }

      {
        card.stats.type === 'Container' && played && goToContainer &&
        <div className="go-to-container-wrapper" onClick={goToContainer}>
          <MagnifyingGlassIcon />
        </div>
      }
    </div>
  );
};

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
