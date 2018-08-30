import CardSlot from '../CardSlot';
import LocationCard from '../cardTypes/Location';

export default class LocationCardSlot extends CardSlot {
  constructor(index) {
    super(undefined, index);
    this.acceptedTags = ['location'];
  }

  canDrop(state, card) {
    const res = super.canDrop(state, card);
    return {
      ...res,
      allowed: res.allowed && (card instanceof LocationCard),
    };
  }
}
