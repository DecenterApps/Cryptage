pragma solidity ^0.4.22;

contract StateCodec {

  mapping(address => State) public states;

  struct State {
    uint funds;
    uint fundsPerBlock;
    uint experience;
    uint developmentLeft;
    uint blockNumber;
    Location[6] locations;
    Project[10] projects;
  }

  struct Location {
    uint card;
    uint numberOfCards;
    uint spaceLeft;
    uint powerLeft;
    uint coffeeMiner;
    uint gridConnect;
    Power[] powers;
    ComputerCase[] computerCases;
    RigCase[] rigCases;
    MountCase[] mountCases;
    Developer[] developers;
  }

  struct Power {
    uint card;
    uint count;
  }

  struct ComputerCase {
    uint card;
    uint cpuCount;
    uint gpuCount;
  }

  struct RigCase {
    uint card;
    uint gpuCount;
  }

  struct MountCase {
    uint card;
    uint asicCount;
  }

  struct Developer {
    uint card;
    uint count;
  }

  struct Project {
    uint card;
    uint timeLeft;
  }

  function encode(State state) internal pure returns (bytes) {

  }

  function decode(bytes input) internal pure returns (State) {

  }
}
