import Card from '../Card';
import LocationCard from '../cardTypes/Location';
import Unique from '../mechanics/Unique';
import Mechanic from '../Mechanic';

describe('Card', () => {
  it('Returns right constructor for registered card type', async () => {
    Card.registerTypeConstructor('Location', LocationCard);

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
});
