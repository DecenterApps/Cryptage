import Mechanic from '../Mechanic';
import CoreMechanic from './CoreMechanic';

export default class ContainerMechanic extends CoreMechanic {
  canPlayChild(state, child) {

    const locationHasEnoughPower = this.card.parent.power >= child.cost.power;
    if (!locationHasEnoughPower) return { canDropInContainer: false };

    const atLeastOneEmptySlot = this.card.dropSlots.some(slot => slot.isEmpty());
    if (atLeastOneEmptySlot) return { canDropInContainer: true };

    return {
      canDropInContainer: this.card.dropSlots.some(slot => slot.card.canLevelUp(state, slot)),
    };
  }

  onPlayChild(state, child) {
    this.card.parent.power -= child.cost[this.stat];
    this.card.space -= 1;
    return state;
  }

  onWithdrawChild(state, child) {
    this.card.parent.power += child.cost[this.stat];
    this.card.space += 1;
    return state;
  }
}

Mechanic.registerMechanic('container', ContainerMechanic);
