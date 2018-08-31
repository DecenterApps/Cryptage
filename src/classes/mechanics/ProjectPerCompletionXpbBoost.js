import Mechanic from '../Mechanic';
import BonusMechanic from './BonusMechanic';

export default class ProjectPerCompletionXpbBoost extends BonusMechanic {
  constructor(card, multiplierPerExecution) {
    super(card, '');
    this.multiplierPerExecution = multiplierPerExecution;
    this.boostAmount = 0;
  }

  onPlay(state) {
    this.boostAmount = this.card.timesFinished * this.multiplierPerExecution;
    return state;
  }

  onProjectEnd(state) {
    this.boostAmount = this.card.timesFinished * this.multiplierPerExecution;
    return state;
  }

  updateValue(state) {
    return state;
  }

  block(_state) {
    const state = _state;
    state.stats.experience += this.boostAmount;

    return state;
  }

  canWithdraw() {
    return {
      [this.stat]: true,
    };
  }

  onWithdraw(state) {
    this.unsubscribeAll();
    this.boostAmount = 0;
    return this.onBeforeChangeBonuses(state);
  }
}

Mechanic.registerMechanic('projectPerCompletionXpbBoost', ProjectPerCompletionXpbBoost);
