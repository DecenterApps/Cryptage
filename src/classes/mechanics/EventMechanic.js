import Mechanic from '../Mechanic';

export default class EventMechanic extends Mechanic {
  constructor(card) {
    super(card);

    this.addedMechanicsIndexes = [];
  }

  onPlay(_state) {
    let state = _state;

    if (this.addedMechanicsIndexes.length > 0) return state;

    this.card.events.forEach((event) => {
      state = this.onAddEvent(state, event.name, event.params);
    });

    return state;
  }

  onAddEvent(_state, eventMechanicName, params) {
    let state = _state;

    const mechInstance = Mechanic.getInstance(eventMechanicName, this.card, ...params);
    const newIndex = this.card.mechanics.push(mechInstance) - 1;
    this.addedMechanicsIndexes.push(newIndex);

    state = mechInstance.startEvent(state, newIndex);

    return state;
  }
}

Mechanic.registerMechanic('eventMechanic', EventMechanic);
