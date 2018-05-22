import Card from '../Card';

export default class ProjectCard extends Card {
  constructor(data, state) {
    super(data);

    this.isActive = true;
    this.expiryTime = state.blockNumber + this.cost.time;
    this.timesFinished = 0;
  }
}
