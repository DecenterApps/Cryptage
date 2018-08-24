import CardNumStatMultiplier from '../CardNumStatMultiplier';
import Gameplay from '../../Gameplay';
import Card from '../../Card';
import Mechanic from '../../Mechanic';
import LocationCard from '../../cardTypes/Location';

describe('CardNumStatMultiplier', () => {
  it('Bonus equals the number of observed card occurrences times multiplier', async () => {
    const observedCardId = '36';
    const stat = 'development';
    const timesMultiplier = 2;
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
      bonus: { development: baseBonus },
      tags: ['asset'],
      metadataId: observedCardId,
    }, gameplay);

    const assetCard2 = new Card({
      cost: { development: 1, funds: 1, level: 1, space: 2 },
      bonus: { funds: 3 },
      tags: ['asset'],
      metadataId: observedCardId,
    }, gameplay);

    const mechName = 'cardNumStatMultiplier';
    const mechInstance = Mechanic.getInstance(mechName, assetCard, [observedCardId, stat, timesMultiplier]);
    assetCard.mechanics.push(mechInstance);

    gameplay.cards = [locationCard, assetCard, assetCard2];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    expect(assetCard.getBonusStatValue(stat)).toBe(baseBonus + (1 * timesMultiplier));

    gameplay = gameplay.locationSlots[0].card.dropSlots[1].dropCard(gameplay, assetCard2);

    expect(assetCard.getBonusStatValue(stat)).toBe(baseBonus + (2 * timesMultiplier));
  });
});
