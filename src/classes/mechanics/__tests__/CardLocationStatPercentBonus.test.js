import CardLocationStatPercentBonus from '../CardLocationStatPercentBonus';
import Card from '../../Card';
import Mechanic from '../../Mechanic';
import Gameplay from '../../Gameplay';
import LocationCard from '../../cardTypes/Location';
import { createMatcher } from '../../matchers';

describe('CardLocationStatPercentBonus', () => {
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

    const mechInstance = Mechanic.getInstance('cardLocationStatPercentBonus', assetCard, [cardType, stat, statBoost]);
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

  it('Has right matcher', async () => {
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

    const mechInstance = Mechanic.getInstance('cardLocationStatPercentBonus', assetCard, [cardType, stat, statBoost]);
    assetCard.mechanics.push(mechInstance);

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    gameplay.cards = [assetCard, locationCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    const mechMatcher = mechInstance.getMatcher();
    const mockMatcher = createMatcher({ parent: locationCard });

    expect(JSON.stringify(mechMatcher) === JSON.stringify(mockMatcher)).toBeTruthy();
  });

  it('Changes relative bonus of other card', async () => {
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

    const mechInstance = Mechanic.getInstance('cardLocationStatPercentBonus', assetCard, [cardType, stat, statBoost]);
    assetCard.mechanics.push(mechInstance);

    const locationCard = new LocationCard({
      values: { space: 10, power: 10 },
      cost: { funds: 50, development: 50 },
      acceptedTags: ['asset'],
    });

    gameplay.cards = [assetCard, locationCard];

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, assetCard);

    expect(mechInstance.createChangeBonus(statBoost)).toEqual({ [stat]: { absolute: 0, relative: statBoost } });
  });
});
