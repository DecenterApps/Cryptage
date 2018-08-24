import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { transformQuery } from '../matchers';

export default class DynamicMatcherMechanic extends MatcherMechanic {
  constructor(card) {
    super(card);

    this.lastBoostAmount = null;
  }

  /**
   * Classes that extend this one have to have a getBoostAmount method
   * has to have a boost amount that depends on other variables
   *
   * @param {Object} state
   * @return {Number}
   */
  getBoostAmount(state) {
    return 0;
  }

  handleBoostAmountChange(_state, action, matchedCard) {
    if (action === 'withdraw' && matchedCard.id === this.card.id) return _state;
    let state = _state;
    const boostAmount = this.getBoostAmount(state);

    if (boostAmount === this.lastBoostAmount) return state;

    if (this.lastBoostAmount > 0) this.singleCardChangeBonus(this.card, state, -this.lastBoostAmount);
    this.lastBoostAmount = boostAmount;
    state = this.singleCardChangeBonus(this.card, state, this.lastBoostAmount);

    return state;
  }

  onPlay(state) {
    this.lastBoostAmount = 0;
    const matcher = transformQuery(this.getQuery());

    this.card.subscribe(state, 'onPlay', matcher, ss => this.handleBoostAmountChange(ss, 'play'));
    this.card.subscribe(state, 'onWithdraw', matcher, (ss, mc) => this.handleBoostAmountChange(ss, 'withdraw', mc));

    return state;
  }

  onWithdraw(state) {
    this.singleCardChangeBonus(this.card, state, -this.lastBoostAmount);
    return state;
  }
}

Mechanic.registerMechanic('dynamicMatcherMechanic', DynamicMatcherMechanic);
