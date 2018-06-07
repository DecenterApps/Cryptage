import Mechanic from '../Mechanic';
import CostMechanic from './CostMechanic';

export default class CoreMechanic extends CostMechanic {
  updateValue(state, delta) {
    state.stats = {
      ...state.stats, [this.stat]: this.getValue(state) + delta,
    };
    return state;
  }

  onPlay(state) {
    return this.updateValue(state, -this.card.cost[this.stat]);
  }

  onWithdraw(state) {
    return this.updateValue(state, this.card.cost[this.stat]);
  }
}

Mechanic.registerMechanic('core', CoreMechanic);
