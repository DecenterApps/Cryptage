import Mechanic from '../Mechanic';
import { createIdentityMatcher } from '../matchers';
import MatcherMechanic from './MatcherMechanic';

export default class BonusEventMechanic extends MatcherMechanic {
  constructor(card, eventId, boostedStat, boostAmount, duration) {
    super(card);

    this.eventId = eventId;
    this.expiryTime = null;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;
    this.duration = duration;
    this.indexInMechanics = -1;
  }

  getQuery() {
    return { parent: createIdentityMatcher(this.card) };
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }

  startEvent(state, newIndex) {
    this.indexInMechanics = newIndex;
    this.expiryTime = state.blockNumber + this.duration;
    this.card.additionalData.activeEvent =
      { expiryTime: this.expiryTime, eventId: this.eventId, eventDuration: this.duration };

    return this.handleOnPlay(state);
  }

  block(state, blockNumber) {
    const blocksLeft = this.expiryTime - blockNumber;

    if (this.expiryTime && (blocksLeft <= 0)) {
      this.expiryTime = null;

      // ADD SPECIAL CURRENCY
      this.card.additionalData.activeEvent = null;

      return this.handleOnWithdraw(state);
    }

    return state;
  }

  onPlay(state) { return state; }

  onWithdraw(_state) {
    let state = _state;
    const blocksLeft = this.expiryTime - state.blockNumber;

    if (this.expiryTime && (blocksLeft > 0)) {
      state = this.handleOnWithdraw(state);
    }

    this.card.mechanics.splice(this.indexInMechanics, 1);
    return state;
  }
}

Mechanic.registerMechanic('bonusEventMechanic', BonusEventMechanic);