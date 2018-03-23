import React from 'react';
import PropTypes from 'prop-types';
import { guid } from '../../../services/utils';

import './HandCard.scss';

const HandCard = ({ card }) => (
  <div className={`card-details type-${card.stats.type.toLowerCase()}`}>
    <div className="level-wrapper">
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
          <polygon points="0,0 40,0 70,30 70,90 30,90 0,60" />
        </clipPath>
      </defs>
      <polygon
        className="card-image-inner"
        points="0,0 40,0 70,30 70,90 30,90 0,60"
        fill={`url(#card-background-${card.metadata.id})`}
        clipPath="url(#card-image-cut)"
      />
    </svg>
    <div className="count-wrapper">
      <div className="count">1</div>
      {
        // TODO Count is hardcoded to 1
      }
    </div>
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
};

HandCard.propTypes = {
  card: PropTypes.shape({
    stats: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
};

export default HandCard;
