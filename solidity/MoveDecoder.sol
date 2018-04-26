pragma solidity ^0.4.20;

contract MoveDecoder {
  struct Move {
    bool shift;
    bool gpuOption;
    uint location;
    uint containerIndex;
    uint card;
    uint blockNumber;
  }

  function decode(uint[] _moves) internal pure returns (Move[] memory moves, uint sendBlockNumber) {
    for (uint i = 1; i < 6; i++) {
      if ((_moves[_moves.length - 1] & ((uint(2) << (215 - 40 * i)) * 0xFFFFFFFFFF)) == ((uint(2) << (215 - 40 * i)) * 0xFFFFFFFFFF)) {
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

        if ((_moves[i] & ((uint(2) << (215 - 40 * j)) * 0xFFFFFFFFFF)) == ((uint(2) << (215 - 40 * j)) * 0xFFFFFFFFFF)) {
          break;
        }

        moves[i * 6 + j - 2] = Move({
          shift: (_moves[i] & (uint(2) << (255 - 40 * j))) > 0,
          gpuOption: (_moves[i] & (uint(2) << (254 - 40 * j))) > 0,
          location: (_moves[i] & ((uint(2) << (251 - 40 * j))) * 7) / (uint(2) << (251 - 40 * j)),
          containerIndex: (_moves[i] & ((uint(2) << (243 - 40 * j))) * 255) / (uint(2) << (243 - 40 * j)),
          card: (_moves[i] & ((uint(2) << (232 - 40 * j))) * 2047) / (uint(2) << (232 - 40 * j)),
          blockNumber: blockNumber += (_moves[i] & ((uint(2) << (215 - 40 * j))) * 65535) / (uint(2) << (215 - 40 * j))
          });
      }
    }
  }
}
