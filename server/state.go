package main

const numberOfLocations = 6
const numberOfProjects = 10
const numberOfCards = 100
const computerCaseMinersCount = 5
const rigCaseMinersCount = 4

const powerLevelCount = 5
const computerCaseMinersLevelCount = 5
const rigCaseMinersLevelCount = 5
const asicCaseLevelCount = 5
const developerLevelCount = 5
const specialLevelCount = 5

const fundsSize = 6
const fundsPerBlockSize = 2
const experienceSize = 4
const developmentLeftSize = 2
const blockNumberSize = 4
const projectTimePercentageDecreaseSize = 1

const cardSize = 2
const numberOfCardsSize = 2
const spaceLeftSize = 2
const powerLeftSize = 2

const singleCountSize = 1
const doubleCountSize = 2

const asicCountSize = 1

const timeLeftSize = 2

const levelSize = 1

const locationOffset = 1
const levelOffset = 1
const containerIndexOffset = 1
const computerCaseMinersOffset = 9
const rigCaseMinersOffset = 10

const blockNumberOffset = 10000

type State struct {
  Funds                              uint `json:"funds"`
  FundsPerBlock                      uint `json:"funds_per_block"`
  Experience                         uint `json:"experience"`
  Level                              uint `json:"level"`
  DevelopmentLeft                    uint `json:"development_left"`
  BlockNumber                        uint `json:"block_number"`
  DayTradingBonus                    uint `json:"day_trading_bonus"`
  CpuCount                           uint `json:"cpu_count"`
  GpuCount                           uint `json:"gpu_count"`
  ProjectTimePercentageDecrease      uint `json:"project_time_percentage_decrease"`
  PredictionMarketParticipationBonus uint `json:"prediction_market_participation_bonus"`
  Locations                          [numberOfLocations]Location `json:"locations"`
  Projects                           [numberOfProjects]Project `json:"projects"`
  CurrentCardsCount                  [numberOfCards]uint `json:"current_cards_count"`
  MaximumCardsCount                  [numberOfCards]uint `json:"maximum_cards_count"`
}

type Location struct {
  Exists                     uint `json:"exists"`
  Card                       uint `json:"card"`
  NumberOfCards              uint `json:"number_of_cards"`
  SpaceLeft                  uint `json:"space_left"`
  PowerLeft                  uint `json:"power_left"`
  Development                uint `json:"development"`
  DevelopmentBonus           uint `json:"development_bonus"`
  DevelopmentPercentageBonus uint `json:"development_percentage_bonus"`
  Mining                     uint `json:"mining"`
  MiningBonus                uint `json:"mining_bonus"`
  MiningPercentageBonus      uint `json:"mining_percentage_bonus"`
  SpaceRenting               uint `json:"space_renting"`
  SpaceRentingBonus          uint `json:"space_renting_bonus"`
  PowerRenting               uint `json:"power_renting"`
  PowerRentingBonus          uint `json:"power_renting_bonus"`
  CoffeeMiner                uint `json:"coffee_miner"`
  ComputerCases              []ComputerCase `json:"computer_cases"`
  RigCases                   []RigCase `json:"rig_cases"`
  AsicCases                  []MountCase `json:"asic_cases"`
  People                     []Person `json:"people"`
  Powers                     []Power `json:"powers"`
  SpecialCards               []SpecialCard `json:"special_cards"`
}

func (location *Location) getContainer(miningType string, gpuOption bool, containerIndex uint) interface{} {
  switch miningType {
  case "CPU Miner":
    {
      return location.ComputerCases[containerIndex]
    }
  case "GPU Miner":
    {
      if gpuOption {
        return location.RigCases[containerIndex]
      }

      return location.ComputerCases[containerIndex]
    }
  default:
    {
      return location.AsicCases[containerIndex]
    }
  }
}

type Power struct {
  Card  uint `json:"card"`
  Count [powerLevelCount]uint `json:"count"`
}

type ComputerCase struct {
  Count [computerCaseMinersCount][computerCaseMinersLevelCount]uint `json:"count"`
}

type RigCase struct {
  Count [rigCaseMinersCount][rigCaseMinersLevelCount]uint `json:"count"`
}

type MountCase struct {
  Count [asicCaseLevelCount]uint `json:"count"`
}

type Person struct {
  Card  uint `json:"card"`
  Count [developerLevelCount]uint `json:"count"`
}

type SpecialCard struct {
  Card  uint `json:"card"`
  Count [specialLevelCount]uint `json:"count"`
}

type Project struct {
  Exists   uint `json:"exists"`
  Card     uint `json:"card"`
  Level    uint `json:"level"`
  TimeLeft uint `json:"time_left"`
}

func NewState() (*State, error) {
  blockNumber, err := GetBlockNumber()
  if err != nil {
    return nil, err
  }

  return &State{
    Funds:                         150,
    FundsPerBlock:                 0,
    DevelopmentLeft:               0,
    BlockNumber:                   uint(blockNumber.Uint64()) - blockNumberOffset,
    ProjectTimePercentageDecrease: 0,
    Locations:                     [6]Location{},
    Projects:                      [10]Project{},
    CurrentCardsCount:             [numberOfCards]uint{},
    MaximumCardsCount:             [numberOfCards]uint{},
  }, nil
}

func (state *State) update(sendBlockNumber uint, moves []Move) error {
  for i := 0; i < len(moves); i++ {
    // first update everything based on funds per block
    state.Funds += (moves[i].BlockNumber - state.BlockNumber) * state.FundsPerBlock
    // update all projects
    updateProjects(state, moves[i])

    var err error
    if moves[i].Shift {
      err = playCard(state, moves[i])
    } else {
      err = removeCard(state, moves[i])
    }

    if err != nil {
      return err
    }

    // set new block number at the end
    state.BlockNumber = moves[i].BlockNumber
  }

  return nil
}

func encode(state State) []byte {
  var buffer []byte

  appendBuffer(&buffer, state.Funds, fundsSize)
  appendBuffer(&buffer, state.FundsPerBlock, fundsPerBlockSize)
  appendBuffer(&buffer, state.Experience, experienceSize)
  appendBuffer(&buffer, state.DevelopmentLeft, developmentLeftSize)
  appendBuffer(&buffer, state.BlockNumber, blockNumberSize)
  appendBuffer(&buffer, state.ProjectTimePercentageDecrease, projectTimePercentageDecreaseSize)

  for i := 0; i < 6; i++ {
    appendBuffer(&buffer, state.Locations[i].Exists, singleCountSize)
    if state.Locations[i].Exists != 0 {
      appendBuffer(&buffer, state.Locations[i].Card, cardSize)
      appendBuffer(&buffer, state.Locations[i].NumberOfCards, numberOfCardsSize)
      appendBuffer(&buffer, state.Locations[i].SpaceLeft, spaceLeftSize)
      appendBuffer(&buffer, state.Locations[i].PowerLeft, powerLeftSize)

      appendBuffer(&buffer, uint(len(state.Locations[i].Powers)), singleCountSize)
      for j := 0; j < len(state.Locations[i].Powers); j++ {
        appendBuffer(&buffer, state.Locations[i].Powers[j].Card, cardSize)
        for k := 0; k < powerLevelCount; k++ {
          appendBuffer(&buffer, state.Locations[i].Powers[j].Count[k], singleCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.Locations[i].ComputerCases)), singleCountSize)
      for j := 0; j < len(state.Locations[i].ComputerCases); j++ {
        for k := 0; k < computerCaseMinersCount; k++ {
          for t := 0; t < computerCaseMinersLevelCount; t++ {
            appendBuffer(&buffer, state.Locations[i].ComputerCases[j].Count[k][t], singleCountSize)
          }
        }
      }

      appendBuffer(&buffer, uint(len(state.Locations[i].RigCases)), singleCountSize)
      for j := 0; j < len(state.Locations[i].RigCases); j++ {
        for k := 0; k < rigCaseMinersCount; k++ {
          for t := 0; t < rigCaseMinersLevelCount; t++ {
            appendBuffer(&buffer, state.Locations[i].RigCases[j].Count[k][t], singleCountSize)
          }
        }
      }

      appendBuffer(&buffer, uint(len(state.Locations[i].AsicCases)), singleCountSize)
      for j := 0; j < len(state.Locations[i].AsicCases); j++ {
        for k := 0; k < developerLevelCount; k++ {
          appendBuffer(&buffer, state.Locations[i].AsicCases[j].Count[k], asicCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.Locations[i].People)), singleCountSize)
      for j := 0; j < len(state.Locations[i].People); j++ {
        appendBuffer(&buffer, state.Locations[i].People[j].Card, cardSize)
        for k := 0; k < developerLevelCount; k++ {
          appendBuffer(&buffer, state.Locations[i].People[j].Count[k], singleCountSize)
        }
      }

      appendBuffer(&buffer, uint(len(state.Locations[i].SpecialCards)), singleCountSize)
      for j := 0; j < len(state.Locations[i].SpecialCards); j++ {
        appendBuffer(&buffer, state.Locations[i].SpecialCards[j].Card, cardSize)
        for k := 0; k < specialLevelCount; k++ {
          appendBuffer(&buffer, state.Locations[i].SpecialCards[j].Count[k], doubleCountSize)
        }
      }
    }
  }

  for i := 0; i < len(state.Projects); i++ {
    appendBuffer(&buffer, state.Projects[i].Exists, singleCountSize)
    appendBuffer(&buffer, state.Projects[i].Card, cardSize)
    appendBuffer(&buffer, state.Projects[i].Level, levelSize)
    appendBuffer(&buffer, state.Projects[i].TimeLeft, timeLeftSize)
  }

  return buffer
}

func appendBuffer(buffer *[]byte, appendData uint, appendSize uint) {
  for i := uint(0); i < appendSize; i++ {
    *buffer = append(*buffer, byte((appendData>>(appendSize-i-1))%256))
  }
}

func decode(buffer []byte) (*State, error) {
  var position uint = 0

  state, err := NewState()
  if err != nil {
    return nil, err
  }

  if len(buffer) > 0 {
    position, state.Funds = readBuffer(buffer, position, fundsSize)
    position, state.FundsPerBlock = readBuffer(buffer, position, fundsPerBlockSize)
    position, state.Experience = readBuffer(buffer, position, experienceSize)
    position, state.DevelopmentLeft = readBuffer(buffer, position, developmentLeftSize)
    position, state.BlockNumber = readBuffer(buffer, position, blockNumberSize)
    position, state.ProjectTimePercentageDecrease = readBuffer(buffer, position, projectTimePercentageDecreaseSize)
    for i := 0; i < 6; i++ {
      position, state.Locations[i].Exists = readBuffer(buffer, position, singleCountSize)
      if state.Locations[i].Exists != 0 {
        position, state.Locations[i].Card = readBuffer(buffer, position, cardSize)
        position, state.Locations[i].NumberOfCards = readBuffer(buffer, position, numberOfCardsSize)
        position, state.Locations[i].SpaceLeft = readBuffer(buffer, position, spaceLeftSize)
        position, state.Locations[i].PowerLeft = readBuffer(buffer, position, powerLeftSize)

        position, count := readBuffer(buffer, position, singleCountSize)
        state.Locations[i].Powers = make([]Power, count)
        for j := uint(0); j < count; j++ {
          position, state.Locations[i].Powers[j].Card = readBuffer(buffer, position, cardSize)
          for k := 0; k < powerLevelCount; k++ {
            position, state.Locations[i].Powers[j].Count[k] = readBuffer(buffer, position, singleCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.Locations[i].ComputerCases = make([]ComputerCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < computerCaseMinersCount; k++ {
            for t := 0; t < computerCaseMinersLevelCount; t++ {
              position, state.Locations[i].ComputerCases[j].Count[k][t] = readBuffer(buffer, position, singleCountSize)
            }
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.Locations[i].RigCases = make([]RigCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < rigCaseMinersCount; k++ {
            for t := 0; t < rigCaseMinersLevelCount; t++ {
              position, state.Locations[i].RigCases[j].Count[k][t] = readBuffer(buffer, position, singleCountSize)
            }
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.Locations[i].AsicCases = make([]MountCase, count)
        for j := uint(0); j < count; j++ {
          for k := 0; k < asicCaseLevelCount; k++ {
            position, state.Locations[i].AsicCases[j].Count[k] = readBuffer(buffer, position, asicCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.Locations[i].People = make([]Person, count)
        for j := uint(0); j < count; j++ {
          position, state.Locations[i].People[j].Card = readBuffer(buffer, position, cardSize)
          for k := 0; k < developerLevelCount; k++ {
            position, state.Locations[i].People[j].Count[k] = readBuffer(buffer, position, singleCountSize)
          }
        }

        position, count = readBuffer(buffer, position, singleCountSize)
        state.Locations[i].SpecialCards = make([]SpecialCard, count)
        for j := uint(0); j < count; j++ {
          position, state.Locations[i].SpecialCards[j].Card = readBuffer(buffer, position, cardSize)
          for k := 0; k < specialLevelCount; k++ {
            position, state.Locations[i].SpecialCards[j].Count[k] = readBuffer(buffer, position, doubleCountSize)
          }
        }
      }
    }

    for i := 0; i < 10; i++ {
      position, state.Projects[i].Exists = readBuffer(buffer, position, singleCountSize)
      position, state.Projects[i].Card = readBuffer(buffer, position, cardSize)
      position, state.Projects[i].Level = readBuffer(buffer, position, levelSize)
      position, state.Projects[i].TimeLeft = readBuffer(buffer, position, timeLeftSize)
    }
  }

  return state, nil
}

func readBuffer(buffer []byte, position uint, appendSize uint) (uint, uint) {
  var data uint
  for i := uint(0); i < appendSize; i++ {
    data = data*256 + uint(buffer[position+i])
  }

  return position + appendSize, data
}
