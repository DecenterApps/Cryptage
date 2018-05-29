import cardsConfig from '../../constants/cards.json';
import Card from '../Card';
import CardSlot from '../CardSlot';
import LocationMechanic from '../mechanics/LocationMechanic';

export default class LocationCard extends Card {
  constructor(data) {
    super(data);

    this.dropSlots = new Array(cardsConfig.locationMinSlots);
    this.power = data.values.power;
    this.space = data.values.space;

    this.mechanics.push(new LocationMechanic(this, 'space'));
    this.mechanics.push(new LocationMechanic(this, 'power'));

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this);
    }
  }
}

Card.registerTypeConstructor('Location', LocationCard);
