import Mechanic from '../Mechanic';
import { getMilestoneLevel } from '../../services/gameMechanicsService';
import Card from '../Card';

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
    const instance = Card.getLeveledInstance(state, card.id, card);

    if (!instance.cost) return { noNextLevel: false };

    return {
      upgradeFunds: state.stats.funds >= instance.calcUpgradeDiscount(instance.cost.funds),
    };
  }

  block(_state, blockNumber) {
    const state = _state;

    if (this.card.upgradeExpiryTime && (this.card.upgradeExpiryTime - blockNumber <= 0)) {
      this.card.upgradeExpiryTime = null;
      this.card.upgradeFinished = true;

      if (this.card.parent) {
        const dropSlot = this.card.parent.dropSlots.find(({ card }) => card && card.id === this.card.id);
        console.log('ON DELAY END LEVEL UP ASSET', dropSlot);
        return dropSlot.levelUp(state, true);
      }

      // it is a location card
      if (!this.card.parent) {
        const dropSlot = state.locationSlots.find(({ card }) => card && card.id === this.card.id);
        console.log('ON DELAY END LEVEL UP LOCATION');
        return dropSlot.levelUp(state, true);
      }

      return state;
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
