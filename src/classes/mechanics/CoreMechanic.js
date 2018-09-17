import Mechanic from '../Mechanic';
import CostMechanic from './CostMechanic';

export default class CoreMechanic extends CostMechanic {
  constructor(card, stat, isPermanent = false) {
    super(card, stat);

    this.isPermanent = isPermanent;
  }

  updateValue(_state, delta) {
    const state = _state;

    state.stats = {
      ...state.stats, [this.stat]: this.getValue(state) + delta,
    };
    return state;
  }

  onPlay(state, dropSlot, reSlotted) {
    if (this.isPermanent && reSlotted) return state;

    return this.updateValue(state, -this.card.cost[this.stat]);
  }

  onWithdraw(state) {
    this.unsubscribeAll();

    if (this.isPermanent) return state;
    return this.updateValue(state, this.card.cost[this.stat]);
  }
}

Mechanic.registerMechanic('core', CoreMechanic);
