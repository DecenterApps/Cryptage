import React from 'react';
import PropTypes from 'prop-types';

import './BoosterCard.scss';

const Card = ({ card }) => (
  <div className={`card-wrapper type-${card.stats.type}`}>
    <div className="card-image">
      <img src={`/cardImages/${card.stats.image}`} alt="" />
    </div>
  </div>
);

Card.defaultProps = {
  card: {
    stats: {
      title: '(empty)',
      image: '(empty)',
    },
  },
};

Card.propTypes = {
  card: PropTypes.shape({
    stats: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
    }).isRequired,
  }),
};

export default Card;
