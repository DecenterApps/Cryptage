import Mechanic from '../Mechanic';
import BonusMechanic from './BonusMechanic';

export default class ProjectPerCompletionFpbBoost extends BonusMechanic {
  constructor(card, multiplierPerExecution) {
    super(card, 'fundsPerBlock');
    this.multiplierPerExecution = multiplierPerExecution;
  }

  onProjectEnd(state) {
    const emptyAdditionalBonuses = {
      fundsPerBlock: { absolute: 0, relative: 0 },
    };

    emptyAdditionalBonuses.fundsPerBlock.absolute += this.card.timesFinished * this.multiplierPerExecution;

    state = this.card.changeBonuses(state, emptyAdditionalBonuses);

    state.stats.fundsPerBlock += this.card.getGainsStatValue(this.stat);
    return state;
  }

  updateValue(state) {
    return state;
  }
}

Mechanic.registerMechanic('projectPerCompletionFpbBoost', ProjectPerCompletionFpbBoost);
