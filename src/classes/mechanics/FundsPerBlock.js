import Mechanic from '../Mechanic';

export default class FundsPerBlock extends Mechanic {

  constructor(card, params) {
    super(card);
    this.fpb = params;
  }

  onPlay(state) {
    state.fundsPerBlock = state.fundsPerBlock + this.fpb;
    return state;
  }

  onWithdraw(state) {
    state.fundsPerBlock = state.fundsPerBlock - this.fpb;
    return state;
  }
}

Mechanic.registerMechanic('fundsPerBlock', FundsPerBlock);
