import '../Gameplay';
import Card from '../Card';
import {
  isActiveCard, isAvailableCard, isRootCard, isLocationCard, isProjectCard,
  createMatcher, createDisjunctiveMatcher, combineMatchers, createIdentityMatcher
} from '../matchers';
import LocationCard from '../cardTypes/Location';
import ProjectCard from '../cardTypes/Project';

describe('isActiveCard', () => {
  it('Matches the card with active prop set to true', () => {
    const card = new Card();
    card.active = true;
    expect(isActiveCard(card)).toBe(true);
  });
  it('Does not matches the card with active prop set to false', () => {
    const card = new Card();
    card.active = false;
    expect(isActiveCard(card)).toBe(false);
  });
});

describe('isAvailableCard', () => {
  it('Matches the card with active prop set to false', () => {
    const card = new Card();
    card.active = false;
    expect(isAvailableCard(card)).toBe(true);
  });
  it('Does not matches the card with active prop set to false', () => {
    const card = new Card();
    card.active = true;
    expect(isAvailableCard(card)).toBe(false);
  });
});

describe('isRootCard', () => {
  it('Matches the card without a parent', () => {
    const card = new Card();
    card.active = true;
    expect(isRootCard(card)).toBe(true);
  });
  it('Does not matches the card without a parent which has active prop set to false', () => {
    const card = new Card();
    card.active = false;
    expect(isRootCard(card)).toBe(false);
  });
  it('Does not matches the card with a parent', () => {
    const card = new Card();
    card.active = true;
    card.parent = new Card();
    expect(isRootCard(card)).toBe(false);
  });
});

describe('isLocationCard', () => {
  it('Matches the card that is an instance of LocationCard', () => {
    const card = new LocationCard({ values: { power: 0, space: 0 } });
    card.active = true;
    expect(isLocationCard(card)).toBe(true);
  });
  it('Does not matches the instance of LocationCard which has active prop set to false', () => {
    const card = new LocationCard({ values: { power: 0, space: 0 } });
    card.active = false;
    expect(isLocationCard(card)).toBe(false);
  });
  it('Does not matches the card which is not an instance of LocationCard', () => {
    const card = new Card();
    card.active = true;
    expect(isLocationCard(card)).toBe(false);
  });
});

describe('isProjectCard', () => {
  it('Matches the card that is an instance of ProjectCard', () => {
    const card = new ProjectCard({ cost: {} }, {});
    card.active = true;
    expect(isProjectCard(card)).toBe(true);
  });
  it('Does not matches the instance of ProjectCard which has active prop set to false', () => {
    const card = new ProjectCard({ cost: {} }, {});
    card.active = false;
    expect(isProjectCard(card)).toBe(false);
  });
  it('Does not matches the card which is not an instance of ProjectCard', () => {
    const card = new Card();
    card.active = true;
    expect(isProjectCard(card)).toBe(false);
  });
});

describe('createMatcher', () => {
  it('Can match based on the tags query', () => {

    const hasCPUTag = createMatcher({ tags: ['cpu'] });
    const hasCPUMinerTags = createMatcher({ tags: ['cpu', 'miner'] });

    const card = new Card({ tags: ['cpu', 'miner'] });

    expect(hasCPUTag(card)).toBe(false); // card.active is false by default

    card.active = true;
    expect(hasCPUTag(card)).toBe(true);

    card.tags = [];
    expect(hasCPUTag(card)).toBe(false);

    card.tags = ['cpu', 'container'];
    expect(hasCPUMinerTags(card)).toBe(false);

    card.tags = ['cpu', 'miner', 'whatever'];
    expect(hasCPUMinerTags(card)).toBe(true);

    card.active = false;
    expect(hasCPUMinerTags(card)).toBe(false);
  });

  it('Can match based on the parent query', () => {

    const hasParentLocation = createMatcher({ parent: isLocationCard });

    const location = new LocationCard({ values: { space: 0, power: 0 } });
    const nonLocation = new Card();
    const card = new Card();

    expect(hasParentLocation(card)).toBe(false); // inactive and no parent

    card.active = true;
    expect(hasParentLocation(card)).toBe(false); // active but no parent

    card.parent = location;
    expect(hasParentLocation(card)).toBe(false); // active, has parent, but parent is not active

    location.active = true;
    expect(hasParentLocation(card)).toBe(true); // active, has active parent which matches

    card.parent = nonLocation;
    expect(hasParentLocation(card)).toBe(false); // active, has parent, but parent is not active

    nonLocation.active = true;
    expect(hasParentLocation(card)).toBe(false); // active, has active parent, but parent does not match
  });

  it('Can match based on the anyParent query', () => {

    const root = new Card({ tags: ['rack', 'cpu', 'gpu'] });
    const parent = new Card({ tags: ['container', 'cpu'] });
    const card = new Card({ tags: ['miner', 'cpu'] });

    const insideCPUParent = createMatcher({ anyParent: { tags: ['cpu'] } });
    const insideContainer = createMatcher({ anyParent: { tags: ['container'] } });
    const insideRack = createMatcher({ anyParent: { tags: ['rack'] } });

    // all cards are inactive and independent
    expect(insideCPUParent(card)).toBe(false);
    expect(insideContainer(card)).toBe(false);
    expect(insideRack(card)).toBe(false);

    card.active = true;
    parent.active = true;
    root.active = true;

    // all cards are active but still independent
    expect(insideCPUParent(card)).toBe(false);
    expect(insideContainer(card)).toBe(false);
    expect(insideRack(card)).toBe(false);

    card.parent = parent;
    expect(insideCPUParent(card)).toBe(true); // parent has 'cpu' tag
    expect(insideContainer(card)).toBe(true); // parent has 'container' tag
    expect(insideRack(card)).toBe(false);

    parent.tags = ['container'];
    expect(insideCPUParent(card)).toBe(false); // parent does not have 'cpu' tag anymore
    expect(insideContainer(card)).toBe(true); // parent has 'container' tag
    expect(insideRack(card)).toBe(false);

    parent.parent = root;
    expect(insideCPUParent(card)).toBe(true); // root has 'cpu' tag
    expect(insideContainer(card)).toBe(true); // parent has 'container' tag
    expect(insideRack(card)).toBe(true); // root has 'rack' tag
  });
});

describe('createDisjunctiveMatcher', () => {
  it('Can be used to create "OR" queries', () => {

    const cpuMiner = new Card({ tags: ['miner', 'cpu'] });
    const gpuMiner = new Card({ tags: ['miner', 'cpu'] });
    const asicMiner = new Card({ tags: ['miner', 'asic'] });
    const location = new LocationCard({ values: { power: 0, space: 0 } });

    const isCPUorGPUorLocation = createDisjunctiveMatcher({ tags: ['cpu', 'gpu'], cardType: 'Location' });

    // note: disjunctive matcher matches on ANY query param, so it matches inactive cards as well
    expect(isCPUorGPUorLocation(cpuMiner)).toBe(true);
    expect(isCPUorGPUorLocation(gpuMiner)).toBe(true);
    expect(isCPUorGPUorLocation(asicMiner)).toBe(false);
    expect(isCPUorGPUorLocation(location)).toBe(true);
  });
});

describe('combineMatchers', () => {
  it('Can be used to create complex compound matchers', () => {

    const cpuMiner = new Card({ tags: ['miner', 'cpu'] });
    const gpuMiner = new Card({ tags: ['miner', 'cpu'] });
    const asicMiner = new Card({ tags: ['miner', 'asic'] });
    const container = new Card({ tags: ['container', 'cpu', 'gpu', 'asic'] });

    const isCPUorGPUMiner = combineMatchers(
      createMatcher({ tags: ['miner'] }),
      createDisjunctiveMatcher({ tags: ['cpu', 'gpu'] })
    );

    // all fail because no card is active, and we have at least one conjunctive matcher (which defaults to {active: true} query)
    expect(isCPUorGPUMiner(cpuMiner)).toBe(false);
    expect(isCPUorGPUMiner(gpuMiner)).toBe(false);
    expect(isCPUorGPUMiner(asicMiner)).toBe(false);
    expect(isCPUorGPUMiner(container)).toBe(false);

    cpuMiner.active = true;
    gpuMiner.active = true;
    asicMiner.active = true;
    container.active = true;

    expect(isCPUorGPUMiner(cpuMiner)).toBe(true);
    expect(isCPUorGPUMiner(gpuMiner)).toBe(true);
    expect(isCPUorGPUMiner(asicMiner)).toBe(false);
    expect(isCPUorGPUMiner(container)).toBe(false);
  });
});

describe('createIdentityMatcher', () => {
  it('Can be used to test object identities', () => {

    const locationA = new LocationCard({ values: { space: 0, power: 0 } });
    const locationB = new LocationCard({ values: { space: 0, power: 0 } });

    const container = new Card();
    const cardA1 = new Card();
    const cardA2 = new Card();
    const cardB = new Card();

    locationA.active = true;
    locationB.active = true;
    container.active = true;
    cardA1.active = true;
    cardA2.active = true;
    cardB.active = true;

    container.parent = locationA;
    cardA1.parent = locationA;
    cardA2.parent = container;
    cardB.parent = locationB;

    const location = cardA1.findParent(); // matcher defaults to isLocationCard

    expect(location).toBe(locationA);
    expect(location).not.toBe(locationB);

    const onLocationA = createMatcher({ anyParent: createIdentityMatcher(location) });

    expect(onLocationA(container)).toBe(true);
    expect(onLocationA(cardA1)).toBe(true);
    expect(onLocationA(cardA2)).toBe(true);
    expect(onLocationA(cardB)).toBe(false);
  });
});
