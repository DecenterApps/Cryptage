import Mechanic from '../Mechanic';

export default class TimeReduceMechanic extends Mechanic {
  onPlay(state, percentToReduce) {
    const percentToDeduct = Math.ceil((percentToReduce / 100) * state.projectExecutionTimePercent);
    this.percentReduced = percentToDeduct;
    state.projectExecutionTimePercent -= percentToDeduct;

    if (state.projectExecutionTimePercent < 0) {
      state.projectExecutionTimePercent = 0;
    }

    return state;
  }

  onWithdraw(state) {
    state.projectExecutionTimePercent += this.percentReduced;

    if (state.projectExecutionTimePercent > 100) {
      state.projectExecutionTimePercent = 100;
    }

    return state;
  }
}

Mechanic.registerMechanic('timeReduce', TimeReduceMechanic);
