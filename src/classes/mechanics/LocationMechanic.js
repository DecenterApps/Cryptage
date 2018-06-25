import CoreMechanic from './CoreMechanic';
import Mechanic from '../Mechanic';

export default class LocationMechanic extends CoreMechanic {
  onPlay(state) { return state; }
  onWithdraw(state) {
    this.unsubscribeAll();
    return state;
  }
  canPlay() {
    return {
      [this.stat]: true,
    };
  }

  canPlayChild(state, child) {
    return {
      [this.stat]: this.card[this.stat] >= child.cost[this.stat],
    };
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

Mechanic.registerMechanic('location', LocationMechanic);
