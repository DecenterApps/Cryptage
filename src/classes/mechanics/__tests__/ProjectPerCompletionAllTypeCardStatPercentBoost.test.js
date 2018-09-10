import ProjectPerCompletionAllTypeCardStatPercentBoost from '../ProjectPerCompletionAllTypeCardStatPercentBoost';
import Card from '../../Card';
import Mechanic from '../../Mechanic';
import Gameplay from '../../Gameplay';
import LocationCard from '../../cardTypes/Location';
import { createMatcher } from '../../matchers';

describe('ProjectPerCompletionAllTypeCardStatPercentBoost', () => {
  it('Has defined constructor values', async () => {
    let gameplay = new Gameplay(0);

    const cardType = 'Person';
    const stat = 'development';
    const statBoost = 10;

    const assetCard = new Card({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
      tags: ['asset'],
      metadataId: 42,
    });

    const mechInstance = Mechanic.getInstance('projectPerCompletionAllTypeCardStatPercentBoost', assetCard, [cardType, stat, statBoost]); // eslint-disable-line
    assetCard.mechanics.push(mechInstance);

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    gameplay.cards = [assetCard, locationCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    expect(mechInstance.cardType).toBe(cardType);
    expect(mechInstance.boostedStat).toBe(stat);
    expect(mechInstance.boostAmount).toBe(statBoost);
  });
});
