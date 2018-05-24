import Gameplay from '../../Gameplay';
import LocationCard from '../../cardTypes/Location';
import CoreMechanic from '../CoreMechanic';

describe('CoreMechanic', () => {
  it ('Reduces funds and development from gameplay stats on card play', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      stats: {
        values: { space: 10, power: 10 },
        cost: { funds: 100, development: 100 },
      },
    });

    const newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);

    expect(newState.stats.funds).toBe(0);
    expect(newState.stats.development).toBe(0);
  });
});
