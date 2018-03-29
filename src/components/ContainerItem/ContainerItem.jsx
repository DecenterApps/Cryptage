import React from 'react';
import PropTypes from 'prop-types';
import HandCard from '../Cards/HandCard/HandCard';

import './ContainerItem.scss';

const ContainerItem = ({ cards }) => (
  <div className="container-item-wrapper">
    <HandCard showCount={false} played card={cards[0]} />
  </div>
);

ContainerItem.defaultProps = {
  cards: [],
};

ContainerItem.propTypes = {
  cards: PropTypes.array,
};

export default ContainerItem;
