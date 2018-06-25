import ContainerCard from '../Container';
import Gameplay from '../../Gameplay';

describe('Container', () => {
  it('Has all defined constructor values', async () => {
    const gameplay = new Gameplay(0);
    const space = 10;

    gameplay.level = 1;
    gameplay.blockNumber = 100;
    gameplay.stats.funds = 100;
    gameplay.stats.development = 100;

    const containerCard = new ContainerCard({
      values: { space: 10, power: 10 },
      acceptedTags: [],
      cost: { funds: 50, development: 50, level: 1, values: { space } },
    }, gameplay);

    expect(containerCard.space).toBe(space);
  });
});
