import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { transformQuery } from '../matchers';

export default class DynamicMatcherMechanic extends MatcherMechanic {
  constructor(card, locationStat, boostedStat, boostAmount) {
    super(card);

    this.lastBoostAmount = null;
  }

  // classes that extend this one have to have a getBoostAmount method
  // has to have a boost amount that depends on other variables
  // Example method:
  // getBoostAmount(state) {
  //   return this.boostAmount * (Math.floor(Math.random() * 6) + 1);
  // }

  handleBoostAmountChange(_state, card) {
    let state = _state;
    const boostAmount = this.getBoostAmount(state);

    if (boostAmount === this.lastBoostAmount) return state;

    state = this.singleCardChangeBonus(card, state, -this.lastBoostAmount);
    this.lastBoostAmount = boostAmount;
    state = this.singleCardChangeBonus(card, state, this.lastBoostAmount);

    return state;
  }

  onPlay(_state) {
    const matcher = transformQuery(this.getQuery());
    const state = this.handleBoostAmountChange(_state, this.card);

    state.subscribe('onPlay', matcher, subscribeState => this.handleBoostAmountChange(subscribeState, this.card));

    return state;
  }

  onWithdraw(state) {
    return this.singleCardChangeBonus(this.card, state, -this.lastBoostAmount);
  }
}

Mechanic.registerMechanic('dynamicMatcherMechanic', DynamicMatcherMechanic);
