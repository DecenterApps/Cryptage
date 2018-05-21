import Mechanic from '.../Mechanic';

export default class Unique extends Mechanic {

  canPlay(state, destination) {

    if (!super.canPlay(state, destination)) {
      return false;
    }

    if (!destination || !destination.dropSlots) {
      return true;
    }

    const { title } = this.card;
    return destination.dropSlots.every((card) => card.title !== title);
  }
}

Mechanic.registerMechanic('unique', Unique);
