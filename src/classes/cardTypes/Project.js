import Card from '../Card';

export default class ProjectCard extends Card {
  constructor(data, state) {
    super(data);

    this.isActive = false;
    this.expiryTime = state.blockNumber + this.cost.time;
    this.timesFinished = 0;
  }
}

Card.registerTypeConstructor('Project', ProjectCard);
