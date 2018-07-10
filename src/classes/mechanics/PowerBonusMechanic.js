import Mechanic from '../Mechanic';
import BonusMechanic from './BonusMechanic';

export default class PowerBonusMechanic extends BonusMechanic {
  constructor(card) {
    super(card, 'power');
  }

  updateValue(state, value) {
    this.card.findParent().power += value;
    return state;
  }
}

Mechanic.registerMechanic('powerBonusMechanic', PowerBonusMechanic);
