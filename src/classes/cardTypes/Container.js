import Card from '../Card';
import CardSlot from '../CardSlot';

export default class ContainerCard extends Card {
  constructor(data) {
    super(data);
    this.dropSlots = new Array(data.stats.values.space);

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this);
    }
  }
}

Card.registerTypeConstructor('Container', ContainerCard);
