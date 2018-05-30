import MinerCard from '../../cardTypes/Miner';
import Gameplay from '../../Gameplay';
import LocationCard from '../../cardTypes/Location';
import ContainerCard from '../../cardTypes/Container';

describe('ContainerCardSlot', () => {
  it ('Can drop minerCard on containerCardSlot', async () => {
    let gameplay = new Gameplay(0);

    gameplay.level = 1;
    gameplay.blockNumber = 100;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const locationCard = new LocationCard({
      name: 'Lokacija',
      values: { space: 10, power: 10 },
      cost: { funds: 0, development: 0, level: 1 },
    });

    const containerCard = new ContainerCard({
      name: 'Kontis',
      values: { space: 10 },
      cost: { funds: 0, development: 0, level: 1 },
      tags: ['asset'],
      acceptedTags: ['miner'],
    });

    const minerCard = new MinerCard({
      name: 'Miner',
      tags: ['miner'],
      cost: { funds: 0, development: 0, level: 1 },
    });

    gameplay = await gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = await gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);

    const destinationSlot = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0];

    const canDrop = await destinationSlot.canDrop(gameplay, minerCard);
    expect(canDrop.allowed).toBeTruthy();
  });
});
