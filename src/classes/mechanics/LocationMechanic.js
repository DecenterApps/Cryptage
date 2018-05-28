import CoreMechanic from './CoreMechanic';
import LocationCard from '../cardTypes/Location';

export default class LocationMechanic extends CoreMechanic {
  getValue(state) {
    return this.card.findParent(LocationCard)[this.stat];
  }

  updateValue(state, delta) {
    const location = this.card.findParent();
    location.values[this.stat] += delta;
    return state;
  }
}
