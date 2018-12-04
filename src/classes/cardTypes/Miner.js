import Card from '../Card';
import UpgradeMechanic from '../mechanics/UpgradeMechanic';

export default class MinerCard extends Card {
  constructor(data) {
    super(data);

    const upgradeIndex = this.mechanics.findIndex(m => m instanceof UpgradeMechanic);
    this.mechanics.splice(upgradeIndex, 1);
  }
}

Card.registerTypeConstructor('Mining', MinerCard);
