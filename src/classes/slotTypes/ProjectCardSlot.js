import CardSlot from '../CardSlot';
import ProjectCard from '../cardTypes/Project';

export default class ProjectCardSlot extends CardSlot {
  constructor(owner, card) {
    super(owner, card);
    this.acceptedTags = ['project'];
  }

  async canDrop(state, card) {
    const res = await super.canDrop(state, card);
    return {
      ...res,
      allowed: res.allowed && (card instanceof ProjectCard),
    };
  }
}
