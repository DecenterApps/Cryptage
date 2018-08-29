import MatcherMechanic from '../MatcherMechanic';
import Card from '../../Card';
import LocationCard from '../../cardTypes/Location';
import Gameplay from '../../Gameplay';
import Mechanic from '../../Mechanic';

describe('MatcherMechanic', () => {
  it ('Has no defined matcher', async () => {
    let gameplay = new Gameplay(0);

    const assetCard = new Card({
      cost: { development: 1, funds: 1, time: 100, level: 1 },
      bonus: { funds: 10, xp: 10 },
      tags: ['asset'],
      metadataId: 42,
    });

    const mechInstance = Mechanic.getInstance('MatcherMechanic', assetCard);
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

    expect(mechMatcher()).toBe(null);
  });
});
