import Mechanic from '../Mechanic';
import { calcExpiryBlocksLeft } from '../../services/gameMechanicsService';

export default class ProjectExpiryMechanic extends Mechanic {
  canWithdraw() {
    return { projectActive: !this.card.running };
  }

  block(state, blockNumber) {
    const blocksLeft = calcExpiryBlocksLeft(this.card, blockNumber, state.projectExecutionTimePercent);

    if (this.card.running && (blocksLeft > 0)) return state;

    this.card.expiryTime = null;
    this.card.running = false;
    this.card.timesFinished += 1;

    state.stats.experience += this.card.getGainsStatValue('experience');
    state.stats.funds += this.card.getGainsStatValue('funds');
    state.stats.development += this.card.cost.development;

    return this.card.onProjectEnd(state);
  }
}

Mechanic.registerMechanic('projectExpiry', ProjectExpiryMechanic);