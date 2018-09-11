import Mechanic from '../Mechanic';
import { calcExpiryBlocksLeft } from '../../services/gameMechanicsService';

export default class BonusEventMechanic extends Mechanic {
  constructor(card) {
    super(card);

    this.indexInMechanics = -1;
  }

  startEvent(state, newIndex) {
    this.indexInMechanics = newIndex;

    return state;
  }

  block(state, blockNumber) {
    // const blocksLeft = calcExpiryBlocksLeft(this.card, blockNumber, state.projectExecutionTimePercent);
    //
    // // if (this.card.finishedNow) this.card.finishedNow = false;
    //
    // if (this.expiryTime && (blocksLeft <= 0)) {
    //   this.expiryTime = null;
    //   this.running = false;
    //
    //   // this.card.finishedNow = true;
    //
    //   state.stats.experience += this.card.getGainsStatValue('experience');
    //   state.stats.funds += this.card.getGainsStatValue('funds');
    //   state.stats.development += this.card.cost.development;
    //
    //   return this.card.onProjectEnd(state);
    // }
    //
    return state;
  }

  onWithdraw(state) {
    this.card.mechanics.splice(this.indexInMechanics, 1);
    return state;
  }
}

Mechanic.registerMechanic('bonusEventMechanic', BonusEventMechanic);
