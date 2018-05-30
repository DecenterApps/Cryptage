export default class CardSlot {
  constructor(owner, card) {
    if (owner) this.owner = owner;
    if (card) this.dropCard(card);
  }

  async dropCard(state, card) {
    if (this.card) {
      const leveldUp = await this.card.levelUp(state, this);
      const newState = this.removeCard(state);
      return this.dropCard(newState, leveldUp);
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

  async canDrop(state, card) {
    if (this.isEmpty()) {
      const { acceptedTags } = this.owner || this;

      if (!acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag))) {
        return { allowed: false };
      }

      return await card.canPlay(state, this);
    }

    if (card.metadataId !== this.card.metadataId) return false;

    const message = await this.card.canLevelUp(state, this);

    return message;
  }

  isEmpty() {
    return !this.card;
  }
}
