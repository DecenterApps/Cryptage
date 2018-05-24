
import LocationCard from './cardTypes/Location';
import ProjectCard from './cardTypes/Project';

export default class CardSlot {

  constructor(owner, card) {
    this.owner = owner;
    if (card) {
      this.dropCard(card);
    }
  }

  findParent(CardType = LocationCard) {
    if (!this.owner) {
      return null;
    }
    return this.owner.findParent(CardType);
  }

  async dropCard(state, card) {
    let toAdd = card;

    if (this.card && this.card.canLevelUp(state, this)) {
      toAdd = this.card.levelUp(state, this, card);
    }

    this.card = toAdd;
    this.card.parent = this.owner;
  }

  removeCard(state) {
    if (this.card) {
      state = this.owner.onWithdrawChild(state, this.card);
      state = this.card.onWithdraw(state);
      this.owner.removeDropSlot(this);

      this.card.parent = null;
      this.card = null;
    }

    return state;
  }

  async canDrop(state, card) {
    if (this.isEmpty()) {
      if (!this.owner) return true;
      return this.owner.acceptedTags.some(acceptedTag => card.tags.includes(acceptedTag));
    }

    return card.metadataId === this.card.metadataId && await this.card.canLevelUp(state, this);
  }

  isEmpty() {
    return !!this.card;
  }
}

export class LocationCardSlot extends CardSlot {
  async canDrop(state, card) {
    return await super.canDrop(state, card) && (card instanceof LocationCard);
  }
}

export class ProjectCardSlot extends CardSlot {
  async canDrop(state, card) {
    return await super.canDrop(state, card) && (card instanceof ProjectCard);
  }
}
