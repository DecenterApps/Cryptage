import CardSlot from '../CardSlot';
import ProjectCard from '../cardTypes/Project';

export default class ProjectCardSlot extends CardSlot {
  constructor(index) {
    super(undefined, index);
    this.acceptedTags = ['project'];
  }

  canDrop(state, card) {
    const res = super.canDrop(state, card);

    const running = this.card ? !this.card.running : true;

    return {
      ...res,
      allowed: res.allowed && (card instanceof ProjectCard) && running,
    };
  }
}
