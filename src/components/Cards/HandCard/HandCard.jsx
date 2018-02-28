import React from 'react';
import PropTypes from 'prop-types';

import './HandCard.scss';

const HandCard = ({ card }) => (
  <div className={`card-details type-${card.stats.type}`}>
    <div className="card-image">
      <img src={`/cardImages/${card.stats.image}`} alt="" />
    </div>
    <h3>{card.stats.title}</h3>
    <h4>{card.stats.type}</h4>
    <h4>Dev: {card.stats.dev}</h4>
    <h4>Inf: {card.stats.inf}</h4>
    <h4>Sec: {card.stats.sec}</h4>
    <h4>Cost: {card.stats.cost}</h4>
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

HandCard.defaultProps = {};

export default HandCard;
