import CardSlot from '../CardSlot';
import ProjectCard from '../cardTypes/Project';

export default class ProjectCardSlot extends CardSlot {
  async canDrop(state, card) {
    return await super.canDrop(state, card) && (card instanceof ProjectCard);
  }
}
