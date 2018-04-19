pragma solidity ^0.4.22;

contract StateCodec {

    struct State {
        uint48 funds;
        uint16 fundsPerBlock;
        uint32 experience;
        uint16 developmentLeft;
        uint32 BlockNumber;
        Location[6] locations;
        Project[10] projects;
    }

    struct Location {
        uint16 card;
        uint16 numberOfCards;
        uint16 spaceLeft;
        uint16 powerLeft;
        uint8 coffeeMiner;
        uint8 gridConnect;
        Power[] powers;
        ComputerCase[] computerCases;
        RigCase[] rigCases;
        MountCase[] mountCases;
        Developer[] developers;
    }

    struct Power {
        mapping(uint16 => uint8) power;
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
        mapping(uint16 => uint8) developer;
    }

    struct Project {
        mapping(uint16 => uint8) project;
    }

    function encode(State state) internal pure returns(bytes) {

    }

    function decode(bytes input) internal pure returns(State) {

    }
}
