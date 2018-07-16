import Gameplay from '../Gameplay';
import Mechanic from '../Mechanic';

describe('Mechanic', () => {
  it('Throws error when you try to get an unregistered instance', () => {
    const mechName = 'none';
    const func = () => { Mechanic.getInstance(mechName, null); };
    expect(func).toThrowErrorMatchingSnapshot(`unknown mechanic '${mechName}'`);
  });

  it('By default returns true on canPlay', () => {
    const mechanic = new Mechanic();
    const res = mechanic.canPlay();
    expect(res.allowed).toBeTruthy();
  });

  it('By default returns true on canWithdraw', () => {
    const mechanic = new Mechanic();
    const res = mechanic.canWithdraw();
    expect(res.allowed).toBeTruthy();
  });

  it('By default returns true on canWithdrawChild', () => {
    const mechanic = new Mechanic();
    const res = mechanic.canWithdrawChild();
    expect(res.allowed).toBeTruthy();
  });

  it('By default returns State on block', () => {
    const state = new Gameplay(0);
    const mechanic = new Mechanic();

    expect(mechanic.block(state)).toEqual(state);
  });
});
