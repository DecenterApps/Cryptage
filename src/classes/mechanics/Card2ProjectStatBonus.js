import Mechanic from '../Mechanic';
import { combineMatchers, createMatcher, isProjectCard } from '../matchers';

export default class Card2ProjectStatBonus extends Mechanic {
  constructor(card, cardToGiveToMetaId, boostedStat, boostAmount) {
    super(card);

    this.cardToGiveToMetaId = cardToGiveToMetaId;
    this.boostedStat = boostedStat;
    this.boostAmount = boostAmount;

    const metadataIdMatcher = createMatcher({ metadataId: this.cardToGiveToMetaId });
    this.matcher = combineMatchers(isProjectCard, metadataIdMatcher);
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: num, relative: 0 } };
  }

  changeBonusForDroppedMatchedCards(_state, num) {
    let state = _state;
    state.cards.forEach((card) => {
      if (this.matcher(card)) {
        state = card.changeBonuses(state, this.createChangeBonus(num));
      }
    });

    return state;
  }

  onPlay(_state) {
    const state = this.changeBonusForDroppedMatchedCards(_state, this.boostAmount);

    state.subscribe('onPlay', this.matcher, (subscribeState, matchedCard) => {
      matchedCard.changeBonuses(subscribeState, this.createChangeBonus(this.boostAmount));
    });

    return state;
  }

  onWithdraw(state) {
    return this.changeBonusForDroppedMatchedCards(state, -this.boostAmount);
  }
}

Mechanic.registerMechanic('card2ProjectStatBonus', Card2ProjectStatBonus);
