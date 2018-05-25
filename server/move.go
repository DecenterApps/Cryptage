package main

type Move struct {
  Shift bool
  GpuOption bool
  Level uint
  Location uint
  ContainerIndex uint
  Card uint
  BlockNumber uint
  BlockDifference uint
}

func DecodeMoves(buffer []byte) (uint, []Move) {
  moves := make([]Move, len(buffer) / 5 - 3)

  var startBlock = uint(buffer[1]) * 16777216 + uint(buffer[2]) * 65536 + uint(buffer[3]) * 256 + uint(buffer[4])
  var sendBlock = uint(buffer[6]) * 16777216 + uint(buffer[7]) * 65536 + uint(buffer[8]) * 256 + uint(buffer[9])

  for i := 0; i < len(buffer) / 5 - 3; i++ {
    moves[i] = Move{
      Shift: uint(buffer[5 * (i + 3)]) / 128 > 0,
      GpuOption: (uint(buffer[5 * (i + 3)]) % 128) / 64 > 0,
      Location: (uint(buffer[5 * (i + 3)]) % 64) / 8,
      Level: uint(buffer[5 * (i + 3)]) % 8 - levelOffset,
      ContainerIndex: uint(buffer[5 * (i + 3) + 1]),
      Card: uint(buffer[5 * (i + 3) + 2]),
      BlockNumber: startBlock + uint(buffer[5 * (i + 3) + 3]) * 256 + uint(buffer[5 * (i + 3) + 4]),
      BlockDifference: uint(buffer[5 * (i + 3) + 3]) * 256 + uint(buffer[5 * (i + 3) + 4]),
    }
  }

  return sendBlock, moves
}
