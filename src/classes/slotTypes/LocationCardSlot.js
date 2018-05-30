import CardSlot from '../CardSlot';
import LocationCard from '../cardTypes/Location';

export default class LocationCardSlot extends CardSlot {
  constructor(owner, card) {
    super(owner, card);
    this.acceptedTags = ['location'];
  }

  async canDrop(state, card) {
    const res = await super.canDrop(state, card);
    return {
      ...res,
      allowed: res.allowed && (card instanceof LocationCard),
    };
  }
}
