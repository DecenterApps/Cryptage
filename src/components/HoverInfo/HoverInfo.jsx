import React from 'react';
import PropTypes from 'prop-types';

import './HoverInfo.scss';

const HoverInfo = ({ card, center }) => (
  <div className={`card-hover-info-wrapper ${center && 'center'} ${card.stats.type.toLowerCase()}`}>
    <div
      className="inner-wrapper"
      style={{ backgroundImage: `url('/cardImages/${card.stats.image}')` }}
    >
      <div className="meta">
        <div className="type">{card.stats.type}</div>
        <div className="meta-inner">
          <div className="title">{card.stats.title}</div>
          <div className="description">
            {card.stats.description}
          </div>
        </div>
      </div>
    </div>
  </div>
);

HoverInfo.defaultProps = {};

HoverInfo.propTypes = {
  center: PropTypes.bool.isRequired,
  card: PropTypes.shape({}).isRequired,
};

export default HoverInfo;
