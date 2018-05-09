package main

type Move struct {
  shift uint
  gpuOption uint
  level uint
  location uint
  containerIndex uint
  card uint
  blockNumber uint
  blockDifference uint
}

func decodeMoves(buffer []byte) (uint, []Move) {
  moves := make([]Move, len(buffer) / 5 - 2)

  var startBlock = uint(buffer[1]) * 16777216 + uint(buffer[2]) * 65536 + uint(buffer[3]) * 256 + uint(buffer[4])
  var sendBlock = uint(buffer[6]) * 16777216 + uint(buffer[7]) * 65536 + uint(buffer[8]) * 256 + uint(buffer[9])

  for i := 0; i < len(buffer) / 5 - 2; i++ {
    moves[i] = Move{
      shift: uint(buffer[5 * (i + 2)]) / 128,
      gpuOption: (uint(buffer[5 * (i + 2)]) % 128) / 64,
      level: (uint(buffer[5 * (i + 2)]) % 64) / 8,
      location: uint(buffer[5 * (i + 2)]) % 8,
      containerIndex: uint(buffer[5 * (i + 2) + 1]),
      card: uint(buffer[5 * (i + 2) + 2]),
      blockNumber: startBlock + uint(buffer[5 * (i + 2) + 3]) * 256 + uint(buffer[5 * (i + 2) + 4]),
      blockDifference: uint(buffer[5 * (i + 2) + 3]) * 256 + uint(buffer[5 * (i + 2) + 4]),
    }
  }

  return sendBlock, moves
}
