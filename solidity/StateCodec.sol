pragma solidity ^0.4.20;

contract StateCodec {

  mapping(address => bytes) states;

  struct State {
    // uint48
    uint funds;
    // uint16
    uint fundsPerBlock;
    // uint32
    uint experience;
    // uint16
    uint developmentLeft;
    // uint32
    uint blockNumber;
    Location[6] locations;
    Project[10] projects;
  }

  struct Location {
    // uint16
    uint card;
    // uint16
    uint numberOfCards;
    // uint16
    uint spaceLeft;
    // uint16
    uint powerLeft;
    Power[] powers;
    ComputerCase[] computerCases;
    RigCase[] rigCases;
    MountCase[] mountCases;
    Developer[] developers;
    SpecialCard[] specialCards;
  }

  struct Power {
    // uint16
    uint card;
    // uint8
    uint count;
  }

  struct ComputerCase {
    // uint8
    uint cpuCount;
    // uint8
    uint gpuCount;
  }

  struct RigCase {
    // uint8
    uint gpuCount;
  }

  struct MountCase {
    // uint8
    uint asicCount;
  }

  struct Developer {
    // uint16
    uint card;
    // uint8
    uint count;
  }

  struct SpecialCard {
    // uint16
    uint card;
    // uint16
    uint effect;
  }

  struct Project {
    // uint16
    uint card;
    // uint16
    uint timeLeft;
  }

  function test() public pure returns(bool) {
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
    locations[1] = Location({
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
    projects[1] = Project({
      card: 123,
      timeLeft: 123
      });
    projects[2] = Project({
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

    State memory newState = decode(encode(state));

    if (state.funds != newState.funds || state.fundsPerBlock != newState.fundsPerBlock ||
    state.experience != newState.experience || state.developmentLeft != newState.developmentLeft ||
    state.blockNumber != newState.blockNumber) {
      return false;
    }

    for (uint i = 0; i < 6; i++) {
      if (state.locations[i].card != newState.locations[i].card ||
      state.locations[i].numberOfCards != newState.locations[i].numberOfCards ||
      state.locations[i].spaceLeft != newState.locations[i].spaceLeft ||
      state.locations[i].powerLeft != newState.locations[i].powerLeft ||
      state.locations[i].powers.length != newState.locations[i].powers.length ||
      state.locations[i].computerCases.length != newState.locations[i].computerCases.length ||
      state.locations[i].rigCases.length != newState.locations[i].rigCases.length ||
      state.locations[i].mountCases.length != newState.locations[i].mountCases.length ||
      state.locations[i].developers.length != newState.locations[i].developers.length ||
      state.locations[i].specialCards.length != newState.locations[i].specialCards.length) {
        return false;
      }

      for (uint j = 0; j < state.locations[i].powers.length; j++) {
        if (state.locations[i].powers[j].card != newState.locations[i].powers[j].card ||
        state.locations[i].powers[j].count != newState.locations[i].powers[j].count) {
          return false;
        }
      }

      for (j = 0; j < state.locations[i].computerCases.length; j++) {
        if (state.locations[i].computerCases[j].cpuCount != newState.locations[i].computerCases[j].cpuCount ||
        state.locations[i].computerCases[j].gpuCount != newState.locations[i].computerCases[j].gpuCount) {
          return false;
        }
      }

      for (j = 0; j < state.locations[i].rigCases.length; j++) {
        if (state.locations[i].rigCases[j].gpuCount != newState.locations[i].rigCases[j].gpuCount) {
          return false;
        }
      }

      for (j = 0; j < state.locations[i].mountCases.length; j++) {
        if (state.locations[i].mountCases[j].asicCount != newState.locations[i].mountCases[j].asicCount) {
          return false;
        }
      }

      for (j = 0; j < state.locations[i].developers.length; j++) {
        if (state.locations[i].developers[j].card != newState.locations[i].developers[j].card ||
        state.locations[i].developers[j].count != newState.locations[i].developers[j].count) {
          return false;
        }
      }

      for (j = 0; j < state.locations[i].specialCards.length; j++) {
        if (state.locations[i].specialCards[j].card != newState.locations[i].specialCards[j].card ||
        state.locations[i].specialCards[j].effect != newState.locations[i].specialCards[j].effect) {
          return false;
        }
      }

    }

    for (i = 0; i < 10; i++) {
      if (state.projects[i].card != newState.projects[i].card ||
        state.projects[i].timeLeft != newState.projects[i].timeLeft) {
      }
    }

    return true;
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

    for (i = 0; i < state.projects.length; i++) {
      (position, data, size) = append(buffer, position, data, state.projects[i].card, size, 2);
      (position, data, size) = append(buffer, position, data, state.projects[i].timeLeft, size, 2);
    }

    return buffer;
  }

  function append(bytes buffer, uint position, uint data, uint nextData, uint size, uint nextSize) public pure returns (uint, uint, uint) {
    if (size + nextSize >= 32) {
      data += (nextData >> ((size + nextSize - 32) * 8));
      assembly { mstore(add(buffer, mul(position, 32)), data) }
      size = (size + nextSize - 32);
      data = nextData & (uint(2) << (size * 8)) - 1;
      position += 1;
    } else {
      size = size + nextSize;
      data += nextData * (uint(2) << ((32 - size) * 8 - 1));
    }

    return (position, data, size);
  }

  function decode(bytes buffer) internal pure returns (State memory state) {
    uint position = 1;
    uint size = 0;

    Location[6] memory locations;
    Project[10] memory projects;

    state = State({
      funds: 0,
      fundsPerBlock: 0,
      experience: 0,
      developmentLeft: 0,
      blockNumber: 0,
      locations: locations,
      projects: projects
      });

    (position, state.funds, size) = read(buffer, position, size, 6);
    (position, state.fundsPerBlock, size) = read(buffer, position, size, 2);
    (position, state.experience, size) = read(buffer, position, size, 4);
    (position, state.developmentLeft, size) = read(buffer, position, size, 2);
    (position, state.blockNumber, size) = read(buffer, position, size, 4);
    for (uint i = 0; i < 6; i++) {
      uint locationCount;
      (position, locationCount, size) = read(buffer, position, size, 1);
      if (locationCount != 0) {
        (position, state.locations[i].card, size) = read(buffer, position, size, 2);
        (position, state.locations[i].numberOfCards, size) = read(buffer, position, size, 2);
        (position, state.locations[i].spaceLeft, size) = read(buffer, position, size, 2);
        (position, state.locations[i].powerLeft, size) = read(buffer, position, size, 2);

        uint count;
        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].powers = new Power[](count);
        for (uint j = 0; j < count; j++) {
          (position, state.locations[i].powers[j].card, size) = read(buffer, position, size, 2);
          (position, state.locations[i].powers[j].count, size) = read(buffer, position, size, 1);
        }

        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].computerCases = new ComputerCase[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].computerCases[j].cpuCount, size) = read(buffer, position, size, 1);
          (position, state.locations[i].computerCases[j].gpuCount, size) = read(buffer, position, size, 1);
        }

        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].rigCases = new RigCase[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].rigCases[j].gpuCount, size) = read(buffer, position, size, 1);
        }

        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].mountCases = new MountCase[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].mountCases[j].asicCount, size) = read(buffer, position, size, 1);
        }

        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].developers = new Developer[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].developers[j].card, size) = read(buffer, position, size, 2);
          (position, state.locations[i].developers[j].count, size) = read(buffer, position, size, 1);
        }

        (position, count, size) = read(buffer, position, size, 1);
        state.locations[i].specialCards = new SpecialCard[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].specialCards[j].card, size) = read(buffer, position, size, 2);
          (position, state.locations[i].specialCards[j].effect, size) = read(buffer, position, size, 2);
        }
      }
    }

    for (i = 0; i < 10; i++) {
      (position, state.projects[i].card, size) = read(buffer, position, size, 2);
      (position, state.projects[i].timeLeft, size) = read(buffer, position, size, 2);
    }
  }

  function read(bytes buffer, uint position, uint size, uint nextSize) public pure returns (uint, uint, uint) {
    uint data;
    assembly {
      data := mload(add(buffer, mul(position, 32)))
    }

    uint returnData;

    if (size + nextSize >= 32) {
      uint secondData;
      position += 1;
      returnData = (data & (uint(2) << (((32 - size) * 8) - 1))) << ((size + nextSize - 32) * 8);
      if (size + nextSize != 32) {
        assembly {
          secondData := mload(add(buffer, mul(position, 32)))
        }
        returnData += (secondData & (uint(2) << ((size + nextSize - 32) * 8 - 1) * ((uint(2) << (8 * nextSize)) - 1))) / (uint(2) << ((size + nextSize - 32) * 8 - 1));
      }
      size = size + nextSize - 32;
    } else {
      returnData = (data & (uint(2) << ((32 - size - nextSize) * 8 - 1)) * ((uint(2) << (8 * nextSize - 1)) - 1)) / (uint(2) << ((32 - size - nextSize) * 8 - 1));
      size = size + nextSize;
    }

    return (position, returnData, size);
  }
}
