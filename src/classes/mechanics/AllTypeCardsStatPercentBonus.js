import Mechanic from '../Mechanic';
import MatcherMechanic from './MatcherMechanic';
import { transformQuery } from '../matchers';

export default class AllTypeCardsStatPercentBonus extends MatcherMechanic {
  constructor(card, cardType, boostedStat, boostPercent) {
    super(card);

    this.subscribed = false;
    this.cardType = cardType;
    this.boostedStat = boostedStat;
    this.boostAmount = boostPercent;
    this.addedBoost = 0;
  }

  onPlay(_state) {
    let state = _state;

    if (this.card.level === 1) {
      this.addedBoost = 0;
    } else {
      this.addedBoost = this.card.additionalData.allTypeCardsStatPercentBonus;
      state = this.changeBonusForDroppedMatchedCards(_state, this.addedBoost);
    }

    return state;
  }

  onProjectEnd(_state) {
    const matcher = transformQuery(this.getQuery());

    const state = this.changeBonusForDroppedMatchedCards(_state, this.boostAmount);
    this.addedBoost += this.boostAmount;

    if (!this.subscribed) {
      const onSubscribedEvent = (subscribeState, matchedCard, num) => this.singleCardChangeBonus(matchedCard, subscribeState, num); // eslint-disable-line

      this.card.subscribe(state, 'onPlay', matcher, (ss, mc) => onSubscribedEvent(ss, mc, this.addedBoost));
      // this.card.subscribe(state, 'onWithdraw', matcher, (ss, mc) => onSubscribedEvent(ss, mc, -this.addedBoost));

      this.subscribed = true;
    }

    return state;
  }

  onWithdraw(_state) {
    const state = this.changeBonusForDroppedMatchedCards(_state, -this.addedBoost);
    this.subscribed = false;
    this.card.additionalData.allTypeCardsStatPercentBonus = this.addedBoost;
    return state;
  }

  getQuery() {
    return { type: this.cardType };
  }

  createChangeBonus(num) {
    return { [this.boostedStat]: { absolute: 0, relative: num } };
  }
}

Mechanic.registerMechanic('allTypeCardsStatPercentBonus', AllTypeCardsStatPercentBonus);
