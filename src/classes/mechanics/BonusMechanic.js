import CoreMechanic from './CoreMechanic';
import Mechanic from '../Mechanic';

export default class BonusMechanic extends CoreMechanic {
  getValue() {
    return this.card.getBonusStatValue(this.stat);
  }

  onBeforeChangeBonus(state) {
    return this.onWithdraw(state);
  }

  onAfterChangeBonus(state) {
    return this.onPlay(state);
  }

  onPlay(state) {
    return this.updateValue(state, this.getValue());
  }

  onWithdraw(state) {
    return this.updateValue(state, -this.getValue());
  }
}

Mechanic.registerMechanic('bonus', BonusMechanic);
