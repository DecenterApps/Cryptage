import Mechanic from '../Mechanic';
import DynamicMatcherMechanic from './DynamicMatcherMechanic';

export default class StatForUnspentLocationVal extends DynamicMatcherMechanic {
  constructor(card, locationStat, boostedStat, boostAmount) {
    super(card);

    this.locationStat = locationStat;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;
  }

  getBoostAmount() {
    return this.card.parent[this.locationStat] * this.boostAmount;
  }

  getQuery() {
    return { $op: '||', parent: this.card.parent.id, metadataId: this.card.metadataId.toString() };
  }
}

Mechanic.registerMechanic('statForUnspentLocationVal', StatForUnspentLocationVal);
