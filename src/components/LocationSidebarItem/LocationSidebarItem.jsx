import React from 'react';
import PropTypes from 'prop-types';

import './LocationSidebarItem.scss';

// ${(activeLocationIndex === index) && 'active'}
const LocationSidebarItem = ({ isOver, cards }) => (
  <div
    className={`
      location-sidebar-item-wrapper
      ${isOver && 'hovering'}
    `}
  >
    Num stacked locations: { cards.length }
  </div>
);

LocationSidebarItem.defaultProps = {
  cards: [],
  isOver: false,
};

LocationSidebarItem.propTypes = {
  cards: PropTypes.array,
  isOver: PropTypes.bool,
};

export default LocationSidebarItem;
