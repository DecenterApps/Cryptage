import ProjectCard from '../Project';
import Gameplay from '../../Gameplay';

describe('Card', () => {
  it('Has all defined constructor values', async () => {
    const gameplay = new Gameplay(0);
    const blockNumber = 100;
    const timeCost = 10;

    gameplay.level = 1;
    gameplay.blockNumber = 100;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const projectCard = new ProjectCard({
      tags: ['project'],
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50, level: 1, time: timeCost },
    }, gameplay);

    expect(projectCard.isActive).toBeFalsy();
    expect(projectCard.expiryTime).toBe(blockNumber + timeCost);
    expect(projectCard.timesFinished).toBe(0);
  });
});
