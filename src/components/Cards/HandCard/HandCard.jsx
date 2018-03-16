import React from 'react';
import PropTypes from 'prop-types';
import { guid } from '../../../services/utils';

import './HandCard.scss';

const HandCard = ({ card }) => (
  <div className={`card-details type-${card.stats.type.toLowerCase()}`}>
    <div className="card-image">
      <img src={`/cardImages/${card.stats.image}`} alt="" />
    </div>
    <h3>{card.stats.title}</h3>
    <h4>Type: {card.stats.type}</h4>

    <h4 className="section-wrapper">
      Cost:
      {
        Object.keys(card.stats.cost).map(singleCost => (
          <div key={guid()}>{ singleCost }: { card.stats.cost[singleCost] }</div>
        ))
      }
    </h4>
    {
      card.stats.bonus &&
      <h4 className="section-wrapper">
        Bonus:
        {
          Object.keys(card.stats.bonus).map(singleBonus => (
            <div key={guid()}>{ singleBonus }: { card.stats.bonus[singleBonus] }</div>
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
            <div key={guid()}>{ singleValue }: { card.stats.values[singleValue] }</div>
          ))
        }
      </h4>
    }
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
