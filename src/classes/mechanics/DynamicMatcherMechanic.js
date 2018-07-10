import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';

export default class DynamicMatcherMechanic extends MatcherMechanic {
  constructor(card, locationStat, boostedStat, boostAmount) {
    super(card);

    this.locationStat = locationStat;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;
    this.lastBoostAmount = null;
  }

  getBoostAmount() {
    // has to have a boost amount that depends on other variables
    return this.boostAmount * (Math.floor(Math.random() * 6) + 1);
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

Mechanic.registerMechanic('dynamicMatcherMechanic', DynamicMatcherMechanic);
