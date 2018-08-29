import Mechanic from '../Mechanic';
import DynamicMatcherMechanic from './DynamicMatcherMechanic';

export default class CardNumStatMultiplier extends DynamicMatcherMechanic {
  constructor(card, observedCardId, boostedStat, timesMultiplier) {
    super(card);

    this.observedCardId = observedCardId;
    this.boostedStat = boostedStat;
    this.timesMultiplier = timesMultiplier;
  }

  getNumOfActiveObserverCards(state) {
    const recurse = (card) => {
      if (card.dropSlots.length > 0) {
        return card.dropSlots.reduce((acc, dropSlot) => {
          const validCardInSlot = dropSlot.card && dropSlot.card.active && !dropSlot.card.withdrawing;
          if (validCardInSlot && dropSlot.card.metadataId === this.observedCardId.toString()) {
            acc += 1;
          }

          if (dropSlot.card && dropSlot.card.dropSlots.length > 0) return acc + recurse(dropSlot.card);

          return acc;
        }, 0);
      }

      return 0;
    };

    return state.cards.reduce((acc, card) => acc + recurse(card), 0);
  }

  getBoostAmount(state) {
    return this.getNumOfActiveObserverCards(state) * this.timesMultiplier;
  }

  getQuery() {
    return { metadataId: this.observedCardId.toString() };
  }
}

Mechanic.registerMechanic('cardNumStatMultiplier', CardNumStatMultiplier);
