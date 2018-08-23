import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';

export default class AllTypeCardsStatPercentBonus extends MatcherMechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostAmount = boostPercent;
  }

  getQuery() {
    return { type: this.cardType };
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }
}

Mechanic.registerMechanic('allTypeCardsStatPercentBonus', AllTypeCardsStatPercentBonus);
