import Card from '../Card';
import { LocationCardSlot } from '../CardSlot';

export default class LocationCard extends Card {

  canDrop(slot) {
    return slot.isEmpty() && slot instanceof LocationCardSlot;
  }
}
