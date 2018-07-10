import Mechanic from '../Mechanic';
import { createMatcher } from '../matchers';

export default class CardLocationStatPercentBonus extends Mechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostPercent = boostPercent;
    this.matcher = createMatcher({ parent: card.parent });
  }

  onPlay(_state) {

  }

  onWithdraw(state) {
  }
}

Mechanic.registerMechanic('cardLocationStatPercentBonus', CardLocationStatPercentBonus);
