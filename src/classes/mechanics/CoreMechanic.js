import Mechanic from '../Mechanic';

export default class CoreMechanic extends Mechanic {

  constructor(card, stat) {
    super(card);
    this.stat = stat;
  }

  getValue(state) {
    return state.stats[this.stat];
  }

  updateValue(state, delta) {
    return {
      ...state,
      stats: {
        ...state.stats, [this.stat]: this.getValue(state) + delta,
      },
    };
  }

  onPlay(state) {
    return this.updateValue(state, -this.card.cost[this.stat]);
  }

  onWithdraw(state) {
    return this.updateValue(state, this.card.cost[this.stat]);
  }

  canPlay(state, dropSlot) {
    return {
      [this.stat]: this.getValue(state) >= this.card.cost[this.stat],
    };
  }
}

