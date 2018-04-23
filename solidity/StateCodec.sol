pragma solidity ^0.4.20;

contract StateCodec {

  mapping(address => State) states;

  struct State {
    uint48 funds;
    uint16 fundsPerBlock;
    uint32 experience;
    uint16 developmentLeft;
    uint32 blockNumber;
    Location[6] locations;
    Project[10] projects;
  }

  struct Location {
    uint16 card;
    uint16 numberOfCards;
    uint16 spaceLeft;
    uint16 powerLeft;
    Power[] powers;
    ComputerCase[] computerCases;
    RigCase[] rigCases;
    MountCase[] mountCases;
    Developer[] developers;
    SpecialCard[] specialCards;
  }

  struct Power {
    uint16 card;
    uint8 count;
  }

  struct ComputerCase {
    uint8 cpuCount;
    uint8 gpuCount;
  }

  struct RigCase {
    uint8 gpuCount;
  }

  struct MountCase {
    uint8 asicCount;
  }

  struct Developer {
    uint16 card;
    uint8 count;
  }

  struct SpecialCard {
    uint16 card;
    uint16 effect;
  }

  struct Project {
    uint16 card;
    uint16 timeLeft;
  }

  function test() public pure returns(bytes) {
    Location[6] memory locations;

    Power[] memory powers;
    ComputerCase[] memory computerCases;
    RigCase[] memory rigCases;
    MountCase[] memory mountCases;
    Developer[] memory developers;
    SpecialCard[] memory specialCards;
    locations[0] = Location({
      card: 123,
      numberOfCards: 123,
      spaceLeft: 123,
      powerLeft: 123,
      powers: powers,
      computerCases: computerCases,
      rigCases: rigCases,
      mountCases: mountCases,
      developers: developers,
      specialCards: specialCards
      });
    Project[10] memory projects;
    projects[0] = Project({
      card: 123,
      timeLeft: 123
      });
    State memory state = State({
      funds: 123,
      fundsPerBlock: 123,
      experience: 123,
      developmentLeft: 123,
      blockNumber: 123,
      locations: locations,
      projects: projects
      });

    return encode(state);
  }

  function encode(State state) internal pure returns (bytes) {
    uint[6] memory locationCount;
    uint capacity = 60;

    for (uint i = 0; i < 6; i++) {
      if (state.locations[i].card != 0) {
        locationCount[i] = 15 + state.locations[i].powers.length * 3 +
        state.locations[i].computerCases.length * 2 +
        state.locations[i].rigCases.length +
        state.locations[i].mountCases.length +
        state.locations[i].developers.length * 3 +
        state.locations[i].specialCards.length * 4;
      }

      capacity += 1 + locationCount[i];
    }

    bytes memory buffer = new bytes(capacity);

    uint position = 1;

    uint data = state.funds * (2 << 207) + state.fundsPerBlock * (2 << 191) +
    state.experience * (2 << 159) + state.developmentLeft * (2 << 143) +
    state.blockNumber * (2 << 111);
    uint size = 18;

    (position, data, size) = append(buffer, position, data, capacity - 60, size, 1);
    for (i = 0; i < 6; i++) {
      (position, data, size) = append(buffer, position, data, locationCount[i], size, 1);
      if (state.locations[i].card != 0) {
        (position, data, size) = append(buffer, position, data, state.locations[i].card, size, 2);
        (position, data, size) = append(buffer, position, data, state.locations[i].numberOfCards, size, 2);
        (position, data, size) = append(buffer, position, data, state.locations[i].spaceLeft, size, 2);
        (position, data, size) = append(buffer, position, data, state.locations[i].powerLeft, size, 2);

        (position, data, size) = append(buffer, position, data, state.locations[i].powers.length, size, 1);
        for (uint j = 0; j < state.locations[i].powers.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].card, size, 2);
          (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].count, size, 1);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].computerCases.length, size, 1);
        for (j = 0; j < state.locations[i].computerCases.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].computerCases[j].cpuCount, size, 1);
          (position, data, size) = append(buffer, position, data, state.locations[i].computerCases[j].gpuCount, size, 1);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].rigCases.length, size, 1);
        for (j = 0; j < state.locations[i].rigCases.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].rigCases[j].gpuCount, size, 1);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].mountCases.length, size, 1);
        for (j = 0; j < state.locations[i].mountCases.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].mountCases[j].asicCount, size, 1);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].developers.length, size, 1);
        for (j = 0; j < state.locations[i].developers.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].card, size, 2);
          (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].count, size, 1);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].specialCards.length, size, 1);
        for (j = 0; j < state.locations[i].specialCards.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].card, size, 2);
          (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].effect, size, 2);
        }
      }
    }

    (position, data, size) = append(buffer, position, data, state.projects.length * 4, size, 1);
    for (i = 0; i < state.projects.length; i++) {
      (position, data, size) = append(buffer, position, data, state.projects[i].card, size, 2);
      (position, data, size) = append(buffer, position, data, state.projects[i].timeLeft, size, 2);
    }

    return buffer;
  }

  function append(bytes buffer, uint position, uint data, uint nextData, uint size, uint nextSize) public pure returns (uint, uint, uint) {
    if (size + nextSize >= 32) {
      data += (nextData >> ((32 - size - nextSize) * 8));
      assembly { mstore(add(buffer, mul(position, 32)), data) }
      size = (size + nextSize - 32);
      data = nextData & (2 << (size * 8)) - 1;
      position += 1;
    } else {
      size = size + nextSize;
      data += nextData * (2 << ((32 - size) * 8 - 1));
    }

    return (position, data, size);
  }

  // function decode(bytes input) internal pure returns (State) {

  // }
}
