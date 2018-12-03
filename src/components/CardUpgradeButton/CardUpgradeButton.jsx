import React from 'react';
import PropTypes from 'prop-types';
import BonusCostIcon from '../Decorative/BonusCostIcon/BonusCostIcon';
import Card from '../../classes/Card';

import './CardUpgradeButton.scss';
import { getMilestoneLevel } from '../../services/gameMechanicsService';

const CardUpgradeButton = ({
  upgradeLevel, handleUpgrade, canUpgrade, card, gameplay, slot,
}) => {
  const getUpgradeCost = (state, card) => {
    const instance = Card.getLeveledInstance(state, card.id, card);

    return instance.calcUpgradeDiscount(instance.cost.funds);
  };

  const hasErrors = !slot || !canUpgrade.allowed;

  return (
    <div className="card-upgrade-button-wrapper">
      <button className="card-upgrade-button" disabled={hasErrors} onClick={handleUpgrade}>
        <span className="upgrade-number">{ upgradeLevel }</span>
        <span className="triangle" />
      </button>

      <div className={`upgrade-dropdown ${hasErrors && 'error-dropdown'}`}>
        {
          !hasErrors &&
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

        {
          (hasErrors && !canUpgrade.allowed) &&
          <div className="can-upgrade">
            {
              (canUpgrade.upgradeFunds === false) &&
              <div className="error-item">
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

            {
              (canUpgrade.upgradeExpiryTime === false) &&
              <div className="error-item">
                The upgrade delay is ongoing
              </div>
            }

            {
              (canUpgrade.stacksRequired === false) &&
              <div className="error-item">
                You need { getMilestoneLevel(card.level + 1).stacks } stacked cards.
              </div>
            }

            {
              (canUpgrade.locationLimit === false) &&
              <div className="error-item">
                A card can be only 25 levels higher than its location.
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
};

CardUpgradeButton.defaultProps = {
  canUpgrade: {
    allowed: false,
  },
  slot: null,
};

CardUpgradeButton.propTypes = {
  upgradeLevel: PropTypes.number.isRequired,
  handleUpgrade: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  gameplay: PropTypes.object.isRequired,
  canUpgrade: PropTypes.object,
  slot: PropTypes.object,
};

export default CardUpgradeButton;