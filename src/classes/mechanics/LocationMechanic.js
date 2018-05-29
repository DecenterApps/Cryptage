import CoreMechanic from './CoreMechanic';
import LocationCard from '../cardTypes/Location';

export default class LocationMechanic extends CoreMechanic {
  onPlay(state) { return state; }
  onWithdraw(state) { return state; }
  canPlay() {
    return {
      [this.stat]: true,
    };
  }

  canPlayChild(state, child) {
    return {
      power: this.card.power >= child.cost.power,
      space: this.card.space >= child.cost.space,
    };
  }

  getValue(state) {
    return this.card[this.stat];
  }

  updateValue(state, delta) {
    this.card[this.stat] += delta;
    return state;
  }

  onPlayChild(state, child) {
    return this.updateValue(state, -child.cost[this.stat]);
  }

  onWithdrawChild(state, child) {
    return this.updateValue(state, child.cost[this.stat]);
  }
}
