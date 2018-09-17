import Mechanic from '../Mechanic';

export default class ProjectGlobalStatPercentBoost extends Mechanic {
  constructor(card, globalStat, boostPercent) {
    super(card);

    this.globalStat = globalStat;
    this.boostPercent = boostPercent;
  }

  onProjectEnd(_state) {
    const state = _state;
    state.stats[this.globalStat] += Math.floor((this.boostPercent / 100) * state.stats[this.globalStat]);
    return state;
  }
}

Mechanic.registerMechanic('projectGlobalStatPercentBoost', ProjectGlobalStatPercentBoost);
