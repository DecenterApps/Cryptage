pragma solidity ^0.4.22;

contract StateCodec {
  uint constant numberOfLocations = 6;
  uint constant numberOfProjects = 10;
  uint constant numberOfCards = 100;
  uint constant computerCaseMinersCount = 5;
  uint constant rigCaseMinersCount = 4;

  uint constant powerLevelCount = 5;
  uint constant computerCaseMinersLevelCount = 5;
  uint constant rigCaseMinersLevelCount = 5;
  uint constant asicLevelCount = 5;
  uint constant developerLevelCount = 5;
  uint constant specialLevelCount = 5;
  uint constant projectLevelCount = 5;

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

  uint constant levelSize = 1;

  uint[5] computerCaseMiners = [uint(9), uint(10), uint(33), uint(34), uint(35)];
  uint[4] rigCaseMiners = [uint(10), uint(33), uint(34), uint(35)];

  struct State {
    // uint8
    uint exists;
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
    uint projectTimePercentageDecrease;
    // uint8
    uint miningPercentageBonus;
    Location[numberOfLocations] locations;
    Project[numberOfProjects] projects;
    uint[numberOfCards] currentCardsCount;
    uint[numberOfCards] maximumCardsCount;
  }

  struct Location {
    // uint8
    uint exists;
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
    uint[powerLevelCount] count;
  }

  struct ComputerCase {
    // uint8
    uint[computerCaseMinersCount * computerCaseMinersLevelCount] count;
  }

  struct RigCase {
    // uint8
    uint[rigCaseMinersCount * rigCaseMinersLevelCount] count;
  }

  struct MountCase {
    // uint8
    uint[asicLevelCount] asicCount;
  }

  struct Developer {
    // uint16
    uint card;
    // uint8
    uint[developerLevelCount] count;
  }

  struct SpecialCard {
    // uint16
    uint card;
    // uint16
    uint[specialLevelCount] count;
  }

  struct Project {
    // uint8
    uint exists;
    // uint16
    uint card;
    // uint8
    uint level;
    // uint16
    uint timeLeft;
  }

  function encode(State _state) internal pure returns (bytes) {
    uint capacity = 21 + 60;
    uint position = 1;
    uint size = 21;
    uint[6] memory locationCount;

    for (uint i = 0; i < 6; i++) {
      if (_state.locations[i].exists != 0) {
        locationCount[i] = 14 + 7 * _state.locations[i].powers.length;
        25 * _state.locations[i].computerCases.length +
        20 * _state.locations[i].rigCases.length;

        locationCount[i] += _state.locations[i].mountCases.length +
        7 * _state.locations[i].developers.length +
        7 * _state.locations[i].specialCards.length;
      }
      capacity += 1 + locationCount[i];
    }

    bytes memory buffer = new bytes(capacity);

    uint data =
    (2 << 247) * _state.exists +
    (2 << 199) * _state.funds +
    (2 << 183) * _state.fundsPerBlock +
    (2 << 151) * _state.experience;
    data += (2 << 135) * _state.developmentLeft +
    (2 << 103) * _state.blockNumber +
    (2 << 95) * _state.projectTimePercentageDecrease +
    (2 << 87) * _state.miningPercentageBonus;

    for (i = 0; i < 6; i++) {
      (position, data, size) = append(buffer, position, data, locationCount[i], size, singleCountSize);
      if (_state.locations[i].exists != 0) {
        (position, data, size) = append(buffer, position, data, _state.locations[i].card, size, cardSize);
        (position, data, size) = append(buffer, position, data, _state.locations[i].numberOfCards, size, numberOfCardsSize);
        (position, data, size) = append(buffer, position, data, _state.locations[i].spaceLeft, size, spaceLeftSize);
        (position, data, size) = append(buffer, position, data, _state.locations[i].powerLeft, size, powerLeftSize);

        (position, data, size) = append(buffer, position, data, _state.locations[i].powers.length, size, singleCountSize);
        for (uint j = 0; j < _state.locations[i].powers.length; j++) {
          (position, data, size) = append(buffer, position, data, _state.locations[i].powers[j].card, size, cardSize);
          for (uint k = 0; k < powerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, _state.locations[i].powers[j].count[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, _state.locations[i].computerCases.length, size, singleCountSize);
        for (j = 0; j < _state.locations[i].computerCases.length; j++) {
          for (k = 0; k < computerCaseMinersCount; k++) {
            for (uint t = 0; t < computerCaseMinersLevelCount; t++) {
              (position, data, size) = append(buffer, position, data, _state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size, singleCountSize);
            }
          }
        }

        (position, data, size) = append(buffer, position, data, _state.locations[i].rigCases.length, size, singleCountSize);
        for (j = 0; j < _state.locations[i].rigCases.length; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            for (t = 0; t < rigCaseMinersLevelCount; t++) {
              (position, data, size) = append(buffer, position, data, _state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size, singleCountSize);
            }
          }
        }

        (position, data, size) = append(buffer, position, data, _state.locations[i].mountCases.length, size, singleCountSize);
        for (j = 0; j < _state.locations[i].mountCases.length; j++) {
          for (k = 0; k < developerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, _state.locations[i].mountCases[j].asicCount[k], size, asicCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, _state.locations[i].developers.length, size, singleCountSize);
        for (j = 0; j < _state.locations[i].developers.length; j++) {
          (position, data, size) = append(buffer, position, data, _state.locations[i].developers[j].card, size, cardSize);
          for (k = 0; k < developerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, _state.locations[i].developers[j].count[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, _state.locations[i].specialCards.length, size, singleCountSize);
        for (j = 0; j < _state.locations[i].specialCards.length; j++) {
          (position, data, size) = append(buffer, position, data, _state.locations[i].specialCards[j].card, size, cardSize);
          for (k = 0; k < specialLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, _state.locations[i].specialCards[j].count[k], size, doubleCountSize);
          }
        }
      }
    }

    for (i = 0; i < _state.projects.length; i++) {
      (position, data, size) = append(buffer, position, data, _state.projects[i].exists, size, singleCountSize);
      (position, data, size) = append(buffer, position, data, _state.projects[i].card, size, cardSize);
      (position, data, size) = append(buffer, position, data, _state.projects[i].level, size, levelSize);
      (position, data, size) = append(buffer, position, data, _state.projects[i].timeLeft, size, timeLeftSize);
    }

    assembly {mstore(add(buffer, mul(position, 32)), data)}

    return buffer;
  }

  function append(bytes _buffer, uint _position, uint _data, uint _nextData, uint _size, uint _nextSize) internal pure returns (uint, uint, uint) {
    if (_size + _nextSize >= 32) {
      _data += (_nextData >> ((_size + _nextSize - 32) * 8));
      assembly {mstore(add(_buffer, mul(_position, 32)), _data)}
      _size = (_size + _nextSize - 32);
      if (_size != 0) {
        _data = (_nextData & ((uint(2) << (_size * 8 - 1)) - 1)) << ((32 - _size) * 8);
      } else {
        _data = 0;
      }
      _position += 1;
    } else {
      _size = _size + _nextSize;
      _data += _nextData * (uint(2) << ((32 - _size) * 8 - 1));
    }

    return (_position, _data, _size);
  }

  function decode(bytes _buffer) internal view returns (State memory state) {
    uint position = 1;
    uint size = 0;

    Location[6] memory locations;
    Project[10] memory projects;
    uint[numberOfCards] memory cardsCount;

    state = State({
      exists: 0,
      funds : 150,
      fundsPerBlock : 0,
      experience : 0,
      developmentLeft : 0,
      blockNumber : block.number - 50000,
      projectTimePercentageDecrease : 0,
      miningPercentageBonus : 0,
      locations : locations,
      projects : projects,
      currentCardsCount : cardsCount,
      maximumCardsCount : cardsCount
      });

    (position, state.exists, size) = read(_buffer, position, size, singleCountSize);
    (position, state.funds, size) = read(_buffer, position, size, fundsSize);
    (position, state.fundsPerBlock, size) = read(_buffer, position, size, fundsPerBlockSize);
    (position, state.experience, size) = read(_buffer, position, size, experienceSize);
    (position, state.developmentLeft, size) = read(_buffer, position, size, developmentLeftSize);
    (position, state.blockNumber, size) = read(_buffer, position, size, blockNumberSize);
    (position, state.projectTimePercentageDecrease, size) = read(_buffer, position, size, projectTimePercentageDecreaseSize);
    (position, state.miningPercentageBonus, size) = read(_buffer, position, size, miningPercentageBonusSize);
    for (uint i = 0; i < 6; i++) {
      uint locationCount;
      (position, locationCount, size) = read(_buffer, position, size, singleCountSize);
      if (locationCount != 0) {
        state.locations[i].exists = 1;
        (position, state.locations[i].card, size) = read(_buffer, position, size, cardSize);
        (position, state.locations[i].numberOfCards, size) = read(_buffer, position, size, numberOfCardsSize);
        (position, state.locations[i].spaceLeft, size) = read(_buffer, position, size, spaceLeftSize);
        (position, state.locations[i].powerLeft, size) = read(_buffer, position, size, powerLeftSize);

        uint count;
        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].powers = new Power[](count);
        for (uint j = 0; j < count; j++) {
          (position, state.locations[i].powers[j].card, size) = read(_buffer, position, size, cardSize);
          for (uint k = 0; k < powerLevelCount; k++) {
            (position, state.locations[i].powers[j].count[k], size) = read(_buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].computerCases = new ComputerCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < computerCaseMinersCount; k++) {
            for (uint t = 0; t < computerCaseMinersLevelCount; t++) {
              (position, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size) = read(_buffer, position, size, singleCountSize);
            }
          }
        }

        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].rigCases = new RigCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            for (t = 0; t < rigCaseMinersLevelCount; t++) {
              (position, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size) = read(_buffer, position, size, singleCountSize);
            }
          }
        }

        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].mountCases = new MountCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < asicLevelCount; k++) {
            (position, state.locations[i].mountCases[j].asicCount[k], size) = read(_buffer, position, size, asicCountSize);
          }
        }

        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].developers = new Developer[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].developers[j].card, size) = read(_buffer, position, size, cardSize);
          for (k = 0; k < developerLevelCount; k++) {
            (position, state.locations[i].developers[j].count[k], size) = read(_buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(_buffer, position, size, singleCountSize);
        state.locations[i].specialCards = new SpecialCard[](count);
        for (j = 0; j < count; j++) {
          (position, state.locations[i].specialCards[j].card, size) = read(_buffer, position, size, cardSize);
          for (k = 0; k < specialLevelCount; k++) {
            (position, state.locations[i].specialCards[j].count[k], size) = read(_buffer, position, size, doubleCountSize);
          }
        }
      }
    }

    for (i = 0; i < 10; i++) {
      (position, state.projects[i].exists, size) = read(_buffer, position, size, singleCountSize);
      (position, state.projects[i].card, size) = read(_buffer, position, size, cardSize);
      (position, state.projects[i].level, size) = read(_buffer, position, size, levelSize);
      (position, state.projects[i].timeLeft, size) = read(_buffer, position, size, timeLeftSize);
    }
  }

  function read(bytes _buffer, uint _position, uint _size, uint _nextSize) internal pure returns (uint, uint, uint) {
    uint data;
    assembly {
      data := mload(add(_buffer, mul(_position, 32)))
    }

    uint returnData;

    if (_size + _nextSize >= 32) {
      _position += 1;
      returnData = (data & ((uint(2) << ((32 - _size) * 8 - 1)) - 1)) << ((_size + _nextSize - 32) * 8);
      if (_size + _nextSize != 32) {
        uint secondData;
        assembly { secondData := mload(add(_buffer, mul(_position, 32))) }
        returnData += (secondData & ((uint(2) << ((64 - _size - _nextSize) * 8 - 1)) * ((uint(2) << ((_size + _nextSize - 32) * 8 - 1)) - 1))) / (uint(2) << ((64 - _size - _nextSize) * 8 - 1));
      }
      _size = _size + _nextSize - 32;
    } else {
      returnData = (data & (uint(2) << ((32 - _size - _nextSize) * 8 - 1)) * ((uint(2) << (8 * _nextSize - 1)) - 1)) / (uint(2) << ((32 - _size - _nextSize) * 8 - 1));
      _size = _size + _nextSize;
    }

    return (_position, returnData, _size);
  }
}
