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

    this.events = [];

    this.mechanics.push(Mechanic.getInstance('location', this, ['space']));
    this.mechanics.push(Mechanic.getInstance('location', this, ['power']));
    this.mechanics.push(Mechanic.getInstance('eventMechanic', this));

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this, i);
    }
  }

  addEvent(state, id, name, params) {
    this.events.push({ id, name, params });
    return this._on('onAddEvent', state, name, params);
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

      this.dropSlots = this.dropSlots.map((_cardSlot, index) => {
        const cardSlot = _cardSlot;
        cardSlot.index = index;
        return cardSlot;
      });
    }
  }
}

Card.registerTypeConstructor('Location', LocationCard);
