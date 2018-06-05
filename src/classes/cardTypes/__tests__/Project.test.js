import ProjectCard from '../Project';
import Gameplay from '../../Gameplay';

const toggleStatsForRestart = (stats, statToCheck, blockTime = 11, truthy = true, deductDev = false) => {
  let gameplay = new Gameplay(0);
  gameplay.stats = stats;

  const projectCard = new ProjectCard({
    cost: { development: 1, funds: 50, time: 10, level: 1 },
    bonus: { funds: 10, experience: 10 },
  }, gameplay);

  gameplay.cards = [projectCard];
  gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

  for (let i = 1; i < blockTime; i += 1) {
    gameplay = Object.assign(gameplay, gameplay.updateBlockNumber(gameplay, i));
  }

  if (deductDev) gameplay.stats.development = 0;

  const canRestart = projectCard.canRestart(gameplay);

  if (truthy) {
    expect(canRestart[statToCheck]).toBeTruthy();
  } else {
    expect(canRestart[statToCheck]).toBeFalsy();
  }
};

describe('Project', () => {
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

    expect(projectCard.running).toBeTruthy();
    expect(projectCard.expiryTime).toBe(blockNumber + timeCost);
    expect(projectCard.timesFinished).toBe(0);
  });

  it('Can restart a project with enough dev, funds and when the project is no running', async () => {
    toggleStatsForRestart({ development: 100, experience: 0, funds: 100 }, 'allowed');
  });

  it('Can not restart a project when the project is not running', async () => {
    toggleStatsForRestart({ development: 100, experience: 0, funds: 100 }, 'projectActive', 10, false);
  });

  it('Can not restart a project when there are not enough funds', async () => {
    toggleStatsForRestart({ development: 100, experience: 0, funds: 50 }, 'funds', 11, false);
  });

  it('Can not restart a project when there is not enough development', async () => {
    toggleStatsForRestart({ development: 1, experience: 0, funds: 100 }, 'development', 11, false, true);
  });

  it('Restart projects changes state stats and project stats', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats = { development: 100, experience: 0, funds: 100 };

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 50, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

    for (let i = 1; i < 11; i += 1) {
      gameplay = Object.assign(gameplay, gameplay.updateBlockNumber(gameplay, i));
    }

    gameplay = projectCard.restartProject(gameplay);

    expect(projectCard.running).toBeTruthy();
    expect(projectCard.expiryTime).toBe(10 + projectCard.cost.time);
    expect(gameplay.stats.development).toBe(99);
    expect(gameplay.stats.funds).toBe(10);
  });
});
