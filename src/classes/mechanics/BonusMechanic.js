import CoreMechanic from './CoreMechanic';
import Mechanic from '../Mechanic';

export default class BonusMechanic extends CoreMechanic {
  onPlay(state) {
    return this.updateValue(state, this.card.bonus[this.stat]);
  }

  onWithdraw(state) {
    return this.updateValue(state, -this.card.bonus[this.stat]);
  }
}

Mechanic.registerMechanic('bonus', BonusMechanic);
