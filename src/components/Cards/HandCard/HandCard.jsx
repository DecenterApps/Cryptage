import React from 'react';
import PropTypes from 'prop-types';
import { guid, formatBigNumber, range } from '../../../services/utils';
import HoverInfo from '../../HoverInfo/HoverInfo';
import ChevronDownIcon from '../../Decorative/ChevronDownIcon';
import MagnifyingGlassIcon from '../../Decorative/MagnifyingGlassIcon';

import './HandCard.scss';

const classForNumber = (_number) => {
  const number = parseInt(_number, 10);
  if (number >= 10000000) return 'small';
  if (number >= 1000000) return '';
  if (number >= 10000) return 'small';
  if (number >= 1000) return '';
  if (number >= 100) return 'smaller';
  return '';
};

const HandCard = ({
  card, showCount, hoverCentered, played, remainingSlots, goToContainer,
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
      <HoverInfo card={card} center={hoverCentered} />
      <div className="level-wrapper">
        <svg className="level-background">
          <defs>
            <linearGradient id={`card-level-gradient-${uniqueId}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: gradients[card.stats.type.toLowerCase()][0] }} />
              <stop offset="100%" style={{ stopColor: gradients[card.stats.type.toLowerCase()][1] }} />
            </linearGradient>
          </defs>
          <polygon points="0,0 27,0 27,27" fill={`url(#card-level-gradient-${uniqueId})`} />
        </svg>
        <div className="level">1</div>
        {
          // TODO Level is hardcoded to 1
        }
      </div>
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
              href={`/cardImages/${card.stats.image}`}
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
            card.stats.cost.space &&
            card.stats.cost.space > 1 &&
            <div className={`circle blue ${classForNumber(card.stats.cost.space)}`}>
              {formatBigNumber(card.stats.cost.space, true)}
            </div>
          }
          {
            card.stats.cost.power &&
            <div className={`circle red ${classForNumber(card.stats.cost.power)}`}>
              {formatBigNumber(card.stats.cost.power, true)}
            </div>
          }
          {
            card.stats.cost.funds &&
            <div className={`circle yellow ${classForNumber(card.stats.cost.funds)}`}>
              {formatBigNumber(card.stats.cost.funds, true)}
            </div>
          }
          {
            card.stats.cost.level &&
            card.stats.cost.level > 1 &&
            <div className={`circle blue ${classForNumber(card.stats.cost.level)}`}>
              {formatBigNumber(card.stats.cost.level, true)}
            </div>
          }
          {
            card.stats.cost.time &&
            <div className={`circle yellow ${classForNumber(card.stats.cost.time)}`}>
              {formatBigNumber(card.stats.cost.time, true)}
            </div>
          }
          {
            card.stats.cost.development &&
            <div className={`circle red ${classForNumber(card.stats.cost.development)}`}>
              {formatBigNumber(card.stats.cost.development, true)}
            </div>
          }
        </div>
      }
      {
        (card.stats.values || card.stats.bonus) &&
        <div className="values">
          {
            card.stats.values &&
            card.stats.values.space &&
            <div className={`circle blue ${classForNumber(card.stats.values.space)}`}>
              {formatBigNumber(card.stats.values.space, true)}
            </div>
          }
          {
            card.stats.values &&
            card.stats.values.power &&
            <div className={`circle red ${classForNumber(card.stats.values.power)}`}>
              {formatBigNumber(card.stats.values.power, true)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.funds &&
            <div className={`circle yellow ${classForNumber(card.stats.bonus.funds)}`}>
              {formatBigNumber(card.stats.bonus.funds, true)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.xp &&
            <div className={`circle yellow ${classForNumber(card.stats.bonus.xp)}`}>
              {formatBigNumber(card.stats.bonus.xp, true)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.power &&
            <div className={`circle red ${classForNumber(card.stats.bonus.power)}`}>
              {formatBigNumber(card.stats.bonus.power, true)}
            </div>
          }
          {
            card.stats.bonus &&
            card.stats.bonus.development &&
            <div className={`circle red ${classForNumber(card.stats.bonus.development)}`}>
              {formatBigNumber(card.stats.bonus.development, true)}
            </div>
          }
        </div>
      }

      {
        played &&
        <div className="remove-card-wrapper">
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
  showCount: true,
  hoverCentered: false,
  played: false,
  remainingSlots: 0,
  goToContainer: null,
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
};

export default HandCard;
