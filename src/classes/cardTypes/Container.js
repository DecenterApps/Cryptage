import Card from '../Card';
import CardSlot from '../CardSlot';

export default class ContainerCard extends Card {
  // Add canPlayChild and onPlayChild which call Location canPlayChild and onPlayChild

  constructor(data) {
    super(data);
    this.dropSlots = new Array(data.stats.values.space);

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this);
    }
  }
}

Card.registerTypeConstructor('Container', ContainerCard);
