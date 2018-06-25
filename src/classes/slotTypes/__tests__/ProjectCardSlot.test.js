import ProjectCard from '../../cardTypes/Project';
import Gameplay from '../../Gameplay';

describe('ProjectCardSlot', () => {
  it ('Can drop ProjectCard on ProjectCardSlot', async () => {
    const gameplay = new Gameplay(0);

    gameplay.level = 1;
    gameplay.blockNumber = 100;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const projectCard = new ProjectCard({
      tags: ['project'],
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50, level: 1, time: 10 },
    }, gameplay);

    const destinationSlot = gameplay.projectSlots[0];

    const canDrop = await destinationSlot.canDrop(gameplay, projectCard);
    expect(canDrop.allowed).toBeTruthy();
  });
});
