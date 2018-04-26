pragma solidity ^0.4.20;

contract StateCodec {

  mapping(address => bytes) states;

  uint constant numberOfCards = 100;

  uint constant numberOfLocations = 6;
  uint constant numberOfProjects = 10;
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
    uint[powerLevelCount] card;
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
    uint[developerLevelCount] card;
    // uint8
    uint[developerLevelCount] count;
  }

  struct SpecialCard {
    // uint16
    uint[specialLevelCount] card;
    // uint16
    uint[specialLevelCount] count;
  }

  struct Project {
    // uint16
    uint card;
    // uint8
    uint level;
    // uint16
    uint timeLeft;
  }

  //   event PrintB(bytes buffer);
  //   event Print1(uint nextData);
  //   event Print2(uint data, uint nextData);
  //   event Print(uint data, uint nextData);
  //   event PrintBo(bool boolean);
  //   event Printa(uint[] arr);
  //   function test(uint[] array) public returns (uint[] memory newArray) {
  //     uint i = 6;
  //     Location[6] memory locations;
  //     for (uint j = 0; j < 6; j++) {
  //         if (array[++i] > 0) {
  //             locations[j].exists = 1;
  //             locations[j].card = array[++i];
  //             locations[j].numberOfCards = array[++i];
  //             locations[j].spaceLeft = array[++i];
  //             locations[j].powerLeft = array[++i];

  //             Power[] memory powers = new Power[](array[++i]);
  //             for (uint k = 0; k < array[i]; k++) {
  //                 powers[k] = Power({
  //                     card: [uint(1),2,3,4,5],
  //                     count: [uint(1),2,3,4,5]
  //                 });
  //                 for (uint t = 0; t < 5; t++) {
  //                     i = i + 2;
  //                     // powers[k].card[t] = array[++i];
  //                     // powers[k].count[t] = array[++i];
  //                 }
  //             }
  //             // locations[j].powers = powers;

  //             // ComputerCase[] memory computerCases = new ComputerCase[](array[++i]);
  //             for (k = 0; k < array[++i]; k++) {
  //                 // computerCases[k] = ComputerCase({
  //                 //     count: [uint(1),2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
  //                 // });
  //                 for (t = 0; t < 5; t++) {
  //                     for (uint v = 0; v < 5; v++) {
  //                         // locations[j].computerCases[k].count[t * 5 + v] = array[++i];
  //                     }
  //                 }
  //             }

  //             // locations[j].computerCases = computerCases;

  //             for (k = 0; k < array[++i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     for (v = 0; v < 5; v++) {
  //                         locations[j].rigCases[k].count[t * 5 + v] = array[++i];
  //                     }
  //                 }
  //             }

  //             for (k = 0; k < array[++i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     locations[j].mountCases[k].asicCount[t] = array[++i];
  //                     locations[j].mountCases[k].asicCount[t] = array[++i];
  //                 }
  //             }

  //             for (k = 0; k < array[++i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     locations[j].developers[k].card[t] = array[++i];
  //                     locations[j].developers[k].count[t] = array[++i];
  //                 }
  //             }

  //             for (k = 0; k < array[++i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     locations[j].specialCards[k].card[t] = array[++i];
  //                     locations[j].specialCards[k].count[t] = array[++i];
  //                 }
  //             }
  //         }
  //     }
  //     // Print1(locations[0].card);

  //     Project[10] memory projects;
  //     // for (j = 0; j < 10; j++) {
  //     //     // emit Print1(2);
  //     //     for (k = 0; k < 3; k++) {
  //     //         projects[j].card = array[i + j * 3 + k];
  //     //         projects[j].level = array[i + j * 3 + k];
  //     //         projects[j].timeLeft = array[i + j * 3 + k];
  //     //     }
  //     // }

  //     uint[100] memory cardsCount;
  //     State memory state = State({
  //       funds : array[0],
  //       fundsPerBlock : array[1],
  //       experience : array[2],
  //       developmentLeft : array[3],
  //       blockNumber : array[4],
  //       projectTimePercentageDecrese : array[5],
  //       mingingPercentageBonus : array[6],
  //       locations : locations,
  //       projects : projects,
  //       currentCardsCount: cardsCount,
  //       maximumCardsCount: cardsCount
  //       });
  //     bytes memory encoded = encode(state);
  //     emit PrintB(encoded);
  //     State memory newState = decode(encoded);
  //     // emit Print1(state.funds);

  //     newArray = new uint[](array.length);
  //     newArray[0] = state.funds;
  //     newArray[1] = state.fundsPerBlock;
  //     newArray[2] = state.experience;
  //     newArray[3] = state.developmentLeft;
  //     newArray[4] = state.blockNumber;
  //     newArray[5] = state.projectTimePercentageDecrese;
  //     newArray[6] = state.mingingPercentageBonus;

  //     i = 6;
  //     for (j = 0; j < 6; j++) {
  //         newArray[++i] = state.locations[j].exists;
  //         if (state.locations[j].exists != 0) {
  //             newArray[++i] = state.locations[j].card;
  //             newArray[++i] = state.locations[j].numberOfCards;
  //             newArray[++i] = state.locations[j].spaceLeft;
  //             newArray[++i] = state.locations[j].powerLeft;
  //             newArray[++i] = state.locations[j].powers.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     newArray[++i] = state.locations[j].powers[k].card[t];
  //                     newArray[++i] = state.locations[j].powers[k].count[t];
  //                 }
  //             }
  //             newArray[++i] = state.locations[j].computerCases.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 25; t++) {
  //                     newArray[++i] = state.locations[j].computerCases[k].count[t];
  //                 }
  //             }
  //             newArray[++i] = state.locations[j].rigCases.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 20; t++) {
  //                     newArray[++i] = state.locations[j].rigCases[k].count[t];
  //                 }
  //             }
  //             newArray[++i] = state.locations[j].mountCases.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     newArray[++i] = state.locations[j].mountCases[k].asicCount[t];
  //                 }
  //             }
  //             newArray[++i] = state.locations[j].developers.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     newArray[++i] = state.locations[j].developers[k].card[t];
  //                     newArray[++i] = state.locations[j].developers[k].count[t];
  //                 }
  //             }
  //             newArray[++i] = state.locations[j].specialCards.length;
  //             for (k = 0; k < newArray[i]; k++) {
  //                 for (t = 0; t < 5; t++) {
  //                     newArray[++i] = state.locations[j].specialCards[k].card[t];
  //                     newArray[++i] = state.locations[j].specialCards[k].count[t];
  //                 }
  //             }
  //         }
  //     }

  //     for (j = 0; j < 10; j++) {
  //         newArray[++i] = state.projects[j].card;
  //         newArray[++i] = state.projects[j].level;
  //         newArray[++i] = state.projects[j].timeLeft;
  //     }
  //     Printa(newArray);

  //   }

  function encode(State state) internal pure returns (bytes) {
    uint capacity = 20 + 50;
    uint position = 1;
    uint size = 20;
    uint[6] memory locationCount;

    for (uint i = 0; i < 6; i++) {
      if (state.locations[i].exists != 0) {
        locationCount[i] = 14 + 15 * state.locations[i].powers.length;
        25 * state.locations[i].computerCases.length +
        20 * state.locations[i].rigCases.length;

        locationCount[i] += state.locations[i].mountCases.length +
        15 * state.locations[i].developers.length +
        15 * state.locations[i].specialCards.length;
      }
      capacity += 1 + locationCount[i];
    }

    bytes memory buffer = new bytes(capacity);

    uint data = (2 << 207) * state.funds +
    (2 << 191) * state.fundsPerBlock +
    (2 << 159) * state.experience;
    data += (2 << 143) * state.developmentLeft +
    (2 << 111) * state.blockNumber +
    (2 << 103) * state.projectTimePercentageDecrese +
    (2 << 95) * state.mingingPercentageBonus;

    for (i = 0; i < 6; i++) {
      (position, data, size) = append(buffer, position, data, locationCount[i], size, singleCountSize);
      if (state.locations[i].exists != 0) {
        (position, data, size) = append(buffer, position, data, state.locations[i].card, size, cardSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].numberOfCards, size, numberOfCardsSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].spaceLeft, size, spaceLeftSize);
        (position, data, size) = append(buffer, position, data, state.locations[i].powerLeft, size, powerLeftSize);

        (position, data, size) = append(buffer, position, data, state.locations[i].powers.length, size, singleCountSize);
        for (uint j = 0; j < state.locations[i].powers.length; j++) {
          for (uint k = 0; k < powerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].card[k], size, cardSize);
            (position, data, size) = append(buffer, position, data, state.locations[i].powers[j].count[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].computerCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].computerCases.length; j++) {
          for (k = 0; k < computerCaseMinersCount; k++) {
            for (uint t = 0; t < computerCaseMinersLevelCount; t++) {
              (position, data, size) = append(buffer, position, data, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size, singleCountSize);
            }
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].rigCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].rigCases.length; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            for (t = 0; t < rigCaseMinersLevelCount; t++) {
              (position, data, size) = append(buffer, position, data, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size, singleCountSize);
            }
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].mountCases.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].mountCases.length; j++) {
          for (k = 0; k < developerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].mountCases[j].asicCount[k], size, asicCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].developers.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].developers.length; j++) {
          for (k = 0; k < developerLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].card[k], size, cardSize);
            (position, data, size) = append(buffer, position, data, state.locations[i].developers[j].count[k], size, singleCountSize);
          }
        }

        (position, data, size) = append(buffer, position, data, state.locations[i].specialCards.length, size, singleCountSize);
        for (j = 0; j < state.locations[i].specialCards.length; j++) {
          for (k = 0; k < specialLevelCount; k++) {
            (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].card[k], size, cardSize);
            (position, data, size) = append(buffer, position, data, state.locations[i].specialCards[j].count[k], size, doubleCountSize);
          }
        }
      }
    }

    for (i = 0; i < state.projects.length; i++) {
      (position, data, size) = append(buffer, position, data, state.projects[i].card, size, cardSize);
      (position, data, size) = append(buffer, position, data, state.projects[i].level, size, levelSize);
      (position, data, size) = append(buffer, position, data, state.projects[i].timeLeft, size, timeLeftSize);
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
      funds : 150,
      fundsPerBlock : 0,
      experience : 0,
      developmentLeft : 0,
      blockNumber : block.number - 50000,
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
        state.locations[i].exists = 1;
        (position, state.locations[i].card, size) = read(buffer, position, size, cardSize);
        (position, state.locations[i].numberOfCards, size) = read(buffer, position, size, numberOfCardsSize);
        (position, state.locations[i].spaceLeft, size) = read(buffer, position, size, spaceLeftSize);
        (position, state.locations[i].powerLeft, size) = read(buffer, position, size, powerLeftSize);

        uint count;
        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].powers = new Power[](count);
        for (uint j = 0; j < count; j++) {
          for (uint k = 0; k < powerLevelCount; k++) {
            (position, state.locations[i].powers[j].card[k], size) = read(buffer, position, size, cardSize);
            (position, state.locations[i].powers[j].count[k], size) = read(buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].computerCases = new ComputerCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < computerCaseMinersCount; k++) {
            for (uint t = 0; t < computerCaseMinersLevelCount; t++) {
              (position, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size) = read(buffer, position, size, singleCountSize);
            }
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].rigCases = new RigCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < rigCaseMinersCount; k++) {
            for (t = 0; t < rigCaseMinersLevelCount; t++) {
              (position, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size) = read(buffer, position, size, singleCountSize);
            }
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].mountCases = new MountCase[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < asicLevelCount; k++) {
            (position, state.locations[i].mountCases[j].asicCount[k], size) = read(buffer, position, size, asicCountSize);
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].developers = new Developer[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < developerLevelCount; k++) {
            (position, state.locations[i].developers[j].card[k], size) = read(buffer, position, size, cardSize);
            (position, state.locations[i].developers[j].count[k], size) = read(buffer, position, size, singleCountSize);
          }
        }

        (position, count, size) = read(buffer, position, size, singleCountSize);
        state.locations[i].specialCards = new SpecialCard[](count);
        for (j = 0; j < count; j++) {
          for (k = 0; k < specialLevelCount; k++) {
            (position, state.locations[i].specialCards[j].card[k], size) = read(buffer, position, size, cardSize);
            (position, state.locations[i].specialCards[j].count[k], size) = read(buffer, position, size, doubleCountSize);
          }
        }
      }
    }

    for (i = 0; i < 10; i++) {
      (position, state.projects[i].card, size) = read(buffer, position, size, cardSize);
      (position, state.projects[i].level, size) = read(buffer, position, size, levelSize);
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
