import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { createMatcher } from '../matchers';

export default class CardLocationStatPercentBonus extends MatcherMechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostAmount = boostPercent;
  }

  getMatcher() {
    return createMatcher({ parent: this.card.parent });
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }
}

Mechanic.registerMechanic('cardLocationStatPercentBonus', CardLocationStatPercentBonus);
