import CoreMechanic from './CoreMechanic';
import Mechanic from '../Mechanic';

export default class BonusMechanic extends CoreMechanic {
  getValue() {
    return this.card.getBonusStatValue(this.stat);
  }

  updateValue(state, delta) {
    state.stats = {
      ...state.stats, [this.stat]: delta,
    };
    return state;
  }

  onBeforeChangeBonuses(state) {
    return this.onWithdraw(state);
  }

  onAfterChangeBonuses(state) {
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
