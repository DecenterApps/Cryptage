import MatcherMechanic from './MatcherMechanic';
import Mechanic from '../Mechanic';

export default class Card2ProjectStatBonus extends MatcherMechanic {
  constructor(card, cardToGiveToMetaId, boostedStat, boostAmount) {
    super(card);

    this.cardToGiveToMetaId = cardToGiveToMetaId;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;
  }

  getQuery() {
    return [{ type: 'Project' }, { metadataId: this.cardToGiveToMetaId.toString() }];
  }
}

Mechanic.registerMechanic('card2ProjectStatBonus', Card2ProjectStatBonus);
