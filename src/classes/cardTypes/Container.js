import Card from '../Card';
import CardSlot from '../CardSlot';
import Mechanic from '../Mechanic';

export default class ContainerCard extends Card {
  constructor(data) {
    super(data);

    this.dropSlots = data ? new Array(data.values.containerSpace) : null;
    this.space = data ? data.values.space : null;

    this.mechanics.push(Mechanic.getInstance('container', this));

    if (this.dropSlots) {
      for (let i = 0; i < this.dropSlots.length; i += 1) {
        this.dropSlots[i] = new CardSlot(this, i);
      }
    }
  }
}

Card.registerTypeConstructor('Container', ContainerCard);
