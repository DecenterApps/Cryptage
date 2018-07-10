import Mechanic from '../Mechanic';
import { createMatcher } from '../matchers';
import MatcherMechanic from './MatcherMechanic';

export default class StatForUnspentLocationVal extends MatcherMechanic {
  constructor(card, locationStat, boostedStat, boostAmount) {
    super(card);

    this.locationStat = locationStat;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;
    this.lastBoostAmount = null;
  }

  getBoostAmount() {
    return this.card.parent[this.locationStat] * this.boostAmount;
  }

  getMatcher() {
    return createMatcher({ id: this.card.parent.id });
  }

  handleBoostAmountChange(_state, card) {
    let state = _state;
    const boostAmount = this.getBoostAmount();

    if (boostAmount === this.lastBoostAmount) return state;

    state = this.singleCardChangeBonus(card, state, -this.lastBoostAmount);
    this.lastBoostAmount = boostAmount;
    state = this.singleCardChangeBonus(card, state, this.lastBoostAmount);

    return state;
  }

  onPlay(_state) {
    this.matcher = this.getMatcher();
    const state = this.handleBoostAmountChange(_state, this.card);

    state.subscribe('onPlay', this.matcher, (subscribeState) =>
      this.handleBoostAmountChange(subscribeState, this.card));

    return state;
  }

  onWithdraw(state) {
    return this.singleCardChangeBonus(this.card, state, -this.lastBoostAmount);
  }
}

Mechanic.registerMechanic('statForUnspentLocationVal', StatForUnspentLocationVal);
