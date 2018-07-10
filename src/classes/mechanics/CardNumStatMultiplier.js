import Mechanic from '../Mechanic';
import { createMatcher } from '../matchers';
import DynamicMatcherMechanic from './DynamicMatcherMechanic';

export default class CardNumStatMultiplier extends DynamicMatcherMechanic {
  constructor(card, observedCardId, boostedStat, timesMultiplier) {
    super(card);

    this.observedCardId = observedCardId;
    this.boostedStat = boostedStat;
    this.timesMultiplier = timesMultiplier;
    this.lastBoostAmount = null;
  }

  getNumOfActiveObserverCards(state) {
    return state.cards.filter(card => card.active && card.metadataId === this.observedCardId).length;
  }

  getBoostAmount(state) {
    return this.getNumOfActiveObserverCards(state) * this.timesMultiplier;
  }

  getMatcher() {
    return createMatcher({ metadataId: this.observedCardId });
  }
}

Mechanic.registerMechanic('cardNumStatMultiplier', CardNumStatMultiplier);
