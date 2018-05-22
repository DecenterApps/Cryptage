
import LocationCard from './cardTypes/Location';
import ProjectCard from './cardTypes/Project';

export default class CardSlot {

  constructor(card) {
    if (card) {
      this.dropCard(card);
    }
  }

  dropCard(card) {
    this.card = card;
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
