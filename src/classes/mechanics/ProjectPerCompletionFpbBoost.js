import Mechanic from '../Mechanic';

export default class ProjectPerCompletionFpbBoost extends Mechanic {
  constructor(card, multiplierPerExecution) {
    super(card);

    this.multiplierPerExecution = multiplierPerExecution;
  }

  onProjectEnd(state) {
    const emptyAdditionalBonuses = {
      fundsPerBlock: { absolute: 0, relative: 0 },
    };
    emptyAdditionalBonuses.fundsPerBlock.absolute += this.card.timesFinished * this.multiplierPerExecution;

    return this.card.changeBonuses(state, emptyAdditionalBonuses);
  }
}

Mechanic.registerMechanic('projectPerCompletionFpbBoost', ProjectPerCompletionFpbBoost);
