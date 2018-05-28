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
    let toAdd = card;

    if (this.card) {
      toAdd = await this.card.levelUp(state, this, card);
    } else {
      state = card.onPlay(state, this);
    }

    this.card = toAdd;
    this.card.parent = this.owner;

    return state;
  }

  removeCard(state) {
    if (this.card) {
      if (this.owner) {
        state = this.owner.onWithdrawChild(state, this.card);
        this.owner.removeDropSlot(this);
      }

      state = this.card.onWithdraw(state);

      this.card.parent = null;
      this.card = null;
    }

    return state;
  }

  async canDrop(state, card) {
    if (this.isEmpty()) {
      const { acceptedTags } = this.owner || this;
      if (!acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag))) return false;

      const message = await card.canPlay(state, this);
      return message.allowed;
    }

    return card.metadataId === this.card.metadataId && await this.card.canLevelUp(state, this);
  }

  isEmpty() {
    return !this.card;
  }
}
