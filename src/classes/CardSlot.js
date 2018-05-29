export default class CardSlot {

  constructor(owner, card) {
    if (owner) this.owner = owner;
    if (card) this.dropCard(card);
  }

  findParent(CardType) {
    if (!this.owner) {
      return null;
    }
    return this.owner.findParent(CardType);
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
  }

  async canDrop(state, card) {
    if (this.isEmpty()) {
      const { acceptedTags } = this.owner || this;
      if (!acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag))) return false;

      const message = await card.canPlay(state, this);
      return message.allowed;
    }

    if (card.metadataId !== this.card.metadataId) return false;

    const message = await this.card.canLevelUp(state, this);

    return message.allowed;
  }

  isEmpty() {
    return !this.card;
  }
}
