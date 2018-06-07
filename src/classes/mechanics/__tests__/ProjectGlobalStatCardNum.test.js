import ProjectGlobalStatCardNum from '../ProjectGlobalStatCardNum';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';
import Card from '../../Card';
import LocationCard from '../../cardTypes/Location';

describe('ProjectGlobalStatCardNum', () => {
  it ('Boosts global stat on project end by the number of occurrences of some card times multiplier', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { experience: 10 },
      mechanics: [{ name: 'projectGlobalStatCardNum', params: ['funds', [['CPU', 100], ['GPU', 200], ['TEST', 0]]] }],
    }, gameplay);

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 1, development: 1, level: 1 },
    });

    const generalCost = { cost: { level: 1, funds: 1, space: 1, power: 0 } };

    const cpuCard = new Card({ ...generalCost, title: 'CPU' });
    const cpuCard2 = new Card({ ...generalCost, title: 'CPU' });
    const cpuCard3 = new Card({ ...generalCost, title: 'CPU' });

    const gpuCard = new Card({ ...generalCost, title: 'GPU' });
    const gpuCard2 = new Card({ ...generalCost, title: 'GPU' });

    gameplay.cards = [projectCard, cpuCard, cpuCard2, cpuCard3, gpuCard, gpuCard2, locationCard];

    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);
    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);

    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, cpuCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[1].dropCard(gameplay, cpuCard2);
    gameplay = gameplay.locationSlots[0].card.dropSlots[2].dropCard(gameplay, cpuCard3);
    gameplay = gameplay.locationSlots[0].card.dropSlots[3].dropCard(gameplay, gpuCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[4].dropCard(gameplay, gpuCard2);

    for (let i = 1; i < 11; i += 1) {
      gameplay = Object.assign(gameplay, gameplay.updateBlockNumber(gameplay, i));
    }

    expect(gameplay.stats.funds).toBe(119);
  });
});
