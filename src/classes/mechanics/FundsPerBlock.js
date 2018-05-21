import Mechanic from '../Mechanic';

export default class FundsPerBlock extends Mechanic {

  constructor(card, params) {
    super(card);
    this.fpb = params;
  }

  onPlay(state) {
    return { ...state, fundsPerBlock: state.fundsPerBlock + this.fpb };
  }

  onWithdraw(state) {
    return { ...state, fundsPerBlock: state.fundsPerBlock - this.fpb };
  }
}

Mechanic.registerMechanic('fundsPerBlock', FundsPerBlock);
