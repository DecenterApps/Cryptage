import React from 'react';
import PropTypes from 'prop-types';
import BonusCostIcon from '../Decorative/BonusCostIcon/BonusCostIcon';
import Card from '../../classes/Card';

import './CardUpgradeButton.scss';

const CardUpgradeButton = ({
  upgradeLevel, handleUpgrade, canUpgrade, card, gameplay,
}) => {
  const getUpgradeCost = (state, card) => {
    const instance = Card.getLeveledInstance(state, card.id, card);

    return instance.calcUpgradeDiscount(instance.cost.funds);
  };

  return (
    <div className="card-upgrade-button-wrapper">
      <button className="card-upgrade-button" disabled={!canUpgrade} onClick={handleUpgrade}>
        <span className="upgrade-number">{ upgradeLevel }</span>
        <span className="triangle" />
      </button>

      <div className="upgrade-dropdown">
        {
          canUpgrade &&
          <div className="can-upgrade">
            <div className="heading">Upgrade cost</div>

            <div className="sum-wrapper">
              <BonusCostIcon type="funds" />

              <div className="data">
                <div className="price">{getUpgradeCost(gameplay, card)}</div>
                <div className="label">Funds</div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

CardUpgradeButton.defaultProps = {
  canUpgrade: false,
};

CardUpgradeButton.propTypes = {
  upgradeLevel: PropTypes.number.isRequired,
  handleUpgrade: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  gameplay: PropTypes.object.isRequired,
  canUpgrade: PropTypes.bool,
};

export default CardUpgradeButton;