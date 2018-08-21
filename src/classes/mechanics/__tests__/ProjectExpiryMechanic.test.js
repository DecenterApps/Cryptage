import ProjectExpiryMechanic from '../ProjectExpiryMechanic';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';

describe('ProjectExpiryMechanic', () => {
  it('Can not withdraw a project that is active', async () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
    }, gameplay);

    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);
    const canWithdraw = gameplay.projectSlots[0].card.canWithdraw(gameplay);

    expect(canWithdraw.projectActive).toBeFalsy();
  });

  it ('Finished project when expiry time runs out', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

    for (let i = 1; i < 11; i += 1) {
      gameplay = Object.assign(gameplay, gameplay.updateBlockNumber(gameplay, i));
    }

    expect(projectCard.running).toBeFalsy();
    expect(projectCard.expiryTime).toBe(null);
    expect(projectCard.timesFinished).toBe(1);
    expect(gameplay.stats.experience).toBe(10);
    expect(gameplay.stats.development).toBe(100);
    expect(gameplay.stats.funds).toBe(109);
  });
});
