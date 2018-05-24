import Card from '../Card';
import Unique from '../mechanics/Unique';
import LocationCard from '../cardTypes/Location';

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
    const cardId = '0';
    const card = new Card({ id: cardId, mechanics: [{ name: 'unique' }] });

    expect(card.dropSlots).toBeInstanceOf(Array);
    expect(card.stackedCardIds).toContain(cardId);
    expect(card.active).toBeFalsy();
    expect(card.mechanics[0]).toBeInstanceOf(Unique);
  });

  it('Can level up with level bellow 5', async () => {
    const card = new Card({ level: 1, id: '0' }, null);
    const state = { stats: { funds: 1000000 } };
    const res = await card.canLevelUp(state, null);

    expect(res).toEqual(expect.objectContaining({ allowed: true }));
  });

  it('Can not level up with level 5', async () => {
    const card = new Card({ level: 5, id: '0' }, null);
    const state = { stats: { funds: 1000000 } };
    const res = await card.canLevelUp(state, null);

    expect(res).toEqual(expect.objectContaining({ allowed: false }));
  });

  it('Can not level up with not enough funds', async () => {
    const card = new Card({ level: 1, id: '0' }, null);
    const state = { stats: { funds: 0 } };
    const res = await card.canLevelUp(state, null);

    expect(res).toEqual(expect.objectContaining({ allowed: false }));
  });
});
