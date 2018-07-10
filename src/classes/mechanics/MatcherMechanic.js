import Mechanic from '../Mechanic';

export default class MatcherMechanic extends Mechanic {
  constructor(card) {
    super(card);

    this.boostAmount = null;
    this.boostedStat = null;
  }

  getMatcher() {
    return () => null;
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

  singleCardChangeBonus(matchedCard, subscribeState, num) {
    return matchedCard.changeBonuses(subscribeState, this.createChangeBonus(num));
  }

  onPlay(_state) {
    this.matcher = this.getMatcher();
    const state = this.changeBonusForDroppedMatchedCards(_state, this.boostAmount);

    state.subscribe('onPlay', this.matcher, (subscribeState, matchedCard) =>
      this.singleCardChangeBonus(matchedCard, subscribeState, this.boostAmount));

    return state;
  }

  onWithdraw(state) {
    return this.changeBonusForDroppedMatchedCards(state, -this.boostAmount);
  }
}

Mechanic.registerMechanic('MatcherMechanic', MatcherMechanic);
