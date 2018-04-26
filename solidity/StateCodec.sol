pragma solidity ^0.4.20;

contract StateCodec {

  mapping(address => bytes) states;

  uint constant numberOfCards = 100;

  uint constant numberOfLocations = 6;
  uint constant numberOfProjects = 10;
  uint constant computerCaseMinersCount = 5;
  uint[5] computerCaseMiners = [uint(9), uint(10), uint(33), uint(34), uint(35)];
  uint constant rigCaseMinersCount = 4;
  uint[4] rigCaseMiners = [uint(10), uint(33), uint(34), uint(35)];
  uint constant rigCaseMinersCount = 4;

  uint constant fundsSize = 6;
  uint constant fundsPerBlockSize = 2;
  uint constant experienceSize = 4;
  uint constant developmentLeftSize = 2;
  uint constant blockNumberSize = 4;
  uint constant projectTimePercentageDecreaseSize = 1;
  uint constant miningPercentageBonusSize = 1;

  uint constant cardSize = 2;
  uint constant numberOfCardsSize = 2;
  uint constant spaceLeftSize = 2;
  uint constant powerLeftSize = 2;

  uint constant singleCountSize = 1;

  uint constant cpuCountSize = 1;
  uint constant classicGpuCountSize = 1;
  uint constant holographicGpuCountSize = 1;
  uint constant corporateGpuCountSize = 1;
  uint constant printerGpuCountSize = 1;

  uint constant asicCountSize = 1;

  uint constant doubleCountSize = 1;

  uint constant timeLeftSize = 2;

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
    // uint8
    uint projectTimePercentageDecrese;
    // uint8
    uint mingingPercentageBonus;
    Location[numberOfLocations] locations;
    Project[numberOfProjects] projects;
    uint[numberOfCards] currentCardsCount;
    uint[numberOfCards] maximumCardsCount;
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
    uint[computerCaseMinersCount] counts;
  }

  struct RigCase {
    // uint8
    uint[rigCaseMinersCount] counts;
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
    uint count;
  }

  struct Project {
    // uint16
    uint card;
    // uint16
    uint timeLeft;
  }

  event PrintB(bytes buffer);
  event Print(uint data, uint nextData);
  event PrintBo(bool boolean);

  function test() public pure returns (bool) {
    Location[6] memory locations;

    Power[] memory powers = new Power[](1);
    powers[0] = Power({
      card : 123,
      count : 1
      });
    ComputerCase[] memory computerCases;

    // uint[computerCaseMinersCount] memory counts;
    // counts[0] = 1;
    // counts[1] = 2;
    // counts[2] = 3;
    // counts[3] = 4;
    // counts[4] = 5;
    // computerCases[0] = ComputerCase({
    //     counts: counts
    // });

    // uint[rigCaseMinersCount] memory counts2;
    // counts2[0] = 1;
    // counts2[1] = 2;
    // counts2[2] = 3;
    // counts2[3] = 4;
    RigCase[] memory rigCases;
    // rigCases[0] = RigCase({
    //     counts: counts2
    // });
    MountCase[] memory mountCases = new MountCase[](1);
    mountCases[0] = MountCase({
      asicCount : 1
      });
    Developer[] memory developers = new Developer[](2);
    developers[0] = Developer({
      card : 21,
      count : 1
      });
    developers[1] = Developer({
      card : 21,
      count : 1
      });
    SpecialCard[] memory specialCards;
    locations[0] = Location({
      card : 123,
      numberOfCards : 123,
      spaceLeft : 123,
      powerLeft : 123,
      powers : powers,
      computerCases : computerCases,
      rigCases : rigCases,
      mountCases : mountCases,
      developers : developers,
      specialCards : specialCards
      });
    locations[1] = Location({
      card : 123,
      numberOfCards : 123,
      spaceLeft : 123,
      powerLeft : 123,
      powers : powers,
      computerCases : computerCases,
      rigCases : rigCases,
      mountCases : mountCases,
      developers : developers,
      specialCards : specialCards
      });
    locations[3] = Location({
      card : 123,
      numberOfCards : 123,
      spaceLeft : 123,
      powerLeft : 123,
      powers : powers,
      computerCases : computerCases,
      rigCases : rigCases,
      mountCases : mountCases,
      developers : developers,
      specialCards : specialCards
      });
    Project[10] memory projects;
    projects[0] = Project({
      card : 123,
      timeLeft : 1
      });
    projects[1] = Project({
      card : 123,
      timeLeft : 2
      });
    projects[2] = Project({
      card : 123,
      timeLeft : 3
      });
    projects[9] = Project({
      card : 123,
      timeLeft : 4
      });
    uint[numberOfCards] memory cardCount;
    State memory state = State({
      funds : 123,
      fundsPerBlock : 123,
      experience : 123,
      developmentLeft : 123,
      blockNumber : 123,
      projectTimePercentageDecrese : 0,
      mingingPercentageBonus : 0,
      locations : locations,
      projects : projects,
      currentCardsCount : cardCount,
      maximumCardsCount : cardCount
      });

    State memory newState = decode(encode(state));


    if (state.funds != newState.funds || state.fundsPerBlock != newState.fundsPerBlock ||
    state.experience != newState.experience || state.developmentLeft != newState.developmentLeft ||
    state.blockNumber != newState.blockNumber || state.projectTimePercentageDecrese != newState.projectTimePercentageDecrese ||
    state.mingingPercentageBonus != newState.mingingPercentageBonus) {
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
        for (uint k = 0; k < computerCaseMinersCount; k++) {
          if (state.locations[i].computerCases[j].counts[k] != newState.locations[i].computerCases[j].counts[k]) {
            return false;
          }
        }
      }

      for (j = 0; j < state.locations[i].rigCases.length; j++) {
        for (k = 0; k < rigCaseMinersCount; k++) {
          if (state.locations[i].rigCases[j].counts[k] != newState.locations[i].rigCases[j].counts[k]) {
            return false;
          }
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
        state.locations[i].specialCards[j].count != newState.locations[i].specialCards[j].count) {
          return false;
        }
      }

    }

    for (i = 0; i < 10; i++) {
      if (state.projects[i].card != newState.projects[i].card ||
      state.projects[i].timeLeft != newState.projects[i].timeLeft) {
        return false;
      }
    }

    return true;
  }

  function encode(State state) internal pure returns (bytes) {
    uint capacity = 60;
    uint position = 1;
    uint size = 20;
    uint[6] memory locationCount;

    for (uint i = 0; i < 6; i++) {
      if (state.locations[i].card != 0) {
        locationCount[i] = 14 + 3 * state.locations[i].powers.length +
        6 * state.locations[i].computerCases.length +
        7 * state.locations[i].rigCases.length +
        state.locations[i].mountCases.length +
        3 * state.locations[i].developers.length +
        4 * state.locations[i].specialCards.length;
      }
      capacity += 1 + locationCount[i];
    }

    bytes memory buffer = new bytes(capacity);

    uint data = (2 << 207) * state.funds +
    (2 << 191) * state.fundsPerBlock +
    (2 << 159) * state.experience +
    (2 << 143) * state.developmentLeft +
    (2 << 111) * state.blockNumber +
    (2 << 103) * state.projectTimePercentageDecrese;
    data += (2 << 95) * state.mingingPercentageBonus;

    for (i = 0; i < 6; i++) {
      (position, data, size) = append(buffer, position, data, locationCount[i], size, singleCountSize);
      if (state.locations[i].card != 0) {
        (position, data, size) = append(buffer, position, data, state.locations[i].card, size, cardSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].numberOfCards, size, numberOfCardsSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].spaceLeft, size, spaceLeftSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].powerLeft, size, powerLeftSize);

        (position, data, size) = append(buffer, position, data, state.locations[i].powers.length, size, singleCountSize);
        for (uint j = 0; j < state.locations[i].powers.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].card, size, cardSize);
          (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].count, size, singleCountSize);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].computerCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].computerCases.length; j++) {
          for (uint k = 0; k < computerCaseMinersCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].computerCases[j].counts[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].rigCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].rigCases.length; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].rigCases[j].counts[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].mountCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].mountCases.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].mountCases[j].asicCount, size, asicCountSize);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].developers.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].developers.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].card, size, cardSize);
          (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].count, size, singleCountSize);
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].specialCards.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].specialCards.length; j++) {
          (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].card, size, cardSize);
          (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].count, size, doubleCountSize);
        }
      }
    }

    for (i = 0; i < state.projects.length; i++) {
      (position, data, size) = append(buffer, position, data, state.projects[i].card, size, 2);
      (position, data, size) = append(buffer, position, data, state.projects[i].timeLeft, size, 2);
    }

    assembly {mstore(add(buffer, mul(position, 32)), data)}

    return buffer;
  }

  function append(bytes buffer, uint position, uint data, uint nextData, uint size, uint nextSize) public pure returns (uint, uint, uint) {
    if (size + nextSize >= 32) {
      data += (nextData >> ((size + nextSize - 32) * 8));
      assembly {mstore(add(buffer, mul(position, 32)), data)}
      size = (size + nextSize - 32);
      if (size != 0) {
        data = (nextData & ((uint(2) << (size * 8 - 1)) - 1)) << ((32 - size) * 8);
      } else {
        data = 0;
      }
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
    uint[numberOfCards] memory cardsCount;

    state = State({
      funds : 0,
      fundsPerBlock : 0,
      experience : 0,
      developmentLeft : 0,
      blockNumber : 0,
      projectTimePercentageDecrese : 0,
      mingingPercentageBonus : 0,
      locations : locations,
      projects : projects,
      currentCardsCount : cardsCount,
      maximumCardsCount : cardsCount
      });

    (position, state.funds, size) = read(buffer, position, size, fundsSize);
    (position, state.fundsPerBlock, size) = read(buffer, position, size, fundsPerBlockSize);
    (position, state.experience, size) = read(buffer, position, size, experienceSize);
    (position, state.developmentLeft, size) = read(buffer, position, size, developmentLeftSize);
    (position, state.blockNumber, size) = read(buffer, position, size, blockNumberSize);
    (position, state.projectTimePercentageDecrese, size) = read(buffer, position, size, projectTimePercentageDecreaseSize);
    (position, state.mingingPercentageBonus, size) = read(buffer, position, size, miningPercentageBonusSize);
    for (uint i = 0; i < 6; i++) {
      uint locationCount;
      (position, locationCount, size) = read(buffer, position, size, singleCountSize);
      if (locationCount != 0) {
        (position, state.locations[i].card, size) = read(buffer, position, size, cardSize);
        (position, state.locations[i].numberOfCards, size) = read(buffer, position, size, numberOfCardsSize);
        (position, state.locations[i].spaceLeft, size) = read(buffer, position, size, spaceLeftSize);
        (position, state.locations[i].powerLeft, size) = read(buffer, position, size, powerLeftSize);

        uint count;
        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].powers = new Power[](count);
        for (uint j = 0; j < count; j++) {
          (position, state.locations[i].powers[j].card, size) = read(buffer, position, size, cardSize);
          (position, state.locations[i].powers[j].count, size) = read(buffer, position, size, singleCountSize);
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].computerCases = new ComputerCase[](count);
        for (j = 0; j < count; j++) {
          for (uint k = 0; k < computerCaseMinersCount; k++) {
            (position, state.locations[i].computerCases[j].counts[k], size) = read(buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].rigCases = new RigCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            (position, state.locations[i].rigCases[j].counts[k], size) = read(buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].mountCases = new MountCase[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].mountCases[j].asicCount, size) = read(buffer, position, size, asicCountSize);
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].developers = new Developer[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].developers[j].card, size) = read(buffer, position, size, cardSize);
          (position, state.locations[i].developers[j].count, size) = read(buffer, position, size, singleCountSize);
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].specialCards = new SpecialCard[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].specialCards[j].card, size) = read(buffer, position, size, cardSize);
          (position, state.locations[i].specialCards[j].count, size) = read(buffer, position, size, doubleCountSize);
        }
      }
    }

    for (i = 0; i < 10; i++) {
      (position, state.projects[i].card, size) = read(buffer, position, size, cardSize);
      (position, state.projects[i].timeLeft, size) = read(buffer, position, size, timeLeftSize);
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
      returnData = (data & ((uint(2) << ((32 - size) * 8 - 1)) - 1)) << ((size + nextSize - 32) * 8);
      if (size + nextSize != 32) {
        assembly {
          secondData := mload(add(buffer, mul(position, 32)))
        }
        returnData += (secondData & ((uint(2) << ((64 - size - nextSize) * 8 - 1)) * ((uint(2) << ((size + nextSize - 32) * 8 - 1)) - 1))) / (uint(2) << ((64 - size - nextSize) * 8 - 1));
      }
      size = size + nextSize - 32;
    } else {
      returnData = (data & (uint(2) << ((32 - size - nextSize) * 8 - 1)) * ((uint(2) << (8 * nextSize - 1)) - 1)) / (uint(2) << ((32 - size - nextSize) * 8 - 1));
      size = size + nextSize;
    }

    return (position, returnData, size);
  }
}