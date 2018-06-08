import Gameplay from '../Gameplay';
import CardSlot from '../CardSlot';
import LocationCard from '../cardTypes/Location';
import Card from '../Card';

describe('CardSlot', () => {
  it('Adds card to slot on dropCard', async () => {
    let state = new Gameplay(0);
    const dropSlot = new CardSlot();

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    await dropSlot.dropCard(state, locationCard);

    expect(dropSlot.card).toBe(locationCard);
  });

  it('Can not drop a card when the tags do not match', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.funds = 101;
    gameplay.stats.development = 101;

    const cardToDrop = new Card({
      id: 0,
      cost: { power: 1, space: 1, funds: 1, development: 1 },
      tags: ['test'],
    });

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100 },
      acceptedTags: ['asset'],
    });

    let newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    const canDrop = await newState.locationSlots[0].card.dropSlots[1].canDrop(newState, cardToDrop);

    expect(canDrop.allowed).toBeFalsy();
  });

  it('Can level up when another card in the slot', () => {
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

    state.stats = { funds: 10000 };

    const locationCard = new LocationCard(cardData);
    const locationCardCopy = new LocationCard({ ...cardData, id: 1 });

    state = dropSlot.dropCard(state, locationCard);
    const canDrop = dropSlot.canDrop(state, locationCardCopy);

    expect(canDrop.allowed).toBeTruthy();
  });

  it('Levels up a card when there is another card in the slot', async () => {
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
    await dropSlot.dropCard(state, locationCardCopy);

    expect(dropSlot.card.stackedCards).toContain(locationCard, locationCardCopy);
    expect(dropSlot.card.level).toBe(2);
  });

  it('Returns just state when removeCard is called when there is not a card in the slot', () => {
    let state = new Gameplay(0);
    expect(state.locationSlots[0].removeCard(state)).toBe(state);
  });

  it('Re-slots all descendant cards on level up', () => {

    const dummyData = {
      level: 1,
      cost: { funds: 0 },
      bonus: { funds: 0 },
    };

    const calls = [];
    let state = new Gameplay(0);

    const dropSlot = new CardSlot();

    const card = new Card({ metadataId: 1, ...dummyData });
    const duplicate = new Card({ metadataId: 1, ...dummyData });
    const leveledUp = new Card({ metadataId: 1, ...dummyData, level: 2 });

    const container = new Card(dummyData);
    const miner = new Card(dummyData);

    dropSlot.dropCard(state, card);

    card.addNewDropSlot();
    card.dropSlots[0].dropCard(state, container);

    container.addNewDropSlot();
    container.dropSlots[0].dropCard(state, miner);

    const getLeveledInstance = jest.spyOn(Card, 'getLeveledInstance').mockReturnValue(leveledUp);

    const tap = (obj, method, cb) => {
      const original = obj[method];
      return jest.spyOn(obj, method).mockImplementation((...params) => {
        cb(...params);
        return original.apply(obj, params);
      });
    };

    tap(card, 'onWithdraw', () => calls.push('card.onWithdraw'));
    tap(card, 'onPlay', () => calls.push('card.onPlay'));
    tap(duplicate, 'onWithdraw', () => calls.push('duplicate.onWithdraw'));
    tap(duplicate, 'onPlay', () => calls.push('duplicate.onPlay'));
    tap(leveledUp, 'onWithdraw', () => calls.push('leveledUp.onWithdraw'));
    tap(leveledUp, 'onPlay', () => calls.push('leveledUp.onPlay'));
    tap(container, 'onWithdraw', () => calls.push('container.onWithdraw'));
    tap(container, 'onPlay', () => calls.push('container.onPlay'));
    tap(miner, 'onWithdraw', () => calls.push('miner.onWithdraw'));
    tap(miner, 'onPlay', () => calls.push('miner.onPlay'));

    dropSlot.dropCard(state, duplicate);

    expect(calls).toEqual([
      'card.onWithdraw',
      'container.onWithdraw',
      'miner.onWithdraw',
      'leveledUp.onPlay',
      'container.onPlay',
      'miner.onPlay',
    ]);

    getLeveledInstance.mockRestore();
  });
});
