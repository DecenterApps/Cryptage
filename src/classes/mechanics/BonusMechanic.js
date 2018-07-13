import CoreMechanic from './CoreMechanic';
import Mechanic from '../Mechanic';

export default class BonusMechanic extends CoreMechanic {
  constructor(card, stat, isPermanent = false) {
    super(card, stat);

    this.isPermanent = isPermanent;
  }

  canPlay() { return {}; }

  getValue() {
    return this.card.getBonusStatValue(this.stat);
  }

  updateValue(state, delta) {
    state.stats = {
      ...state.stats, [this.stat]: state.stats[this.stat] + delta,
    };
    return state;
  }

  onBeforeChangeBonuses(state) {
    return this.updateValue(state, -this.getValue());
  }

  onAfterChangeBonuses(state) {
    return this.updateValue(state, this.getValue());
  }

  onPlay(state) {
    return this.onAfterChangeBonuses(state);
  }

  onWithdraw(state) {
    this.unsubscribeAll();
    if (this.isPermanent) return state;
    return this.onBeforeChangeBonuses(state);
  }
}

Mechanic.registerMechanic('bonus', BonusMechanic);
