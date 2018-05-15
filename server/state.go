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
func (state *State) update(sendBlockNumber uint, moves []Move) error {

  return nil
}

func encode(state State) []byte {
  var buffer []byte

  appendBuffer(&buffer, state.funds, fundsSize)
  appendBuffer(&buffer, state.fundsPerBlock, fundsPerBlockSize)
  appendBuffer(&buffer, state.experience, experienceSize)
  appendBuffer(&buffer, state.developmentLeft, developmentLeftSize)
  appendBuffer(&buffer, state.blockNumber, blockNumberSize)
  appendBuffer(&buffer, state.projectTimePercentageDecrease, projectTimePercentageDecreaseSize)
  appendBuffer(&buffer, state.miningPercentageBonus, miningPercentageBonusSize)

  for i := 0; i < 6; i++ {
    appendBuffer(&buffer, state.locations[i].exists, singleCountSize)
    if state.locations[i].exists != 0 {
      appendBuffer(&buffer, state.locations[i].card, cardSize)
      appendBuffer(&buffer, state.locations[i].numberOfCards, numberOfCardsSize)
      appendBuffer(&buffer, state.locations[i].spaceLeft, spaceLeftSize)
      appendBuffer(&buffer, state.locations[i].powerLeft, powerLeftSize)

      appendBuffer(&buffer, uint(len(state.locations[i].powers)), singleCountSize)
      for j := 0; j < len(state.locations[i].powers); j++ {
        appendBuffer(&buffer, state.locations[i].powers[j].card, cardSize)
        for k := 0; k < powerLevelCount; k++ {
          appendBuffer(&buffer, state.locations[i].powers[j].count[k], singleCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.locations[i].computerCases)), singleCountSize)
      for j := 0; j < len(state.locations[i].computerCases); j++ {
        for k := 0; k < computerCaseMinersCount; k++ {
          for t := 0; t < computerCaseMinersLevelCount; t++ {
            appendBuffer(&buffer, state.locations[i].computerCases[j].count[k * computerCaseMinersLevelCount + t], singleCountSize)
          }
        }
      }

      appendBuffer(&buffer, uint(len(state.locations[i].rigCases)), singleCountSize)
      for j := 0; j < len(state.locations[i].rigCases); j++ {
        for k := 0; k < rigCaseMinersCount; k++ {
          for t := 0; t < rigCaseMinersLevelCount; t++ {
            appendBuffer(&buffer, state.locations[i].rigCases[j].count[k * rigCaseMinersLevelCount + t],   singleCountSize)
           }
        }
      }

      appendBuffer(&buffer, uint(len(state.locations[i].mountCases)), singleCountSize)
      for j := 0; j < len(state.locations[i].mountCases); j++ {
        for k := 0; k < developerLevelCount; k++ {
          appendBuffer(&buffer, state.locations[i].mountCases[j].count[k], asicCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.locations[i].people)), singleCountSize)
      for j := 0; j < len(state.locations[i].people); j++ {
        appendBuffer(&buffer, state.locations[i].people[j].card, cardSize)
        for k := 0; k < developerLevelCount; k++ {
          appendBuffer(&buffer, state.locations[i].people[j].count[k], singleCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.locations[i].specialCards)), singleCountSize)
      for j := 0; j < len(state.locations[i].specialCards); j++ {
        appendBuffer(&buffer, state.locations[i].specialCards[j].card, cardSize)
        for k := 0; k < specialLevelCount; k++ {
          appendBuffer(&buffer, state.locations[i].specialCards[j].count[k], doubleCountSize)
        }
      }
    }
  }

  for i := 0; i < len(state.projects); i++ {
    appendBuffer(&buffer, state.projects[i].exists, singleCountSize)
    appendBuffer(&buffer, state.projects[i].card, cardSize)
    appendBuffer(&buffer, state.projects[i].level, levelSize)
    appendBuffer(&buffer, state.projects[i].timeLeft, timeLeftSize)
  }

  return buffer
}

func appendBuffer(buffer *[]byte, appendData uint, appendSize uint) {
  for i := uint(0); i < appendSize; i++ {
    *buffer = append(*buffer, byte((appendData >> (appendSize - i - 1)) % 256))
  }
}

func decode(buffer []byte) State {
  var position uint = 0

  state := State{
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

  if len(buffer) > 0 {
    position, state.funds = readBuffer(buffer, position, fundsSize)
    position, state.fundsPerBlock = readBuffer(buffer, position, fundsPerBlockSize)
    position, state.experience = readBuffer(buffer, position, experienceSize)
    position, state.developmentLeft = readBuffer(buffer, position, developmentLeftSize)
    position, state.blockNumber = readBuffer(buffer, position, blockNumberSize)
    position, state.projectTimePercentageDecrease = readBuffer(buffer, position, projectTimePercentageDecreaseSize)
    position, state.miningPercentageBonus = readBuffer(buffer, position, miningPercentageBonusSize)
    for i := 0; i < 6; i++ {
      position, state.locations[i].exists = readBuffer(buffer, position, singleCountSize)
      if state.locations[i].exists != 0 {
        position, state.locations[i].card = readBuffer(buffer, position, cardSize)
        position, state.locations[i].numberOfCards = readBuffer(buffer, position, numberOfCardsSize)
        position, state.locations[i].spaceLeft = readBuffer(buffer, position, spaceLeftSize)
        position, state.locations[i].powerLeft = readBuffer(buffer, position, powerLeftSize)

        position, count := readBuffer(buffer, position, singleCountSize)
        state.locations[i].powers = make([]Power, count)
        for j := uint(0); j < count; j++ {
          position, state.locations[i].powers[j].card = readBuffer(buffer, position, cardSize)
          for k := 0; k < powerLevelCount; k++ {
            position, state.locations[i].powers[j].count[k] = readBuffer(buffer, position, singleCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.locations[i].computerCases = make([]ComputerCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < computerCaseMinersCount; k++ {
            for t := 0; t < computerCaseMinersLevelCount; t++ {
              position, state.locations[i].computerCases[j].count[k*computerCaseMinersLevelCount+t] = readBuffer(buffer, position, singleCountSize)
            }
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.locations[i].rigCases = make([]RigCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < rigCaseMinersCount; k++ {
            for t := 0; t < rigCaseMinersLevelCount; t++ {
              position, state.locations[i].rigCases[j].count[k*rigCaseMinersLevelCount+t] = readBuffer(buffer, position, singleCountSize)
            }
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.locations[i].mountCases = make([]MountCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < asicLevelCount; k++ {
            position, state.locations[i].mountCases[j].count[k] = readBuffer(buffer, position, asicCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.locations[i].people = make([]Person, count)
        for j := uint(0); j < count; j++ {
          position, state.locations[i].people[j].card = readBuffer(buffer, position, cardSize)
          for k := 0; k < developerLevelCount; k++ {
            position, state.locations[i].people[j].count[k] = readBuffer(buffer, position, singleCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.locations[i].specialCards = make([]SpecialCard, count)
        for j := uint(0); j < count; j++ {
          position, state.locations[i].specialCards[j].card = readBuffer(buffer, position, cardSize)
          for k := 0; k < specialLevelCount; k++ {
            position, state.locations[i].specialCards[j].count[k] = readBuffer(buffer, position, doubleCountSize)
          }
        }
      }
    }

    for i := 0; i < 10; i++ {
      position, state.projects[i].exists = readBuffer(buffer, position, singleCountSize)
      position, state.projects[i].card = readBuffer(buffer, position, cardSize)
      position, state.projects[i].level = readBuffer(buffer, position, levelSize)
      position, state.projects[i].timeLeft = readBuffer(buffer, position, timeLeftSize)
    }
  }

  return state
}

func readBuffer(buffer []byte , position uint, appendSize uint) (uint, uint) {
  var data uint
  for i := uint(0); i < appendSize; i++ {
    data = data * 256 + uint(buffer[position + i])
  }

  return position + appendSize, data
}
