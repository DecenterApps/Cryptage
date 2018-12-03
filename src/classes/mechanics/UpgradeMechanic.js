import Mechanic from '../Mechanic';
import { getMilestoneLevel } from '../../services/gameMechanicsService';

export default class UpgradeMechanic extends Mechanic {
  static calcStacksRequiredForUpgrade({ level, stackedCards }){
    const milestoneLevel = getMilestoneLevel(level + 1);

    if (!milestoneLevel) return true;

    return stackedCards.length >= milestoneLevel.stacks;
  }

  static calcUpgradeLocationLimit(card) {
    const locationCard = card.findParent();

    if (!locationCard || !card) return false;
    else if (card.level - locationCard.level >= 25) return false;

    return true;
  }

  static getFundsErrors(state, card) {
    const instance = card.getLeveledInstance(state, this.id, this);

    if (!instance.cost) return { noNextLevel: false };

    return {
      upgradeFunds: state.stats.funds >= instance.calcUpgradeDiscount(instance.cost.funds),
    };
  }

  block(_state, blockNumber) {
    const state = _state;

    // TODO check if a card can be leveled up excluding the upgradeExpiryTime in canLevelUp, eg. not enough funds
    if (this.card.upgradeExpiryTime && (this.card.upgradeExpiryTime - blockNumber <= 0)) {
      this.card.upgradeExpiryTime = null;
      this.card.upgradeFinished = true;

      return this.card.levelUp(state);
    }

    return state;
  }

  canLevelUp(state) {
    return {
      maxLevel: this.card.level < 1000,
      upgradeExpiryTime: this.card.upgradeExpiryTime === null,
      stacksRequired: UpgradeMechanic.calcStacksRequiredForUpgrade(this.card),
      locationLimit: UpgradeMechanic.calcUpgradeLocationLimit(this.card),
      ...UpgradeMechanic.getFundsErrors(state, this.card),
    };
  }

  onWithdraw(state) {
    this.card.upgradeExpiryTime = null;
    this.card.upgradeFinished = false;

    return state;
  }
}

Mechanic.registerMechanic('upgradeMechanic', UpgradeMechanic);
