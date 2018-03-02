import React from 'react';
import PropTypes from 'prop-types';

import './GameplayItem.scss';

const GameplayItem = ({ cards, isOver }) => (
  <div
    className={`
      gameplay-item-wrapper
      ${isOver && 'hovering'}
    `}
  >
    Num stacked assets: { cards.length }
  </div>
);

GameplayItem.defaultProps = {
  cards: [],
  isOver: false,
};

GameplayItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
};

export default GameplayItem;
