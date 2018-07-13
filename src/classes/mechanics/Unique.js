import Mechanic from '../Mechanic';

export default class Unique extends Mechanic {
  canPlay(state, destination) {
    const { title } = this.card;

    const unique = destination.owner.dropSlots.reduce((acc, dropSlot) => {
      if (dropSlot.card && dropSlot.card.title === title) acc = true;
      return acc;
    }, false);

    return { unique };
  }
}

Mechanic.registerMechanic('unique', Unique);
