import Mechanic from '../Mechanic';
import { calcStacksRequiredForUpgrade, calcUpgradeLocationLimit } from '../../services/gameMechanicsService';

export default class UpgradeMechanic extends Mechanic {
  block(_state, blockNumber) {
    const state = _state;

    // TODO check if a card can be leveled up excluding the upgradeExpiryTime in canLevelUP
    if (this.card.upgradeExpiryTime && (this.card.upgradeExpiryTime - blockNumber <= 0)) {
      this.card.upgradeExpiryTime = null;
      this.card.upgradeFinished = true;

      return this.card.levelUp(state);
    }

    return state;
  }

  canLevelUp() {
    return {
      upgradeExpiryTime: this.card.upgradeExpiryTime === null,
      stacksRequired: calcStacksRequiredForUpgrade(this.card),
      locationLimit: calcUpgradeLocationLimit(this.card),
    };
  }

  onWithdraw(state) {
    this.card.upgradeExpiryTime = null;
    this.card.upgradeFinished = false;

    return state;
  }
}

Mechanic.registerMechanic('upgradeMechanic', UpgradeMechanic);
