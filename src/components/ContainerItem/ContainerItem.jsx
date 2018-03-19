import React from 'react';
import PropTypes from 'prop-types';

import './ContainerItem.scss';

const ContainerItem = ({ cards }) => (
  <div className="container-item-wrapper">
    <div>{ cards[0].stats.title }</div>
  </div>
);

ContainerItem.defaultProps = {
  cards: [],
};

ContainerItem.propTypes = {
  cards: PropTypes.array,
};

export default ContainerItem;
