import React from 'react';
import PropTypes from 'prop-types';

import './CardUpgradeButton.scss';

const CardUpgradeButton = ({
  upgradeLevel, handleUpgrade, canUpgrade, dropDownContent,
}) => (
  <div className="card-upgrade-button-wrapper">
    <button className="card-upgrade-button" disabled={!canUpgrade} onClick={handleUpgrade}>
      <span className="upgrade-number">{ upgradeLevel }</span>
      <span className="triangle" />
    </button>

    <div className="upgrade-dropdown">{ dropDownContent }</div>
  </div>
);

CardUpgradeButton.propTypes = {
  upgradeLevel: PropTypes.number.isRequired,
  handleUpgrade: PropTypes.func.isRequired,
  canUpgrade: PropTypes.bool.isRequired,
  dropDownContent: PropTypes.string.isRequired,
};

export default CardUpgradeButton;