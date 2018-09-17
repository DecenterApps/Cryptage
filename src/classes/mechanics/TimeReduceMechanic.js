import Mechanic from '../Mechanic';

export default class TimeReduceMechanic extends Mechanic {
  constructor(card, percentToReduce) {
    super(card);
    this.percentToReduce = percentToReduce;
  }

  onPlay(_state) {
    const state = _state;
    const percentToDeduct = Math.ceil((this.percentToReduce / 100) * state.projectExecutionTimePercent);

    this.percentReduced = percentToDeduct;
    state.projectExecutionTimePercent -= percentToDeduct;

    if (state.projectExecutionTimePercent < 0) {
      state.projectExecutionTimePercent = 0;
    }

    return state;
  }

  onWithdraw(_state) {
    const state = _state;

    state.projectExecutionTimePercent += this.percentReduced;

    if (state.projectExecutionTimePercent > 100) {
      state.projectExecutionTimePercent = 100;
    }

    return super.onWithdraw(state);
  }
}

Mechanic.registerMechanic('timeReduce', TimeReduceMechanic);
