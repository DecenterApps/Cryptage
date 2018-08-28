import React from 'react';
import PropTypes from 'prop-types';

import './BonusCostIcons.scss';

const BonusCostIcon = ({ type }) => (
  <div className={`bonus-cost-icon ${type}`} />
);

BonusCostIcon.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BonusCostIcon;