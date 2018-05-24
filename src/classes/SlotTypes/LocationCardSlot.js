import CardSlot from '../CardSlot';
import LocationCard from '../cardTypes/Location';

export default class LocationCardSlot extends CardSlot {
  async canDrop(state, card) {
    return await super.canDrop(state, card) && (card instanceof LocationCard);
  }
}
