import Mechanic from '../Mechanic';

export default class ContainerMechanic extends Mechanic {
  canPlayChild(state, child) {
    const locationHasEnoughPower = this.card.parent.power >= child.cost.power;

    if (!locationHasEnoughPower) return { canDropInContainer: false };

    return {
      canDropInContainer: this.card.dropSlots.some(slot => slot.isEmpty()),
    };
  }

  onPlayChild(state, child) {
    this.card.parent.power -= child.cost.power;
    this.card.space -= 1;
    return state;
  }

  onWithdrawChild(state, child) {
    this.card.parent.power += child.cost.power;
    this.card.space += 1;
    return state;
  }
}

Mechanic.registerMechanic('container', ContainerMechanic);
