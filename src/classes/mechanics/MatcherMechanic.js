import Mechanic from '../Mechanic';
import { transformQuery } from '../matchers';

export default class MatcherMechanic extends Mechanic {
  constructor(card) {
    super(card);

    this.boostAmount = null;
    this.boostedStat = null;
  }

  getQuery() {
    return null;
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: num, relative: 0 } };
  }

  changeBonusForDroppedMatchedCards(_state, num) {
    let state = _state;
    const matcher = transformQuery(this.getQuery());

    state.cards.forEach((card) => {
      if (matcher(card) && (card.id !== this.card.id)) {
        state = card.changeBonuses(state, this.createChangeBonus(num));
      }
    });

    return state;
  }

  singleCardChangeBonus(matchedCard, subscribeState, num) {
    return matchedCard.changeBonuses(subscribeState, this.createChangeBonus(num));
  }

  onPlay(_state) {
    const matcher = transformQuery(this.getQuery());

    const state = this.changeBonusForDroppedMatchedCards(_state, this.boostAmount);

    const onSubscribedEvent = (subscribeState, matchedCard) => this.singleCardChangeBonus(matchedCard, subscribeState, this.boostAmount); // eslint-disable-line

    this.card.subscribe(state, 'onPlay', matcher, onSubscribedEvent);

    return state;
  }

  onWithdraw(state) {
    return this.changeBonusForDroppedMatchedCards(state, -this.boostAmount);
  }
}

Mechanic.registerMechanic('MatcherMechanic', MatcherMechanic);
