import Mechanic from '../Mechanic';
import BonusMechanic from './BonusMechanic';

export default class PowerBonusMechanic extends BonusMechanic {
  getValue() {
    return this.card.findParent().getBonusStatValue('power');
  }

  updateValue(state, value) {
    this.card.findParent().power += value;
    return state;
  }
}

Mechanic.registerMechanic('powerBonus', PowerBonusMechanic);
