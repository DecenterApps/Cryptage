pragma solidity ^0.4.20;

contract StateCodec {

  mapping(address => bytes) states;

  uint constant numberOfCards = 100;

  uint constant numberOfLocations = 6;
  uint constant numberOfProjects = 10;
  uint constant computerCaseMinersCount = 5;
  uint constant rigCaseMinersCount = 4;
  
  uint constant powerLevelCount = 5;
  uint constant cpuLevelCount = 5;
  uint constant gpuLevelCount = 5;
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
    uint[computerCaseMinersCount * cpuLevelCount] counts;
  }

  struct RigCase {
    // uint8
    uint[rigCaseMinersCount * gpuLevelCount] counts;
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
  
  function encode(State state) internal pure returns (bytes) {}
  function decode(bytes buffer) internal pure returns (State memory state) {}

}