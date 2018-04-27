pragma solidity ^0.4.20;

import "./StateCodec.sol";

contract StateCodecTest is StateCodec {
  function buildPower(uint[] _array, uint i) internal pure returns (Power[] memory powers, uint) {
    powers = new Power[](_array[++i]);
    for (uint k = 0; k < powers.length; k++) {
      powers[k] = Power({
        card: uint(4),
        count: [uint(1),2,3,4,5]
        });
      powers[k].card = _array[++i];
      for (uint t = 0; t < 5; t++) {
        powers[k].count[t] = _array[++i];
      }
    }

    return (powers, i);
  }

  function buildComputerCase(uint[] _array, uint i) internal pure returns (ComputerCase[] memory computerCases, uint) {
    computerCases = new ComputerCase[](_array[++i]);
    for (uint k = 0; k < computerCases.length; k++) {
      computerCases[k] = ComputerCase({
        count: [uint(1),2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]
        });
      for (uint t = 0; t < 5; t++) {
        for (uint v = 0; v < 5; v++) {
          computerCases[k].count[t * 5 + v] = _array[++i];
        }
      }
    }

    return (computerCases, i);
  }

  function buildRigCases(uint[] _array, uint i) internal pure returns(RigCase[] memory rigCases, uint) {
    rigCases = new RigCase[](_array[++i]);
    for (uint k = 0; k < rigCases.length; k++) {
      rigCases[k] = RigCase({
        count: [uint(1),2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
        });
      for (uint t = 0; t < 5; t++) {
        for (uint v = 0; v < 5; v++) {
          rigCases[k].count[t * 5 + v] = _array[++i];
        }
      }
    }
    return(rigCases, i);
  }

  function buildMountCases(uint[] _array, uint i) internal pure returns (MountCase[] memory mountCases, uint) {
    mountCases = new MountCase[](_array[++i]);
    for (uint k = 0; k < mountCases.length; k++) {
      mountCases[k] = MountCase({
        asicCount: [uint(1),2,3,4,5]
        });
      for (uint t = 0; t < 5; t++) {
        mountCases[k].asicCount[t] = _array[++i];
      }
    }
    return(mountCases, i);
  }

  function buildDevelopers(uint[] _array, uint i) internal pure returns (Developer[] memory developers, uint) {
    developers = new Developer[](_array[++i]);
    for (uint k = 0; k < developers.length; k++) {
      developers[k] = Developer({
        card: uint(4),
        count: [uint(1),2,3,4,5]
        });
      developers[k].card = _array[++i];
      for (uint t = 0; t < 5; t++) {
        developers[k].count[t] = _array[++i];
      }
    }
    return(developers, i);
  }

  function buildSpecificCard(uint[] _array, uint i) internal pure returns (SpecialCard[] memory specialCards, uint) {
    specialCards = new SpecialCard[](_array[++i]);
    for (uint k = 0; k < specialCards.length; k++) {
      specialCards[k] = SpecialCard({
        card: uint(4),
        count: [uint(1),2,3,4,5]
        });
      specialCards[k].card = _array[++i];
      for (uint t = 0; t < 5; t++) {
        specialCards[k].count[t] = _array[++i];
      }
    }
    return(specialCards, i);
  }

  function buildLocation(uint[] _array, uint i) internal pure returns(Location memory location, uint) {
    location.exists = 1;
    location.card = _array[++i];
    location.numberOfCards = _array[++i];
    location.spaceLeft = _array[++i];
    location.powerLeft = _array[++i];

    (location.powers, i) = buildPower(_array, i);
    (location.computerCases, i) = buildComputerCase(_array, i);
    (location.rigCases, i) = buildRigCases(_array, i);
    (location.mountCases, i) = buildMountCases(_array, i);
    (location.developers, i) = buildDevelopers(_array, i);
    (location.specialCards, i) = buildSpecificCard(_array, i);

    return(location, i);
  }

  function buildState(uint[] _array, Location[6] _locations, Project[10] _projects) internal pure returns (State memory state) {
    uint[100] memory cardsCount;
    state = State({
      funds : _array[0],
      fundsPerBlock : _array[1],
      experience : _array[2],
      developmentLeft : _array[3],
      blockNumber : _array[4],
      projectTimePercentageDecrese : _array[5],
      mingingPercentageBonus : _array[6],
      locations : _locations,
      projects : _projects,
      currentCardsCount: cardsCount,
      maximumCardsCount: cardsCount
      });
  }

  event PrintB(bytes buffer);
  event Print1(uint nextData);
  event Print2(uint data, uint nextData);
  event Print(uint data, uint nextData);
  event PrintBo(bool boolean);
  event Printa(uint[] arr);
  function test(uint[] array) public view returns (uint[] memory newArray) {
    uint i = 6;
    Location[6] memory locations;
    for (uint j = 0; j < 6; j++) {
      if (array[++i] > 0) {
        (locations[j], i) = buildLocation(array, i);
      }
    }

    Project[10] memory projects;
    for (j = 0; j < 10; j++) {
      projects[j].card = array[++i];
      projects[j].level = array[++i];
      projects[j].timeLeft = array[++i];
    }

    State memory state = buildState(array, locations, projects);
    State memory newState = decode(encode(state));

    newArray = new uint[](array.length);
    newArray[0] = newState.funds;
    newArray[1] = newState.fundsPerBlock;
    newArray[2] = newState.experience;
    newArray[3] = newState.developmentLeft;
    newArray[4] = newState.blockNumber;
    newArray[5] = newState.projectTimePercentageDecrese;
    newArray[6] = newState.mingingPercentageBonus;

    i = 6;
    for (j = 0; j < 6; j++) {
      newArray[++i] = newState.locations[j].exists;
      if (newState.locations[j].exists != 0) {
        newArray[++i] = newState.locations[j].card;
        newArray[++i] = newState.locations[j].numberOfCards;
        newArray[++i] = newState.locations[j].spaceLeft;
        newArray[++i] = newState.locations[j].powerLeft;
        newArray[++i] = newState.locations[j].powers.length;
        for (uint k = 0; k < newState.locations[j].powers.length; k++) {
          newArray[++i] = newState.locations[j].powers[k].card;
          for (uint t = 0; t < 5; t++) {
            newArray[++i] = newState.locations[j].powers[k].count[t];
          }
        }
        newArray[++i] = newState.locations[j].computerCases.length;
        for (k = 0; k < newState.locations[j].computerCases.length; k++) {
          for (t = 0; t < 25; t++) {
            newArray[++i] = newState.locations[j].computerCases[k].count[t];
          }
        }
        newArray[++i] = newState.locations[j].rigCases.length;
        for (k = 0; k < newState.locations[j].rigCases.length; k++) {
          for (t = 0; t < 20; t++) {
            newArray[++i] = newState.locations[j].rigCases[k].count[t];
          }
        }
        newArray[++i] = newState.locations[j].mountCases.length;
        for (k = 0; k < newState.locations[j].mountCases.length; k++) {
          for (t = 0; t < 5; t++) {
            newArray[++i] = newState.locations[j].mountCases[k].asicCount[t];
          }
        }
        newArray[++i] = newState.locations[j].developers.length;
        for (k = 0; k < newState.locations[j].developers.length; k++) {
          newArray[++i] = newState.locations[j].developers[k].card;
          for (t = 0; t < 5; t++) {
            newArray[++i] = newState.locations[j].developers[k].count[t];
          }
        }
        newArray[++i] = newState.locations[j].specialCards.length;
        for (k = 0; k < newState.locations[j].specialCards.length; k++) {
          newArray[++i] = newState.locations[j].specialCards[k].card;
          for (t = 0; t < 5; t++) {
            newArray[++i] = newState.locations[j].specialCards[k].count[t];
          }
        }
      }
    }

    for (j = 0; j < 10; j++) {
      newArray[++i] = newState.projects[j].card;
      newArray[++i] = newState.projects[j].level;
      newArray[++i] = newState.projects[j].timeLeft;
    }
  }
}
