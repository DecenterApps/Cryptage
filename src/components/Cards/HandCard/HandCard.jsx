import React from 'react';
import PropTypes from 'prop-types';
import { guid, formatBigNumber } from '../../../services/utils';

import './HandCard.scss';

const classForNumber = (_number) => {
  const number = parseInt(_number, 10);
  if (number >= 10000000) return 'smalll';
  if (number >= 1000000) return '';
  if (number >= 10000) return 'small';
  if (number >= 1000) return '';
  if (number >= 100) return 'smaller';
  return '';
};

const HandCard = ({ card, showCount }) => (
  <div className={`card-details type-${card.stats.type.toLowerCase()}`}>
    <div className="level-wrapper">
      <svg className="level-background">
        <defs>
          <linearGradient id="card-level-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#9F00C7', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(95, 38, 79)', stopOpacity: 0.4 }} />
          </linearGradient>
        </defs>
        <polygon points="0,0 27,0 27,27" fill="url(#card-level-gradient)" />
      </svg>
      <div className="level">1</div>
      {
        // TODO Level is hardcoded to 1
      }
    </div>
    <svg className="card-image">
      <defs>
        <pattern
          id={`card-background-${card.metadata.id}`}
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
        fill={`url(#card-background-${card.metadata.id})`}
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
      card.stats.cost &&
      <div className="cost">
        {
          card.stats.cost.funds &&
          <div className={`circle funds ${classForNumber(card.stats.cost.funds)}`}>
            {formatBigNumber(card.stats.cost.funds)}
          </div>
        }
        {
          card.stats.cost.level &&
          <div className={`circle level ${classForNumber(card.stats.cost.level)}`}>
            {formatBigNumber(card.stats.cost.level)}
          </div>
        }
      </div>
    }
    {
      card.stats.values &&
      <div className="values">
        {
          card.stats.values.space &&
          <div className={`circle space ${classForNumber(card.stats.values.space)}`}>
            {formatBigNumber(card.stats.values.space)}
          </div>
        }
        {
          card.stats.values.power &&
          <div className={`circle power ${classForNumber(card.stats.values.power)}`}>
            {formatBigNumber(card.stats.values.power)}
          </div>
        }
      </div>
    }
    <div className="meta">
      <h3>{card.stats.title}</h3>
      <h4>Type: {card.stats.type}</h4>
      <h4 className="section-wrapper">
        Cost:
        {
          Object.keys(card.stats.cost).map(singleCost => (
            <div key={guid()}>{singleCost}: {card.stats.cost[singleCost]}</div>
          ))
        }
      </h4>
      {
        card.stats.bonus &&
        <h4 className="section-wrapper">
          Bonus:
          {
            Object.keys(card.stats.bonus).map(singleBonus => (
              <div key={guid()}>{singleBonus}: {card.stats.bonus[singleBonus]}</div>
            ))
          }
        </h4>
      }
      {
        card.stats.values &&
        <h4 className="section-wrapper">
          Values:
          {
            Object.keys(card.stats.values).map(singleValue => (
              <div key={guid()}>{singleValue}: {card.stats.values[singleValue]}</div>
            ))
          }
        </h4>
      }
    </div>
  </div>
);

HandCard.defaultProps = {
  card: {
    stats: {
      title: '',
      image: '',
    },
  },
  showCount: true,
};

HandCard.propTypes = {
  card: PropTypes.shape({
    stats: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
  showCount: PropTypes.bool,
};

export default HandCard;
