import Mechanic from '../Mechanic';
import CoreMechanic from './CoreMechanic';

export default class ContainerMechanic extends CoreMechanic {
  async canPlayChild(state, child) {
    const matchesTag = this.card.acceptedTags.some(acceptedTag => child.tags.includes(acceptedTag));
    const locationHasEnoughPower = this.card.parent.power >= child.cost.power;
    if (!matchesTag || !locationHasEnoughPower) return { canDropInContainer: false };

    const atLeastOneEmptySlot = this.card.dropSlots.some(slot => slot.isEmpty());
    if (atLeastOneEmptySlot) return { canDropInContainer: true };

    const promiseMap = this.card.dropSlots.map(slot => slot.card.canLevelUp(state, slot));

    return await Promise.all(promiseMap).then(res => (
      { canDropInContainer: res.incldes(true) }
    ));
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
