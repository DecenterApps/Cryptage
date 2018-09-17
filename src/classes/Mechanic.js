import serialise from 'serialijse';
import Subscriber from './Subscriber';

/**
 * Card effect triggers:
 *  - play (when putting card in play)
 *  - withdraw (when removing card from play)
 *  - playChild (when card is played into this card)
 *  - withdrawChild (when card is withdrawn from this card)
 *  - block (every block)
 */

const registry = new Map();

export default class Mechanic extends Subscriber {
  static registerMechanic(name, mechanic) {
    registry.set(name, mechanic);
  }

  static getInstance(name, card, params) {
    if (!name) return null;

    if (!registry.has(name)) {
      throw ReferenceError(`unknown mechanic '${name}'`);
    }

    return params ? new (registry.get(name))(card, ...params) : new (registry.get(name))(card);
  }

  constructor(card) {
    super();
    this.card = card;
  }

  canPlay() {
    return { allowed: true };
  }

  onPlay(state) {
    return state;
  }

  canWithdraw() {
    return { allowed: true };
  }

  onWithdraw(state) {
    this.unsubscribeAll();
    return state;
  }

  canPlayChild() {
    return { allowed: true };
  }

  onPlayChild(state) {
    return state;
  }

  canWithdrawChild() {
    return { allowed: true };
  }

  onWithdrawChild(state) {
    return state;
  }

  block(state) {
    return state;
  }
}

serialise.declarePersistable(Mechanic);
