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
    <h4>Faction: {card.stats.faction}</h4>

    <h4>
      Cost:
      {
        Object.keys(card.stats.cost).map(singleCost => (
          <div key={guid()}>{ singleCost }: { card.stats.cost[singleCost] }</div>
        ))
      }
    </h4>
    <h4>
      Bonus:
      {
        Object.keys(card.stats.bonus).map((singleBonus) => (
          <div key={guid()}>{ singleBonus }: { card.stats.bonus[singleBonus] }</div>
        ))
      }
    </h4>
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
