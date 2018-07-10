import { combineMatchers, createMatcher, isProjectCard } from '../matchers';
import MatcherMechanic from './MatcherMechanic';
import Mechanic from '../Mechanic';

export default class Card2ProjectStatBonus extends MatcherMechanic {
  constructor(card, cardToGiveToMetaId, boostedStat, boostAmount) {
    super(card);

    this.cardToGiveToMetaId = cardToGiveToMetaId;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;

    const metadataIdMatcher = createMatcher({ metadataId: this.cardToGiveToMetaId });
    this.matcher = combineMatchers(isProjectCard, metadataIdMatcher);
  }
}

Mechanic.registerMechanic('card2ProjectStatBonus', Card2ProjectStatBonus);
