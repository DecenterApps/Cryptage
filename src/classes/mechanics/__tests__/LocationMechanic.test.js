import LocationMechanic from '../../mechanics/LocationMechanic';
import Gameplay from '../../Gameplay';
import Card from '../../Card';
import LocationCard from '../../cardTypes/Location';

describe('LocationMechanic', () => {
  it ('Reduces power and space from LocationCard values on card play', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.funds = 101;
    gameplay.stats.development = 101;

    const cardToDrop = new Card({
      cost: { power: 1, space: 1, funds: 1, development: 1 },
      tags: ['asset'],
    });

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100 },
    });

    let newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    newState = await newState.locationSlots[0].card.dropSlots[1].dropCard(newState, cardToDrop);

    expect(newState.locationSlots[0].card.space).toBe(9);
    expect(newState.locationSlots[0].card.power).toBe(9);
  });
});
