/**
 * Card effect triggers:
 *  - play (when putting card in play)
 *  - withdraw (when removing card from play)
 *  - playChild (when card is played into this card)
 *  - withdrawChild (when card is withdrawn from this card)
 *  - block (every block)
 */

const registry = new Map();

export default class Mechanic {

  static registerMechanic(name, mechanic) {
    registry.set(name, mechanic);
  }

  static getInstance(name, card, ...params) {
    if (!registry.has(name)) {
      throw ReferenceError(`unknown mechanic '${name}'`);
    }
    return new (registry.get(name))(card, ...params);
  }

  constructor(card) {
    this.card = card;
  }

  canPlay(state, destination) {
    return { allowed: true };
  }

  onPlay(state, destination) {
    return state;
  }

  canWithdraw(state) {
    return { allowed: true };
  }

  onWithdraw(state) {
    return state;
  }

  canPlayChild(state, child) {
    return { allowed: true };
  }

  onPlayChild(state, child) {
    return state;
  }

  canWithdrawChild(state, child) {
    return { allowed: true };
  }

  onWithdrawChild(state, child) {
    return state;
  }

  block(state, blockCount) {
    return state;
  }
}
