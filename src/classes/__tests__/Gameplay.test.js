import Gameplay from '../Gameplay';
import LocationCard from '../cardTypes/Location';
import Card from '../Card';
import CardSlot from '../CardSlot';

describe('Gameplay', () => {

  it('Has all, played and hand card collections', () => {
    const gameplay = new Gameplay();
    expect(gameplay.cards).toBeInstanceOf(Array);
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

  it('Does not update block number when block count is under 1', () => {
    const state = new Gameplay(10);

    const newState = state.updateBlockNumber(state, 0);

    expect(newState).toEqual(state);
  });

  it('Updates block number and funds when block count is greater than 0', () => {
    const cardData = {
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    };

    const state = new Gameplay(10);
    const newBlockNumber = 11;
    state.funds = 0;
    state.fundsPerBlock = 10;
    state.playedCards = [new Card(cardData), new Card(cardData)];

    const newState = state.updateBlockNumber(state, newBlockNumber);

    expect(newState.blockNumber).toBe(newBlockNumber);
    expect(newState.funds).toBe(state.fundsPerBlock * (newBlockNumber - state.blockNumber));
  });

  it('On drop changes card state to active', async () => {
    const cardData = {
      id: 0,
      level: 1,
      metadataId: 1,
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    };

    let state = new Gameplay(0);
    const dropSlot = new CardSlot();

    state.cards = [new LocationCard(cardData)];

    state = await dropSlot.dropCard(state, state.cards[0]);

    expect(state.cards[0].active).toBeTruthy();
  });
});
