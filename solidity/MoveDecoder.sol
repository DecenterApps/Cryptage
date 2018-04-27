pragma solidity ^0.4.20;

contract MoveDecoder {
  struct Move {
    bool shift;
    bool gpuOption;
    uint level;
    uint location;
    uint containerIndex;
    uint card;
    uint blockNumber;
    uint blockDifference;
  }

  function decode(uint[] _moves) internal pure returns (Move[] memory moves, uint sendBlockNumber) {
    for (uint i = 1; i < 6; i++) {
      if ((_moves[_moves.length - 1] & ((uint(2) << (215 - 42 * i)) * 0x2FFFFFFFFFF)) == ((uint(2) << (215 - 42 * i)) * 0x2FFFFFFFFFF)) {
        uint offset = i;
      }
    }

    moves = new Move[]((_moves.length - 1) * 6 - 2 + offset);
    uint blockNumber = _moves[0] >> 216;
    sendBlockNumber = (_moves[0] >> 176) % 0x100000000;

    for (i = 0; i < _moves.length; i++) {
      for (uint j = 0; j < 6; j++) {
        if (i == 0 && j < 2) {
          continue;
        }

        if ((_moves[i] & ((uint(2) << (215 - 42 * j)) * 0xFFFFFFFFFF)) == ((uint(2) << (215 - 42 * j)) * 0xFFFFFFFFFF)) {
          break;
        }

        uint blockDifference = (_moves[i] & ((uint(2) << (214 - 42 * j))) * 65535) / (uint(2) << (214 - 42 * j));
        moves[i * 6 + j - 2] = Move({
          shift: (_moves[i] & (uint(2) << (255 - 42 * j))) > 0,
          gpuOption: (_moves[i] & (uint(2) << (254 - 42 * j))) > 0,
          level: (_moves[i] & ((uint(2) << (251 - 42 * j))) * 7) / (uint(2) << (251 - 42 * j)),
          location: (_moves[i] & ((uint(2) << (248 - 42 * j))) * 7) / (uint(2) << (248 - 42 * j)),
          containerIndex: (_moves[i] & ((uint(2) << (241 - 42 * j))) * 127) / (uint(2) << (241 - 42 * j)),
          card: (_moves[i] & ((uint(2) << (230 - 42 * j))) * 2047) / (uint(2) << (230 - 42 * j)),
          blockNumber: blockNumber += blockDifference,
          blockDifference: blockDifference
          });
      }
    }
  }
}
