import Mechanic from '../Mechanic';
import BonusMechanic from './BonusMechanic';

export default class ProjectPerCompletionFpbBoost extends BonusMechanic {
  constructor(card, multiplierPerExecution) {
    super(card, 'fundsPerBlock');
    this.multiplierPerExecution = multiplierPerExecution;
    this.lastBoostAmount = 0;
  }

  onProjectEnd(_state) {
    let state = _state;

    if (this.lastBoostAmount > 0) {
      state = this.card.changeBonuses(state, { fundsPerBlock: { absolute: -this.lastBoostAmount, relative: 0 } });
    }

    this.lastBoostAmount = this.card.timesFinished * this.multiplierPerExecution;
    state = this.card.changeBonuses(state, { fundsPerBlock: { absolute: this.lastBoostAmount, relative: 0 } });

    state.stats.fundsPerBlock += this.card.getGainsStatValue(this.stat);

    return state;
  }

  updateValue(state) {
    return state;
  }

  onWithdraw(_state) {
    this.unsubscribeAll();
    if (this.isPermanent) return _state;
    const state = this.card.changeBonuses(_state, { fundsPerBlock: { absolute: -this.lastBoostAmount, relative: 0 } });
    this.lastBoostAmount = 0;
    return this.onBeforeChangeBonuses(state);
  }
}

Mechanic.registerMechanic('projectPerCompletionFpbBoost', ProjectPerCompletionFpbBoost);
