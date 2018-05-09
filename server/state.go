package main

const numberOfLocations = 6
const numberOfProjects = 10
const numberOfCards = 100
const computerCaseMinersCount = 5
const rigCaseMinersCount = 4

const powerLevelCount = 5
const computerCaseMinersLevelCount = 5
const rigCaseMinersLevelCount = 5
const asicLevelCount = 5
const developerLevelCount = 5
const specialLevelCount = 5

const fundsSize = 6
const fundsPerBlockSize = 2
const experienceSize = 4
const developmentLeftSize = 2
const blockNumberSize = 4
const projectTimePercentageDecreaseSize = 1
const miningPercentageBonusSize = 1

const cardSize = 2
const numberOfCardsSize = 2
const spaceLeftSize = 2
const powerLeftSize = 2

const singleCountSize = 1
const doubleCountSize = 2

const asicCountSize = 1

const timeLeftSize = 2

const levelSize = 1

type State struct {
  exists uint
  funds uint
  fundsPerBlock uint
  experience uint
  developmentLeft uint
  blockNumber uint
  projectTimePercentageDecrease uint
  miningPercentageBonus uint
  locations [numberOfLocations]Location
  projects [numberOfProjects]Project
  currentCardsCount [numberOfCards]uint
  maximumCardsCount [numberOfCards]uint
}

type Location struct {
  exists uint
  card uint
  numberOfCards uint
  spaceLeft uint
  powerLeft uint
  powers []Power
  computerCases []ComputerCase
  rigCases []RigCase
  mountCases []MountCase
  people []Person
  specialCards []SpecialCard
}

type Power struct {
  card uint
  count [powerLevelCount]uint
}

type ComputerCase struct {
  count [computerCaseMinersCount * computerCaseMinersLevelCount]uint
}

type RigCase struct {
  count [rigCaseMinersCount * rigCaseMinersLevelCount]uint
}

type MountCase struct {
  count [asicLevelCount]uint
}

type Person struct {
  card uint
  count [developerLevelCount]uint
}

type SpecialCard struct {
  card uint
  count [specialLevelCount]uint
}

type Project struct {
  exists uint
  card uint
  level uint
  timeLeft uint
}

func encode(state State) []byte {
  var capacity uint = 21 + 60
  var position uint = 1
  var size uint = 21
  var data uint = 0
  var locationCount [6]uint

  for i := 0; i < 6; i++ {
    if state.locations[i].exists != 0 {
    locationCount[i] = uint(14 + 7 * len(state.locations[i].powers) +
                                25 * len(state.locations[i].computerCases) +
                                20 * len(state.locations[i].rigCases) +
                                     len(state.locations[i].mountCases) +
                                 7 * len(state.locations[i].people) +
                                 7 * len(state.locations[i].specialCards))
    }

    capacity += 1 + locationCount[i]
  }

  buffer := make([]byte, capacity)

  position, data, size = appendBuffer(buffer, position, data, state.exists, size, singleCountSize)
  position, data, size = appendBuffer(buffer, position, data, state.funds, size, fundsSize)
  position, data, size = appendBuffer(buffer, position, data, state.fundsPerBlock, size, fundsPerBlockSize)
  position, data, size = appendBuffer(buffer, position, data, state.experience, size, experienceSize)
  position, data, size = appendBuffer(buffer, position, data, state.developmentLeft, size, developmentLeftSize)
  position, data, size = appendBuffer(buffer, position, data, state.blockNumber, size, blockNumberSize)
  position, data, size = appendBuffer(buffer, position, data, state.projectTimePercentageDecrease, size, projectTimePercentageDecreaseSize)
  position, data, size = appendBuffer(buffer, position, data, state.miningPercentageBonus, size, miningPercentageBonusSize)

  for i := 0; i < 6; i++ {
    position, data, size = appendBuffer(buffer, position, data, locationCount[i], size, singleCountSize)
    if state.locations[i].exists != 0 {
      position, data, size = appendBuffer(buffer, position, data, state.locations[i].card, size, cardSize)
      position, data, size = appendBuffer(buffer, position, data, state.locations[i].numberOfCards, size, numberOfCardsSize)
      position, data, size = appendBuffer(buffer, position, data, state.locations[i].spaceLeft, size, spaceLeftSize)
      position, data, size = appendBuffer(buffer, position, data, state.locations[i].powerLeft, size, powerLeftSize)

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].powers)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].powers); j++ {
        position, data, size = appendBuffer(buffer, position, data, state.locations[i].powers[j].card, size, cardSize)
        for k := 0; k < powerLevelCount; k++ {
          position, data, size = appendBuffer(buffer, position, data, state.locations[i].powers[j].count[k], size, singleCountSize)
        }
      }

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].computerCases)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].computerCases); j++ {
        for k := 0; k < computerCaseMinersCount; k++ {
          for t := 0; t < computerCaseMinersLevelCount; t++ {
            position, data, size = appendBuffer(buffer, position, data, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size, singleCountSize)
          }
        }
      }

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].rigCases)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].rigCases); j++ {
        for k := 0; k < rigCaseMinersCount; k++ {
          for t := 0; t < rigCaseMinersLevelCount; t++ {
            position, data, size = appendBuffer(buffer, position, data, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size,   singleCountSize)
           }
        }
      }

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].mountCases)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].mountCases); j++ {
        for k := 0; k < developerLevelCount; k++ {
          position, data, size = appendBuffer(buffer, position, data, state.locations[i].mountCases[j].count[k], size, asicCountSize)
        }
      }

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].people)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].people); j++ {
        position, data, size = appendBuffer(buffer, position, data, state.locations[i].people[j].card, size, cardSize)
        for k := 0; k < developerLevelCount; k++ {
          position, data, size = appendBuffer(buffer, position, data, state.locations[i].people[j].count[k], size, singleCountSize)
        }
      }

      position, data, size = appendBuffer(buffer, position, data, uint(len(state.locations[i].specialCards)), size, singleCountSize)
      for j := 0; j < len(state.locations[i].specialCards); j++ {
        position, data, size = appendBuffer(buffer, position, data, state.locations[i].specialCards[j].card, size, cardSize)
        for k := 0; k < specialLevelCount; k++ {
          position, data, size = appendBuffer(buffer, position, data, state.locations[i].specialCards[j].count[k], size, doubleCountSize)
        }
      }
    }
  }

  for i := 0; i < len(state.projects); i++ {
    position, data, size = appendBuffer(buffer, position, data, state.projects[i].exists, size, singleCountSize)
    position, data, size = appendBuffer(buffer, position, data, state.projects[i].card, size, cardSize)
    position, data, size = appendBuffer(buffer, position, data, state.projects[i].level, size, levelSize)
    position, data, size = appendBuffer(buffer, position, data, state.projects[i].timeLeft, size, timeLeftSize)
  }

  return buffer
}

func appendBuffer(buffer []byte, position uint, data uint, appendData uint, size uint, appendSize uint) (uint, uint, uint) {
  if size + appendSize >= 32 {
    data += appendData >> ((size + appendSize - 32) * 8)
    buffer = append(buffer, byte(data))
    size = size + appendSize - 32
    if size != 0 {
      data = (appendData & ((uint(2) << (size * 8 - 1)) - 1)) << ((32 - size) * 8)
    } else {
      data = 0
    }
    position += 1
  } else {
    size = size + appendSize
    data += appendData * (uint(2) << ((32 - size) * 8 - 1))
  }

  return position, data, size
}

func decode(buffer []byte) State {
  var position uint = 1
  var size uint = 0

  state := State{
    exists: 0,
    funds: 150,
    fundsPerBlock: 0,
    developmentLeft: 0,
    blockNumber: 0,
    projectTimePercentageDecrease: 0,
    miningPercentageBonus: 0,
    locations: [6]Location{},
    projects: [10]Project{},
    currentCardsCount: [numberOfCards]uint{},
    maximumCardsCount: [numberOfCards]uint{},
  }

  position, state.exists, size = readBuffer(buffer, position, size, singleCountSize)
  position, state.funds, size = readBuffer(buffer, position, size, fundsSize)
  position, state.fundsPerBlock, size = readBuffer(buffer, position, size, fundsPerBlockSize)
  position, state.experience, size = readBuffer(buffer, position, size, experienceSize)
  position, state.developmentLeft, size = readBuffer(buffer, position, size, developmentLeftSize)
  position, state.blockNumber, size = readBuffer(buffer, position, size, blockNumberSize)
  position, state.projectTimePercentageDecrease, size = readBuffer(buffer, position, size, projectTimePercentageDecreaseSize)
  position, state.miningPercentageBonus, size = readBuffer(buffer, position, size, miningPercentageBonusSize)
  for i := 0; i < 6; i++ {
    position, locationCount, size := readBuffer(buffer, position, size, singleCountSize)
    if locationCount != 0 {
      state.locations[i].exists = 1
      position, state.locations[i].card, size = readBuffer(buffer, position, size, cardSize)
      position, state.locations[i].numberOfCards, size = readBuffer(buffer, position, size, numberOfCardsSize)
      position, state.locations[i].spaceLeft, size = readBuffer(buffer, position, size, spaceLeftSize)
      position, state.locations[i].powerLeft, size = readBuffer(buffer, position, size, powerLeftSize)

      position, count, size := readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].powers = make([]Power, count)
      for j := uint(0); j < count; j++ {
        position, state.locations[i].powers[j].card, size = readBuffer(buffer, position, size, cardSize)
        for k := 0; k < powerLevelCount; k++ {
          position, state.locations[i].powers[j].count[k], size = readBuffer(buffer, position, size, singleCountSize)
        }
      }

      position, count, size = readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].computerCases = make([]ComputerCase, count)
      for j := uint(0); j < count; j++ {
        for k := 0; k < computerCaseMinersCount; k++ {
          for t := 0; t < computerCaseMinersLevelCount; t++ {
            position, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], size = readBuffer(buffer, position, size, singleCountSize)
          }
        }
     }

      position, count, size = readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].rigCases = make([]RigCase, count)
      for j := uint(0); j < count; j++ {
        for k := 0; k < rigCaseMinersCount; k++ {
          for t := 0; t < rigCaseMinersLevelCount; t++ {
            position, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t], size = readBuffer(buffer, position, size, singleCountSize)
          }
        }
      }

      position, count, size = readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].mountCases = make([]MountCase, count)
      for j := uint(0); j < count; j++ {
        for k := 0; k < asicLevelCount; k++ {
          position, state.locations[i].mountCases[j].count[k], size = readBuffer(buffer, position, size, asicCountSize)
        }
      }

      position, count, size = readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].people = make([]Person, count)
      for j := uint(0); j < count; j++ {
        position, state.locations[i].people[j].card, size = readBuffer(buffer, position, size, cardSize)
        for k := 0; k < developerLevelCount; k++ {
          position, state.locations[i].people[j].count[k], size = readBuffer(buffer, position, size, singleCountSize)
        }
      }

      position, count, size = readBuffer(buffer, position, size, singleCountSize)
      state.locations[i].specialCards = make([]SpecialCard, count)
      for j := uint(0); j < count; j++ {
        position, state.locations[i].specialCards[j].card, size = readBuffer(buffer, position, size, cardSize)
        for k := 0; k < specialLevelCount; k++ {
          position, state.locations[i].specialCards[j].count[k], size = readBuffer(buffer, position, size, doubleCountSize)
        }
      }
    }
  }

  for i := 0; i < 10; i++ {
    position, state.projects[i].exists, size = readBuffer(buffer, position, size, singleCountSize)
    position, state.projects[i].card, size = readBuffer(buffer, position, size, cardSize)
    position, state.projects[i].level, size = readBuffer(buffer, position, size, levelSize)
    position, state.projects[i].timeLeft, size = readBuffer(buffer, position, size, timeLeftSize)
  }

  return state
}

func readBuffer(buffer []byte , position uint, size uint, appendSize uint) (uint, uint, uint) {
  var data = uint(buffer[position])

  var returnData uint

  if size + appendSize >= 32 {
    position += 1
    returnData = (data & ((uint(2) << ((32 - size) * 8 - 1)) - 1)) << ((size + appendSize - 32) * 8)
    if size + appendSize != 32 {
      var secondData = uint(buffer[position + 1])
      returnData += (secondData & ((uint(2) << ((64 - size - appendSize) * 8 - 1)) * ((uint(2) << ((size + appendSize - 32) * 8 - 1)) - 1))) / (uint(2) << ((64 - size - appendSize) * 8 - 1))
    }
    size = size + appendSize - 32
  } else {
    returnData = (data & (uint(2) << ((32 - size - appendSize) * 8 - 1)) * ((uint(2) << (8 * appendSize - 1)) - 1)) / (uint(2) << ((32 - size - appendSize) * 8 - 1))
    size = size + appendSize
  }

  return position, returnData, size
}
