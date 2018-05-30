import Gameplay from '../../Gameplay';
import LocationCard from '../../cardTypes/Location';
import CoreMechanic from '../CoreMechanic';

describe('CoreMechanic', () => {
  it ('Reduces funds and development from gameplay stats on card play', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.level = 1;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100, level: 1 },
    });

    const newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);

    expect(newState.stats.funds).toBe(0);
    expect(newState.stats.development).toBe(0);
  });

  it('Returns development when card is returned to the hand', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.level = 1;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100, level: 1 },
    });

    let newState = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    newState = gameplay.locationSlots[0].removeCard(newState);

    expect(newState.stats.development).toBe(100);
  });

  it('Does not allow a card to be played when the user does not have enough of some stat to play it', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.level = 1;
    gameplay.stats.funds = 0;
    gameplay.stats.development = 0;

    const locationCard = new LocationCard({
      metadataId: '0',
      tags: ['location'],
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100, level: 1 },
    });

    const canDrop = await gameplay.locationSlots[0].canDrop(gameplay, locationCard);
    expect(canDrop).toBeFalsy();
  });

  it('Allows a card to be played when the user has enough of some stat to play it', async () => {
    const gameplay = new Gameplay(0);

    gameplay.stats.level = 1;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      metadataId: '0',
      tags: ['location'],
      values: { space: 10, power: 10 },
      cost: { funds: 100, development: 100, level: 1 },
    });

    const canDrop = await gameplay.locationSlots[0].canDrop(gameplay, locationCard);
    expect(canDrop).toBeTruthy();
  });
});
