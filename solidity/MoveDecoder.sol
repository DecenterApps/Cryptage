pragma solidity ^0.4.22;

contract MoveDecoder {
  struct Move {
    uint shift;
    uint gpuOption;
    uint level;
    uint location;
    uint containerIndex;
    uint card;
    uint blockNumber;
    uint blockDifference;
  }

  function decodeMoves(uint[] _moves) internal pure returns (Move[] memory moves, uint sendBlockNumber) {
    uint offset = 6;
    for (uint i = 1; i < 6; i++) {
      if ((_moves[_moves.length - 1] & ((uint(2) << (213 - 42 * i)) * 0xFFFFFFFFFF)) == ((uint(2) << (213 - 42 * i)) * 0xFFFFFFFFFF)) {
        offset = i;
      }
    }

    moves = new Move[]((_moves.length - 1) * 6 - 2 + offset);
    uint blockNumber = _moves[0] >> 214;
    sendBlockNumber = (_moves[0] >> 172) % 0x100000000;

    for (i = 0; i < _moves.length; i++) {
      for (uint j = 0; j < 6; j++) {
        if (i == 0 && j < 2) {
          continue;
        }

        if ((_moves[i] & ((uint(2) << (213 - 42 * j)) * 0x3FFFFFFFFFF)) == ((uint(2) << (213 - 42 * j)) * 0x3FFFFFFFFFF)) {
          break;
        }

        uint blockDifference = (_moves[i] & ((uint(2) << (213 - 42 * j))) * 65535) / (uint(2) << (213 - 42 * j));
        moves[i * 6 + j - 2] = Move({
          shift: (_moves[i] & (uint(2) << (254 - 42 * j))) / (uint(2) << (254 - 42 * j)),
          gpuOption: (_moves[i] & (uint(2) << (253 - 42 * j))) / (uint(2) << (253 - 42 * j)),
          level: (_moves[i] & ((uint(2) << (250 - 42 * j))) * 7) / (uint(2) << (250 - 42 * j)),
          location: (_moves[i] & ((uint(2) << (247 - 42 * j))) * 7) / (uint(2) << (247 - 42 * j)),
          containerIndex: (_moves[i] & ((uint(2) << (240 - 42 * j))) * 127) / (uint(2) << (240 - 42 * j)),
          card: (_moves[i] & ((uint(2) << (229 - 42 * j))) * 2047) / (uint(2) << (229 - 42 * j)),
          blockNumber: blockNumber += blockDifference,
          blockDifference: blockDifference
          });

        if (i == 0 && j == 2) {
          blockNumber -= blockDifference;
        }
      }
    }
  }
}
