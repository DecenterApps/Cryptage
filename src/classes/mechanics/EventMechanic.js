import Mechanic from '../Mechanic';

export default class EventMechanic extends Mechanic {
  constructor(card) {
    super(card);

    this.addedMechanicsIndexes = [];
  }

  onPlay(_state) {
    let state = _state;

    this.card.events.forEach((event) => {
      state = this.onAddEvent(state, event.name, event.params);
    });

    return state;
  }

  onAddEvent(state, eventMechanicName, params) {
    const newIndex = this.card.mechanics.push(Mechanic.getInstance(eventMechanicName, this, ...params)) - 1;
    this.addedMechanicsIndexes.push(newIndex);

    return state;
  }

  onWithdraw(state) {
    // CHECK IF GOES THROUGH ALL EVENT MECHANICS FIRST
    console.log('Main event manage on withdraw');
    this.addedMechanicsIndexes.forEach((mechIndex) => {
      this.card.mechanics.splice(mechIndex, 1);
    });

    return state;
  }
}

Mechanic.registerMechanic('eventMechanic', EventMechanic);
