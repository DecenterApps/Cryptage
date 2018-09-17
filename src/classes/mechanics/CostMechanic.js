import Mechanic from '../Mechanic';

export default class CostMechanic extends Mechanic {
  constructor(card, stat) {
    super(card);
    this.stat = stat;
  }

  getValue(state) {
    return state.stats[this.stat];
  }

  canPlay(state) {
    return {
      [this.stat]: this.getValue(state) >= this.card.cost[this.stat],
    };
  }
}

Mechanic.registerMechanic('cost', CostMechanic);
