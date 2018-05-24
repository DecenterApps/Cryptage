import CoreMechanic from './CoreMechanic';
import LocationCard from '../cardTypes/Location';

export default class LocationMechanic extends CoreMechanic {
  getValue(state) {
    return this.card.findParent(LocationCard)[this.stat];
  }

  updateValue(state, delta) {
    const location = this.card.findParent(LocationCard);
    location[this.state] += delta;
    return state;
  }
}
