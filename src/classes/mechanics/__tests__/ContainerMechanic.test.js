import Gameplay from '../../Gameplay';
import Card from '../../Card';
import ContainerCard from '../../cardTypes/Container';
import LocationCard from '../../cardTypes/Location';

const toggleLocationPower = (power, truthy) => {
  let gameplay = new Gameplay(0);

  gameplay.stats.funds = 101;
  gameplay.stats.level = 20;
  gameplay.stats.development = 101;

  const cardData = {
    id: 0,
    level: 1,
    metadataId: 0,
    values: { space: 1 },
    cost: { funds: 50, development: 50, level: 1, power: 1, space: 1 },
    tags: ['asset'],
    acceptedTags: ['miner'],
  };
  const containerCard = new ContainerCard(cardData);

  const cardToDrop = new Card({
    id: 1,
    level: 1,
    metadataId: 0,
    cost: { power: 11, space: 1, funds: 1, development: 1, level: 1 },
    tags: ['miner'],
  });

  const locationCard = new LocationCard({
    id: 2,
    level: 1,
    metadataId: 0,
    values: { space: 10, power },
    cost: { funds: 50, development: 50, level: 1 },
    acceptedTags: ['asset'],
  });

  gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
  gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);

  const destinationSlot = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0];
  const canDrop = destinationSlot.canDrop(gameplay, cardToDrop);

  if (truthy) {
    expect(canDrop.canDropInContainer).toBeTruthy();
  } else {
    expect(canDrop.canDropInContainer).toBeFalsy();
  }
};

describe('ContainerMechanic', () => {
  it ('Can not play miner if location does not have enough power', () => {
    toggleLocationPower(10);
  });

  it ('Can play miner if location has enough power', () => {
    toggleLocationPower(100, true);
  });

  it ('Can play miner if container has filled non max-ed out drop slots', () => {
    let gameplay = new Gameplay(0);

    gameplay.stats.funds = 1000;
    gameplay.stats.level = 20;
    gameplay.stats.development = 1000;

    const cardData = {
      id: 0,
      level: 1,
      metadataId: 0,
      values: { space: 1 },
      cost: { funds: 50, development: 50, level: 1, power: 1, space: 1 },
      tags: ['asset'],
      acceptedTags: ['miner'],
    };
    const containerCard = new ContainerCard(cardData);

    const cardToDropData = {
      id: 1,
      level: 1,
      metadataId: 0,
      cost: { power: 11, space: 1, funds: 1, development: 1, level: 1 },
      tags: ['miner'],
    };
    const cardToDrop = new Card(cardToDropData);
    const cardToCopy = new Card(cardToDropData, { ...cardToDropData, id: 5 });

    const locationCard = new LocationCard({
      id: 2,
      level: 1,
      metadataId: 0,
      values: { space: 10, power: 50 },
      cost: { funds: 50, development: 50, level: 1 },
      acceptedTags: ['asset'],
    });

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].dropCard(gameplay, cardToDrop);

    const destinationSlot = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0];
    const canDrop = destinationSlot.canDrop(gameplay, cardToCopy);

    expect(canDrop.allowed).toBeTruthy();
  });

  it('Player can not play miner in a container with maxed out drop slots', () => {
    let gameplay = new Gameplay(0);

    gameplay.stats.funds = 1000;
    gameplay.stats.level = 20;
    gameplay.stats.development = 1000;

    const cardData = {
      id: 0,
      level: 1,
      metadataId: 0,
      values: { space: 2 },
      cost: { funds: 50, development: 50, level: 1, space: 1, power: 1 },
      tags: ['asset'],
      acceptedTags: ['miner'],
    };
    const containerCard = new ContainerCard(cardData);

    const cardToDropData = {
      id: 1,
      level: 1,
      metadataId: 0,
      cost: { power: 11, space: 1, funds: 1, development: 1, level: 1  },
      tags: ['miner'],
    };
    const cardToDrop = new Card(cardToDropData);
    const cardToDrop2 = new Card(cardToDropData);
    const cardToCopy = new Card(cardToDropData, { ...cardToDropData, id: 5 });

    const locationCard = new LocationCard({
      id: 2,
      level: 1,
      metadataId: 0,
      values: { space: 10, power: 50 },
      cost: { funds: 50, development: 50, level: 1 },
      acceptedTags: ['asset'],
    });

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].dropCard(gameplay, cardToDrop);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[1].dropCard(gameplay, cardToDrop2);

    gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].card.level = 5;
    gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[1].card.level = 5;

    const destinationSlot = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0];

    const canDrop = destinationSlot.canDrop(gameplay, cardToCopy);

    expect(canDrop.allowed).toBeFalsy();
  });

  it('On miner drop reduces location power and container space', () => {
    let gameplay = new Gameplay(0);

    gameplay.stats.funds = 1000;
    gameplay.stats.level = 20;
    gameplay.stats.development = 1000;

    const cardData = {
      id: 0,
      level: 1,
      metadataId: 0,
      values: { space: 2 },
      cost: { funds: 50, development: 50, level: 1, space: 1, power: 1 },
      tags: ['asset'],
      acceptedTags: ['miner'],
    };
    const containerCard = new ContainerCard(cardData);

    const cardToDropData = {
      id: 1,
      level: 1,
      metadataId: 0,
      cost: { power: 11, space: 1, funds: 1, development: 1, level: 1  },
      tags: ['miner'],
    };
    const cardToDrop = new Card(cardToDropData);

    const locationCard = new LocationCard({
      id: 2,
      level: 1,
      metadataId: 0,
      values: { space: 10, power: 50 },
      cost: { funds: 50, development: 50, level: 1 },
      acceptedTags: ['asset'],
    });

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].dropCard(gameplay, cardToDrop);

    expect(locationCard.power).toBe(38);
    expect(containerCard.space).toBe(1);
  });

  it('On miner withdraw returns location power and container space', () => {
    let gameplay = new Gameplay(0);

    gameplay.stats.funds = 1000;
    gameplay.stats.level = 20;
    gameplay.stats.development = 1000;

    const cardData = {
      id: 0,
      level: 1,
      metadataId: 0,
      values: { space: 2 },
      cost: { funds: 50, development: 50, level: 1, space: 1, power: 1 },
      tags: ['asset'],
      acceptedTags: ['miner'],
    };
    const containerCard = new ContainerCard(cardData);

    const cardToDropData = {
      id: 1,
      level: 1,
      metadataId: 0,
      cost: { power: 11, space: 1, funds: 1, development: 1, level: 1  },
      tags: ['miner'],
    };
    const cardToDrop = new Card(cardToDropData);

    const locationCard = new LocationCard({
      id: 2,
      level: 1,
      metadataId: 0,
      values: { space: 10, power: 50 },
      cost: { funds: 50, development: 50, level: 1 },
      acceptedTags: ['asset'],
    });

    gameplay = gameplay.locationSlots[0].dropCard(gameplay, locationCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].dropCard(gameplay, containerCard);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].dropCard(gameplay, cardToDrop);
    gameplay = gameplay.locationSlots[0].card.dropSlots[0].card.dropSlots[0].removeCard(gameplay);

    expect(locationCard.power).toBe(49);
    expect(containerCard.space).toBe(2);
  });
});
