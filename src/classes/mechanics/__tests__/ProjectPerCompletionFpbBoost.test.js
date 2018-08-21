import ProjectPerCompletionFpbBoost from '../ProjectPerCompletionFpbBoost';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';

describe('ProjectPerCompletionFpbBoost', () => {
  it ('Boosts card stat on project end by the number of times it has finished times a multipler', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
      mechanics: [{ name: 'projectPerCompletionFpbBoost', params: [10] }],
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

    for (let i = 1; i < 11; i += 1) {
      gameplay = Object.assign(gameplay, gameplay.updateBlockNumber(gameplay, i));
    }

    expect(gameplay.stats.fundsPerBlock).toBe(10);
  });
});
