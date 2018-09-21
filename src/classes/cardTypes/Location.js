import cardsConfig from '../../constants/cards.json';
import Card from '../Card';
import CardSlot from '../CardSlot';
import Mechanic from '../Mechanic';

export default class LocationCard extends Card {
  constructor(data) {
    super(data);

    this.minDropSlots = cardsConfig.locationMinSlots;
    this.minEmptyDropSlots = cardsConfig.visibleEmptySlots;

    this.dropSlots = new Array(this.minDropSlots);

    this.mechanics.push(Mechanic.getInstance('location', this, ['space']));
    this.mechanics.push(Mechanic.getInstance('location', this, ['power']));

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this, i);
    }
  }

  addNewDropSlot() {
    const filledDropSlots = this.dropSlots.filter(({ card }) => card).length;
    const emptyDropSlots = this.dropSlots.length - filledDropSlots;

    if (emptyDropSlots < this.minEmptyDropSlots) {
      this.dropSlots.push(new CardSlot(this, this.dropSlots.length));
    }
  }

  removeDropSlot(dropSlot) {
    if (this.dropSlots.length > this.minDropSlots) {
      this.dropSlots.splice(this.dropSlots.indexOf(dropSlot), 1);

      this.dropSlots = this.dropSlots.map((_dropSlot, index) => {
        _dropSlot.index = index;
        return _dropSlot;
      });
    }
  }

  levelUp(state, dropSlot) {
    const leveledUp = super.levelUp(state, dropSlot);
    leveledUp.power = dropSlot.card.power;
    leveledUp.space = dropSlot.card.space;

    return leveledUp;
  }
}

Card.registerTypeConstructor('Location', LocationCard);
