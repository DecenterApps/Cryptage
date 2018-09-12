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

  handleOnPlay(_state) {
    const matcher = transformQuery(this.getQuery());

    const state = this.changeBonusForDroppedMatchedCards(_state, this.boostAmount);

    const onSubscribedEvent = (subscribeState, matchedCard, num) => this.singleCardChangeBonus(matchedCard, subscribeState, num); // eslint-disable-line

    this.card.subscribe(state, 'onPlay', matcher, (ss, mc) => onSubscribedEvent(ss, mc, this.boostAmount));

    return state;
  }

  onPlay(_state) {
    return this.handleOnPlay(_state);
  }

  handleOnWithdraw(state) {
    return this.changeBonusForDroppedMatchedCards(state, -this.boostAmount);
  }

  onWithdraw(state) {
    return this.handleOnWithdraw(state);
  }
}

Mechanic.registerMechanic('MatcherMechanic', MatcherMechanic);
