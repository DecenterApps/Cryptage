import Card2ProjectStatBonus from '../Card2ProjectStatBonus';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';
import Card from '../../Card';
import Mechanic from '../../Mechanic';
import LocationCard from '../../cardTypes/Location';

describe('Card2ProjectStatBonus', () => {
  it('Already dropped projects gain a boos in defined stat', async () => {
    const stat = 'funds';
    const statBoost = 2;
    const baseStatVal = 10;

    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const assetCard = new Card({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
      tags: ['asset'],
      metadataId: 42,
    }, gameplay);

    assetCard.mechanics.push(Mechanic.getInstance('card2ProjectStatBonus', this, [37, stat, statBoost]));

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { [stat]: baseStatVal, xp: 10 },
      metadataId: 37,
    }, gameplay);

    gameplay.cards = [locationCard, assetCard, projectCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.projectSlots[1].dropCard(gameplay, projectCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    expect(projectCard.getGainsStatValue(stat)).toBe(baseStatVal + statBoost);
  });

  it('Newly dropped projects gain a boos in defined stat', async () => {
    const stat = 'funds';
    const statBoost = 2;
    const baseStatVal = 10;

    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const assetCard = new Card({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
      tags: ['asset'],
      metadataId: 42,
    }, gameplay);

    assetCard.mechanics.push(Mechanic.getInstance('card2ProjectStatBonus', this, [37, stat, statBoost]));

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { [stat]: baseStatVal, xp: 10 },
      metadataId: 37,
    }, gameplay);

    gameplay.cards = [locationCard, assetCard, projectCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);
    gameplay = gameplay.projectSlots[1].dropCard(gameplay, projectCard);

    expect(projectCard.getGainsStatValue(stat)).toBe(baseStatVal + statBoost);
  });

  it('On project withdraw the boost is deducted', async () => {
    const stat = 'funds';
    const statBoost = 2;
    const baseStatVal = 10;

    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const assetCard = new Card({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
      tags: ['asset'],
      metadataId: 42,
    }, gameplay);

    assetCard.mechanics.push(Mechanic.getInstance('card2ProjectStatBonus', this, [37, stat, statBoost]));

    const projectCard = new ProjectCard({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { [stat]: baseStatVal, xp: 10 },
      metadataId: 37,
    }, gameplay);

    gameplay.cards = [locationCard, assetCard, projectCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);
    gameplay = gameplay.projectSlots[1].dropCard(gameplay, projectCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].removeCard(gameplay);

    expect(projectCard.getGainsStatValue(stat)).toBe(baseStatVal);
  });
});
