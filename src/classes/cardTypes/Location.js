import cardsConfig from '../../constants/cards.json';
import CardSlot from '../CardSlot';
import Card from '../Card';
import LocationMechanic from '../mechanics/LocationMechanic';

export default class LocationCard extends Card {
  constructor(data) {
    super(data);

    this.dropSlots = new Array(cardsConfig.locationMinSlots);
    this.power = data.stats.values.power;
    this.space = data.stats.values.space;

    for (let i = 0; i < this.dropSlots.length; i += 1) {
      this.dropSlots[i] = new CardSlot(this);
    }
  }

  onPlayChild(state, child) {
    child.mechanics.push(new LocationMechanic('space'));
    child.mechanics.push(new LocationMechanic('power'));
    return super.onPlayChild(state, child);
  }
}

Card.registerTypeConstructor('Location', LocationCard);
