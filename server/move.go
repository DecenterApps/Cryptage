package main

type Move struct {
  shift bool
  gpuOption bool
  level uint
  location uint
  containerIndex uint
  card uint
  blockNumber uint
  blockDifference uint
}

func decodeMoves(buffer []byte) (uint, []Move) {
  moves := make([]Move, len(buffer) / 5 - 3)

  var startBlock = uint(buffer[1]) * 16777216 + uint(buffer[2]) * 65536 + uint(buffer[3]) * 256 + uint(buffer[4])
  var sendBlock = uint(buffer[6]) * 16777216 + uint(buffer[7]) * 65536 + uint(buffer[8]) * 256 + uint(buffer[9])

  for i := 0; i < len(buffer) / 5 - 3; i++ {
    moves[i] = Move{
      shift: uint(buffer[5 * (i + 3)]) / 128 > 0,
      gpuOption: (uint(buffer[5 * (i + 3)]) % 128) / 64 > 0,
      level: (uint(buffer[5 * (i + 3)]) % 64) / 8 - levelOffset,
      location: uint(buffer[5 * (i + 3)]) % 8 - locationOffset,
      containerIndex: uint(buffer[5 * (i + 3) + 1]) - containerIndexOffset,
      card: uint(buffer[5 * (i + 3) + 2]),
      blockNumber: startBlock + uint(buffer[5 * (i + 3) + 3]) * 256 + uint(buffer[5 * (i + 3) + 4]),
      blockDifference: uint(buffer[5 * (i + 3) + 3]) * 256 + uint(buffer[5 * (i + 3) + 4]),
    }
  }

  return sendBlock, moves
}
