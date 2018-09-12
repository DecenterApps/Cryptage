import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { createIdentityMatcher } from '../matchers';

export default class CardLocationStatPercentBonus extends MatcherMechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostAmount = boostPercent;
  }

  getQuery() {
    return [{ anyParent: createIdentityMatcher(this.card.parent) }, { type: this.cardType }];
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }
}

Mechanic.registerMechanic('cardLocationStatPercentBonus', CardLocationStatPercentBonus);
