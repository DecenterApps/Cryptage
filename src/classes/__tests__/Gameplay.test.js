import Gameplay from '../Gameplay';
import LocationCard from '../cardTypes/Location';

describe('Gameplay', () => {

  it('Has all, played and hand card collections', () => {
    const gameplay = new Gameplay();
    expect(gameplay.allCards).toBeInstanceOf(Array);
    expect(gameplay.handCards).toBeInstanceOf(Array);
    expect(gameplay.playedCards).toBeInstanceOf(Array);
  });

  it('Returns all cards of right type', () => {
    const gameplay = new Gameplay();
    const stats = { values: { power: 10, space: 10 } };

    gameplay.playedCards = [new LocationCard({ id: '10', ...stats }), new LocationCard({ id: '11', ...stats })];

    gameplay
      .getCardsOfType(LocationCard)
      .every((card) => {
        expect(card).toBeInstanceOf(LocationCard);
      });
  });
});
