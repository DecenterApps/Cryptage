import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { combineMatchers, createMatcher } from '../matchers';

export default class CardLocationStatPercentBonus extends MatcherMechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostAmount = boostPercent;
  }

  getMatcher() {
    const parentMatcher = createMatcher({ parent: this.card.parent });
    const typeMatcher = createMatcher({ cardType: this.cardType });
    return combineMatchers(parentMatcher, typeMatcher);
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }
}

Mechanic.registerMechanic('cardLocationStatPercentBonus', CardLocationStatPercentBonus);
