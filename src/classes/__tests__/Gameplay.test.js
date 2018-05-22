import Gameplay from '../Gameplay';
import LocationCard from '../cardTypes/Location';

describe('Gameplay', () => {

  it('Has all, played and hand card collections', () => {
    const gameplay = new Gameplay();
    expect(gameplay.allCards).toBeInstanceOf(Array);
    expect(gameplay.handCards).toBeInstanceOf(Array);
    expect(gameplay.playedCards).toBeInstanceOf(Array);
  });

  it('Dispatches block action to all played cards', () => {
    const gameplay = new Gameplay();
    const block = jest.fn(state => state);
    gameplay.playedCards = [{ block }, { block }];

    const dummyState = {};

    gameplay.block(dummyState, 123);

    for (const card of gameplay.playedCards) {
      expect(card.block).toHaveBeenCalledWith(dummyState, 123);
    }
  });

  it('Returns all cards of right type', () => {
    const gameplay = new Gameplay();
    gameplay.playedCards = [new LocationCard(), new LocationCard()];

    gameplay
      .getCardsOfType(LocationCard)
      .every((card) => {
        expect(card).toBeInstanceOf(LocationCard);
      });
  });
});
