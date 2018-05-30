import Card from '../Card';
import ContainerCardSlot from '../slotTypes/ContainerCardSlot';

export default class ContainerCard extends Card {
  constructor(data) {
    super(data);

    this.dropSlots = new Array(data.values.space);
    this.space = data.values.space;

    // this.mechanics.push(Mechanic.getInstance('container', this));

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new ContainerCardSlot(this, null);
    }
  }
}

Card.registerTypeConstructor('Container', ContainerCard);
