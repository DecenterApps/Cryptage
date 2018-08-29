import Card from '../Card';
import CardSlot from '../CardSlot';
import Mechanic from '../Mechanic';

export default class LocationCard extends Card {
  constructor(data) {
    super(data);

    this.dropSlots = new Array(this.minDropSlots);
    this.power = data ? data.values.power : null;
    this.space = data ? data.values.space : null;

    this.mechanics.push(Mechanic.getInstance('location', this, ['space']));
    this.mechanics.push(Mechanic.getInstance('location', this, ['power']));

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this);
    }
  }
}

Card.registerTypeConstructor('Location', LocationCard);
