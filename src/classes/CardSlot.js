
import LocationCard from './cardTypes/Location';
import ProjectCard from './cardTypes/Project';

export default class CardSlot {

  constructor(parent, card) {
    this.parent = parent;
    if (card) {
      this.dropCard(card);
    }
  }

  dropCard(card) {
    this.removeCard();
    this.card = card;
    this.card.parent = this.parent;
  }

  removeCard() {
    if (this.card) {
      this.card.parent = null;
      this.card = null;
    }
  }

  canDrop(card) {
    return this.isEmpty();
  }

  isEmpty() {
    return !!this.card;
  }
}

export class LocationCardSlot extends CardSlot {
  canDrop(card) {
    return card instanceof LocationCard;
  }
}

export class ProjectCardSlot extends CardSlot {
  canDrop(card) {
    return card instanceof ProjectCard;
  }
}
