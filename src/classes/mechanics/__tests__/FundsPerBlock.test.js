import FundsPerBlock from '../FundsPerBlock';

describe('FundsPerBlock', () => {
  it ('Has added funds per block', () => {
    const toAdd = 10;
    const mechanic = new FundsPerBlock(null, toAdd);
    expect(mechanic.fpb).toBe(toAdd);
  });

  it ('Adds its fpb to global fpb', () => {
    const toAdd = 10;
    const mechanic = new FundsPerBlock(null, toAdd);

    const state = mechanic.onPlay({ fundsPerBlock: 0 });
    expect(state.fundsPerBlock).toBe(toAdd);
  });

  it ('Deducts its fpb from global fpb', () => {
    const toAdd = 10;
    const mechanic = new FundsPerBlock(null, toAdd);
    let state = { fundsPerBlock: 0 };

    state = mechanic.onPlay(state);
    expect(state.fundsPerBlock).toBe(toAdd);

    state = mechanic.onWithdraw(state);
    expect(state.fundsPerBlock).toBe(0);
  });
});
