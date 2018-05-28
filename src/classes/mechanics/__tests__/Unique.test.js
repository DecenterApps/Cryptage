import Unique from '../Unique';
import Card from '../../Card';
import LocationCard from '../../cardTypes/Location';
import Gameplay from '../../Gameplay';

describe('Unique', () => {
  it ('Can drop card when there is not a card with the same title played', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const uniqueCard = new Card({
      mechanics: [{ name: 'unique' }],
      cost: { power: 0, space: 0, funds: 1, development: 1 },
      tags: ['asset'],
    });

    const newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    const destinationSlot = newState.locationSlots[0].card.dropSlots[0];

    const canDrop = await destinationSlot.canDrop(newState, uniqueCard);
    expect(canDrop).toBeTruthy();
  });

  it ('Can not drop card when there is already a card with the same title played', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const cardSameAsUnique = new Card({
      title: 'SomeCard',
      cost: { power: 0, space: 0, funds: 1, development: 1 },
      tags: ['asset'],
    });

    const uniqueCard = new Card({
      title: 'SomeCard',
      mechanics: [{ name: 'unique' }],
      cost: { power: 0, space: 0, funds: 1, development: 1 },
      tags: ['asset'],
    });

    let newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    newState = await newState.locationSlots[0].card.dropSlots[1].dropCard(newState, cardSameAsUnique);

    const destinationSlot = newState.locationSlots[0].card.dropSlots[0];

    const canDrop = await destinationSlot.canDrop(newState, uniqueCard);
    expect(canDrop).toBeFalsy();
  });
});
