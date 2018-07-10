import Mechanic from '../Mechanic';
import { createMatcher } from '../matchers';
import MatcherMechanic from './MatcherMechanic';
import DynamicMatcherMechanic from './DynamicMatcherMechanic';

export default class StatForUnspentLocationVal extends DynamicMatcherMechanic {
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
}

Mechanic.registerMechanic('statForUnspentLocationVal', StatForUnspentLocationVal);
