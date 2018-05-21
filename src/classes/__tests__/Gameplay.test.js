import Gameplay from '../Gameplay';

describe('Gameplay', () => {

  it('Has all, played and hand card collections', () => {
    const gameplay = new Gameplay();
    expect(gameplay.allCards).toBeInstanceOf(Array);
    expect(gameplay.handCards).toBeInstanceOf(Array);
    expect(gameplay.playedCards).toBeInstanceOf(Array);
  });

  it('Dispatches block action to all played cards', () => {

    const gameplay = new Gameplay();
    gameplay.playedCards = [{
        block: jest.fn((state) => state),
      }, {
        block: jest.fn((state) => state),
    }];

    const dummyState = {};

    gameplay.block(dummyState, 123);

    for (const card of gameplay.playedCards) {
      expect(card.block).toHaveBeenCalledWith(dummyState, 123);
    }
  });
});
