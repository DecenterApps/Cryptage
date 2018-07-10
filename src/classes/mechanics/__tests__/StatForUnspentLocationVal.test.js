import StatForUnspentLocationVal from '../StatForUnspentLocationVal';
import Gameplay from '../../Gameplay';
import ProjectCard from '../../cardTypes/Project';
import Card from '../../Card';
import Mechanic from '../../Mechanic';
import LocationCard from '../../cardTypes/Location';

describe('StatForUnspentLocationVal', () => {
  it('Changes mech card when the boost amount changes', async () => {
    const locationStat = 'space';
    const stat = 'fundsPerBlock';
    const statBoost = 2;
    const baseBonus = 100;

    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const assetCard = new Card({
      cost: { development: 1, funds: 1, level: 1, space: 1 },
      bonus: { fundsPerBlock: baseBonus },
      tags: ['asset'],
    }, gameplay);

    const assetCard2 = new Card({
      cost: { development: 1, funds: 1, level: 1, space: 2 },
      bonus: { funds: 3 },
      tags: ['asset'],
    }, gameplay);

    const mechInstance = Mechanic.getInstance('statForUnspentLocationVal', assetCard, [locationStat, stat, statBoost]);
    assetCard.mechanics.push(mechInstance);

    gameplay.cards = [locationCard, assetCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    expect(assetCard.getBonusStatValue(stat)).toBe(baseBonus + (locationCard.space * statBoost));

    gameplay = gameplay.locationSlots[0].card.dropSlots[1].dropCard(gameplay, assetCard2);

    expect(assetCard.getBonusStatValue(stat)).toBe(baseBonus + (locationCard.space * statBoost));
  });

  it('Resets mech card additional bonus on withdraw', async () => {
    const locationStat = 'space';
    const stat = 'fundsPerBlock';
    const statBoost = 2;
    const baseBonus = 100;

    let gameplay = new Gameplay(0);
    gameplay.stats.development = 100;
    gameplay.stats.funds = 100;

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    const assetCard = new Card({
      cost: { development: 1, funds: 1, level: 1, space: 1 },
      bonus: { fundsPerBlock: baseBonus },
      tags: ['asset'],
    }, gameplay);

    const mechInstance = Mechanic.getInstance('statForUnspentLocationVal', assetCard, [locationStat, stat, statBoost]);
    assetCard.mechanics.push(mechInstance);

    gameplay.cards = [locationCard, assetCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].removeCard(gameplay);

    expect(assetCard.getBonusStatValue(stat)).toBe(baseBonus);
  });
});
