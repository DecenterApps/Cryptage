import Card from '../Card';
import Mechanic from '../Mechanic';
import { mergeErrorMessages } from '../../services/utils';

export default class ProjectCard extends Card {
  constructor(data) {
    super(data);
    this.gains = this.bonus;
    this.bonus = {
      funds: 0,
      development: 0,
      experience: 0,
      fundsPerBlock: 0,
      power: 0,
    };

    this.running = false;
    this.expiryTime = null;
    this.timesFinished = 0;

    // TODO remove upgradeMechanic from this array
    this.mechanics.push(Mechanic.getInstance('projectExpiry', this));
  }

  getBonusStatValue() { return 0; }

  getGainsStatValue(stat) {
    const baseBonus = this.gains && this.gains[stat] ? this.gains[stat] : 0;
    const absBonus = this.additionalBonuses[stat].absolute;
    const relativeBonus = this.additionalBonuses[stat].relative;

    return (baseBonus + absBonus) * (1 + relativeBonus);
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

  restartProject(_state) {
    const state = _state;

    this.running = true;
    this.expiryTime = state.blockNumber + this.cost.time;

    state.stats.development -= this.cost.development;
    state.stats.funds -= this.cost.funds;

    return state;
  }
}

Card.registerTypeConstructor('Project', ProjectCard);
