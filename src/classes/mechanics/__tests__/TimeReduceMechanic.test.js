import TimeReduceMechanic from '../TimeReduceMechanic';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';

describe('TimeReduceMechanic', () => {
  it ('Changes project execution time by the amount defined in the params', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;
    gameplay.projectExecutionTimePercent = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
      mechanics: [{ name: 'timeReduce', params: [10] }],
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

    expect(gameplay.projectExecutionTimePercent).toBe(90);
  });

  it ('If the changed project execution time is bellow 0, sets it to 0', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;
    gameplay.projectExecutionTimePercent = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
      mechanics: [{ name: 'timeReduce', params: [110] }],
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);

    expect(gameplay.projectExecutionTimePercent).toBe(0);
  });

  it ('Returns project execution time percent on withdraw', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;
    gameplay.projectExecutionTimePercent = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
      mechanics: [{ name: 'timeReduce', params: [10] }],
    }, gameplay);

    gameplay.cards = [projectCard];
    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);
    gameplay = gameplay.projectSlots[0].removeCard(gameplay);

    expect(gameplay.projectExecutionTimePercent).toBe(100);
  });

  it ('If after withdraw the project execution time percent is over 100, sets it to 100', () => {
    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.experience = 0;
    gameplay.stats.funds = 100;
    gameplay.projectExecutionTimePercent = 100;

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 10, level: 1 },
      bonus: { funds: 10, experience: 10 },
      mechanics: [{ name: 'timeReduce', params: [110] }],
    }, gameplay);

    gameplay.cards = [projectCard];

    gameplay = gameplay.projectSlots[0].dropCard(gameplay, projectCard);
    gameplay = gameplay.projectSlots[0].removeCard(gameplay);

    expect(gameplay.projectExecutionTimePercent).toBe(100);
  });
});
