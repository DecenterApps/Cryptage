import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { guid, formatBigNumber, range } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import ChevronDownIcon from '../../Decorative/ChevronDownIcon';
import MagnifyingGlassIcon from '../../Decorative/MagnifyingGlassIcon';
import { openConfirmRemoveModal } from '../../../actions/modalActions';

import './HandCard.scss';

const HandCard = ({
  card, showCount, hoverCentered, played, remainingSlots, goToContainer, openConfirmRemoveModal,
  locationIndex, containerIndex, slot, containerSlotIndex, draggingCard, canRemove,
}) => {
  const uniqueId = guid();
  const gradients = {
    misc: ['#3215E6', 'rgba(49, 20, 230, 0.33)'],
    power: ['#CE060D', 'rgba(206, 5, 13, 0.43)'],
    location: ['#3CC8CC', 'rgba(60, 200, 204, 0.33)'],
    development: ['#9F00C7', 'rgba(95, 38, 79, 0.41)'],
    project: ['#FF9D14', 'rgba(255, 157, 20, 0.36)'],
    mining: ['#75341F', 'rgba(117, 52, 30, 0.57)'],
    container: ['#4A7420', 'rgba(74, 116, 32, 0.41)'],
  };

  return (
    <div className={`card-details type-${card.stats.type.toLowerCase()}`}>
      { !draggingCard && <HoverInfo card={card} center={hoverCentered} /> }
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
                style={{ stopColor: gradients[card.stats.type.toLowerCase()][0] }}
              />
              <stop
                offset="100%"
                style={{ stopColor: gradients[card.stats.type.toLowerCase()][1] }}
              />
            </linearGradient>
          </defs>
          <polygon points="0,0 27,0 27,27" fill={`url(#card-level-gradient-${uniqueId})`} />
        </svg>
        <div className="level">1</div>
        {
          // TODO Level is hardcoded to 1
        }
      </div>
      <div className="overlay" />
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
          <clipPath id="card-image-cut">
            <polygon points="0,0 40,0 70,30 70,90 0,90" />
          </clipPath>
        </defs>
        <polygon
          className="card-image-inner"
          points="0,0 40,0 70,30 70,90 0,90"
          fill={`url(#card-background-${card.metadata.id}-${uniqueId})`}
          clipPath="url(#card-image-cut)"
        />
      </svg>
      {
        showCount && card.count > 1 &&
        <div className="count-wrapper">
          <div className="count">x{card.count}</div>
        </div>
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
        card.stats.cost &&
        <div className="cost">
          {
            card.stats.cost.space > 1 &&
            <div className="circle space">
              {formatBigNumber(card.stats.cost.space)}
            </div>
          }
          {
            card.stats.cost.power > 0 &&
            <div className="circle power">
              {formatBigNumber(card.stats.cost.power)}
            </div>
          }
          {
            card.stats.cost.funds > 0 &&
            <div className="circle funds">
              {formatBigNumber(card.stats.cost.funds)}
            </div>
          }
          {
            card.stats.cost.level > 1 &&
            <div className="circle level">
              {formatBigNumber(card.stats.cost.level)}
            </div>
          }
          {
            card.stats.cost.development > 0 &&
            <div className="circle development">
              {formatBigNumber(card.stats.cost.development)}
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
            <div className="circle space">
              {formatBigNumber(card.stats.values.space)}
            </div>
          }
          {
            card.stats.values &&
            card.stats.values.power > 0 &&
            <div className="circle power">
              {formatBigNumber(card.stats.values.power)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.funds > 0 &&
            <div className="circle funds">
              {formatBigNumber(card.stats.bonus.funds)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.xp > 0 &&
            <div className="circle xp">
              {formatBigNumber(card.stats.bonus.xp)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.power > 0 &&
            <div className="circle power">
              {formatBigNumber(card.stats.bonus.power)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.development > 0 &&
            <div className="circle development">
              {formatBigNumber(card.stats.bonus.development)}
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
};

const mapStateToProps = ({ app }) => ({
  draggingCard: app.draggingCard,
});

const mapDispatchToProps = {
  openConfirmRemoveModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(HandCard);
