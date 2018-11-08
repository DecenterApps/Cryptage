import React from 'react';
import PropTypes from 'prop-types';

import './CardUpgradeButton.scss';

const CardUpgradeButton = ({ upgradeLevel, handleUpgrade, canUpgrade }) => (
  <button className="card-upgrade-button" disabled={!canUpgrade} onClick={handleUpgrade}>
    <span className="upgrade-number">{ upgradeLevel }</span>
    <span className="triangle" />
  </button>
);

CardUpgradeButton.propTypes = {
  upgradeLevel: PropTypes.number.isRequired,
  handleUpgrade: PropTypes.func.isRequired,
  canUpgrade: PropTypes.func.isRequired,
};

export default CardUpgradeButton;