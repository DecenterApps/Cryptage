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
    // do not add bonuses onPlay or set that those bonuses are params
    // for the projectExpiry mechanic
  }

  onProjectEnd(state) {
    return this._on('onProjectEnd', state);
  }

  canRestart(state) {
    return mergeErrorMessages({
      development: state.stats.development >= this.cost.development,
      funds: state.stats.funds >= this.cost.funds,
      projectActive: !this.running,
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
