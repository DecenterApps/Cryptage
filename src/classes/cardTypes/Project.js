import Card from '../Card';
import Mechanic from '../Mechanic';
import { mergeErrorMessages } from '../../services/utils';

export default class ProjectCard extends Card {
  constructor(data, state) {
    super(data);

    this.running = true;
    this.expiryTime = state.blockNumber + this.cost.time;
    this.timesFinished = 0;

    this.mechanics.push(Mechanic.getInstance('projectExpiry', this));
  }

  canRestart(state) {
    return mergeErrorMessages({
      development: this.cost.development > state.stats.development,
      funds: this.cost.funds > state.stats.funds,
      projectActive: !this.card.running,
    });
  }

  restartProject(state) {
    this.running = true;
    this.expiryTime = state.blockNumber + this.cost.time;

    state.stats.development -= this.cost.development;
    state.stats.funds -= this.cost.funds;

    return state;
  }
}

Card.registerTypeConstructor('Project', ProjectCard);
