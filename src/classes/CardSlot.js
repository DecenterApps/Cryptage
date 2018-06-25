function getAllSlottedCards(card, slotted) {
  for (const slot of card.dropSlots) {
    if (!slot.isEmpty()) {
      slotted.push([slot, slot.card]);
      getAllSlottedCards(slot.card, slotted);
    }
  }
}

export default class CardSlot {
  constructor(owner) {
    if (owner) this.owner = owner;
  }

  dropCard(state, card) {
    if (this.card) {
      const leveledUp = this.card.levelUp(state, this);

      const slottedCards = [];
      getAllSlottedCards(this.card, slottedCards);

      let newState = this.removeCard(state);
      newState = this.dropCard(newState, leveledUp);

      for (const [slot, card] of slottedCards) {
        newState = slot.dropCard(newState, card);
      }

      return newState;
    }

    this.card = card;
    this.card.parent = this.owner;

    if (this.owner) state = this.owner.onPlayChild(state, this.card);
    return this.card.onPlay(state, this);
  }

  removeCard(state) {
    if (!this.card) return state;

    if (this.owner) {
      state = this.owner.onWithdrawChild(state, this.card);
      this.owner.removeDropSlot(this);
    }

    state = this.card.onWithdraw(state);

    this.card.parent = null;
    this.card = null;

    return state;
  }

  canDrop(state, card) {
    if (this.isEmpty()) {
      const { acceptedTags } = this.owner || this;

      if (!acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag))) {
        return { allowed: false };
      }

      return card.canPlay(state, this);
    }

    return this.card.canLevelUp(state, this);
  }

  isEmpty() {
    return !this.card;
  }
}
