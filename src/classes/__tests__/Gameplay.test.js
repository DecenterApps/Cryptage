import Gameplay from '../Gameplay';
import LocationCard from '../cardTypes/Location';
import Card from '../Card';
import CardSlot from '../CardSlot';

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

  it('Adds card to played cards on drop', async () => {
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

    state.handCards = [new LocationCard(cardData)];

    state = await dropSlot.dropCard(state, state.handCards[0]);

    expect(state.handCards.findIndex(handCard => handCard.id === cardData.id)).toBe(-1);
    expect(state.playedCards.findIndex(playedCard => playedCard.id === cardData.id)).toBe(0);
  });

  it('Removes all cards from slot', async () => {
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

    const locationCard = new LocationCard(cardData);
    const locationCardCopy = new LocationCard({ ...cardData, id: 1 });

    state.handCards = [locationCard, locationCardCopy];

    state = await dropSlot.dropCard(state, locationCard);
    state = await dropSlot.dropCard(state, locationCardCopy);
    state = dropSlot.removeCard(state);

    expect(state.playedCards.length).toBe(0);
    expect(state.handCards.length).toBe(2);
  });
});
