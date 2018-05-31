import Card from '../Card';
import Gameplay from '../Gameplay';
import Unique from '../mechanics/Unique';
import LocationCard from '../cardTypes/Location';
import CardSlot from '../CardSlot';

describe('Card', () => {
  it('Returns right constructor for registered card type', async () => {
    // Card with the UID of 10 on the contract is a Location
    const card = await Card.getInstance(10, 1);
    expect(card).toBeInstanceOf(LocationCard);
  });

  it('Returns default constructor when missing cardType', async () => {
    // Card with the UID of 10 on the contract is a Location
    const card = await Card.getInstance(0, 1);
    expect(card).toBeInstanceOf(Card);
  });

  it('Has all defined constructor values', () => {
    const cardId = 0;
    const card = new Card({ id: cardId, mechanics: [{ name: 'unique' }] });

    expect(card.dropSlots).toBeInstanceOf(Array);
    expect(card.stackedCardIds).toContain(cardId);
    expect(card.active).toBeFalsy();
    expect(card.mechanics[0]).toBeInstanceOf(Unique);
  });

  it('Can level up with level bellow 5', async () => {
    const card = new Card({ level: 1, id: 0, cost: { funds: 0, development: 0 } }, null);
    let state = new Gameplay(0);
    state.stats = { funds: 1000000, development: 10000 };

    const dropSlot = new CardSlot();
    state = await dropSlot.dropCard(state, card);

    const res = await card.canLevelUp(state, dropSlot);

    expect(res).toEqual(expect.objectContaining({ allowed: true }));
  });

  it('Can not level up with level 5', async () => {
    let state = new Gameplay(0);
    state.stats = { funds: 1000000, development: 10000 };

    const card = new Card({ level: 5, id: 0, cost: { funds: 0, development: 0 } }, null);
    const dropSlot = new CardSlot();
    state = await dropSlot.dropCard(state, card);

    const res = await card.canLevelUp(state, dropSlot);

    expect(res).toEqual(expect.objectContaining({ allowed: false }));
  });

  it('Can not level up with not enough funds', async () => {
    let state = new Gameplay(0);
    state.stats = { funds: 0, development: 10000 };

    const card = new Card({ level: 1, id: 0, cost: { funds: 0, development: 0 } }, null);
    const dropSlot = new CardSlot();
    state = await dropSlot.dropCard(state, card);

    const res = await card.canLevelUp(state, dropSlot);

    expect(res).toEqual(expect.objectContaining({ allowed: false }));
  });

  it('On level up replaces the cards dropSlots owner and filled dropSlots parent', async () => {
    const cardData = {
      id: 0,
      level: 1,
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100, level: 1 },
      acceptedTags: ['asset'],
    };
    let state = new Gameplay(0);
    state.stats = { funds: 101, development: 101 };

    const locationCard = new LocationCard(cardData);
    const locationCardCopy = new LocationCard({ ...cardData, id: 1 });

    const assetCard = new Card({
      id: 2,
      level: 1,
      cost: { power: 1, space: 1, funds: 1, development: 1, level: 1 },
      tags: ['asset'],
    });

    state.handCards = [locationCard, locationCardCopy, assetCard];

    state = await state.locationSlots[0].dropCard(state, locationCard);
    state = await state.locationSlots[0].card.dropSlots[0].dropCard(state, assetCard);
    state = await state.locationSlots[0].dropCard(state, locationCardCopy);

    const level2Card = state.locationSlots[0].card;
    const slotToTest = state.locationSlots[0].card.dropSlots[0];

    expect(slotToTest.owner).toBe(level2Card);
    expect(slotToTest.card.parent).toBe(level2Card);
  });
});
