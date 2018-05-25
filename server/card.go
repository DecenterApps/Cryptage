package main

import (
  "io/ioutil"
  "encoding/json"
  "errors"
  "math"
)

var typeFuncPrePlayMapping = map[string]func(*State, Card, Move) error{
  "Location":  prePlayLocation,
  "Container": prePlayMiningContainer,
  "Mining":    prePlayMining,
  "Person":    prePlayPerson,
  "Power":     prePlayPower,
  "Misc":      prePlayMisc,
  "Project":   prePlayProject,
}

var typeFuncPostPlayMapping = map[string]func(*State, Card, Move){
  "Location":  postPlayLocation,
  "Container": postPlayMiningContainer,
  "Mining":    postPlayMining,
  "Person":    postPlayPerson,
  "Power":     postPlayPower,
  "Misc":      postPlayMisc,
  "Project":   postPlayProject,
}

var typeFuncPreRemoveMapping = map[string]func(*State, Card, Move) error{
  "Location":  preRemoveLocation,
  "Container": preRemoveMiningContainer,
  "Mining":    preRemoveMining,
  "Person":    preRemovePerson,
  "Power":     preRemovePower,
  "Misc":      preRemoveMisc,
  "Project":   preRemoveProject,
}

var typeFuncRemoveMapping = map[string]func(*State, Card, Move){
  "Location":  postRemoveLocation,
  "Container": postRemoveMiningContainer,
  "Mining":    postRemoveMining,
  "Person":    postRemovePerson,
  "Power":     postRemovePower,
  "Misc":      postRemoveMisc,
  "Project":   postRemoveProject,
}

var SubtypeMiningContainerFuncPostPlayMapping = map[string]func(*State, Card, Move){
  "Computer Case Mining Container": postPlayComputerCaseMiningContainer,
  "Rig Mining Container":           postPlayRigMiningContainer,
  "ASIC Mining Container":          postPlayASICMiningContainer,
}

var SubtypeMiningFuncPrePlayMapping = map[string]func(*State, Card, Move) error{
  "CPU Mining":  prePlayCPUMining,
  "GPU Mining":  prePlayGPUMining,
  "ASIC Mining": prePlayASICMining,
}

var SubtypeMiningFuncPostPlayMapping = map[string]func(*State, Card, Move){
  "CPU Mining":  postPlayCPUMining,
  "GPU Mining":  postPlayGPUMining,
  "ASIC Mining": postPlayASICMining,
}

var SubtypeMiningContainerFuncPreRemoveMapping = map[string]func(*State, Card, Move) error{
  "Computer Case Mining Container": preRemoveComputerCaseMiningContainer,
  "Rig Mining Container":           preRemoveRigMiningContainer,
  "ASIC Mining Container":          preRemoveASICMiningContainer,
}

var SubtypeMiningContainerFuncPostRemoveMapping = map[string]func(*State, Card, Move){
  "Computer Case Mining Container": postRemoveComputerCaseMiningContainer,
  "Rig Mining Container":           postRemoveRigMiningContainer,
  "ASIC Mining Container":          postRemoveASICMiningContainer,
}

var SubtypeMiningFuncPreRemoveMapping = map[string]func(*State, Card, Move) error{
  "CPU Mining":  preRemoveCPUMining,
  "GPU Mining":  preRemoveGPUMining,
  "ASIC Mining": preRemoveASICMining,
}

var SubtypeMiningFuncPostRemoveMapping = map[string]func(*State, Card, Move){
  "CPU Mining":  postRemoveCPUMining,
  "GPU Mining":  postRemoveGPUMining,
  "ASIC Mining": postRemoveASICMining,
}

var SubtypePersonFuncPlayMapping = map[string]func(*State, Card, Move){
  "Developer Bonus":                       postPlayDeveloperBonus,
  "Project Time Decrease":                 postPlayProjectTimeDecrease,
  "Funds Each Block Bonus":                postPlayFundsEachBlockBonus,
  "Prediction Market Participation Bonus": postPlayPredictionMarketParticipationBonus,
  "Boost Mining Efficiency On Location":   postPlayBoostMiningEfficiencyOnLocation,
}

var SubtypePersonFuncPreRemoveMapping = map[string]func(*State, Card, Move) error{
  "Developer Bonus":                       preRemoveDeveloperBonus,
  "Project Time Decrease":                 preRemovePlayProjectTimeDecrease,
  "Funds Each Block Bonus":                preRemoveFundsEachBlockBonus,
  "Prediction Market Participation Bonus": preRemovePredictionMarketParticipationBonus,
  "Boost Mining Efficiency On Location":   preRemoveBoostMiningEfficiencyOnLocation,
}

var SubtypePersonFuncPostRemoveMapping = map[string]func(*State, Card, Move){
  "Developer Bonus":                       postRemoveDeveloperBonus,
  "Project Time Decrease":                 postRemovePlayProjectTimeDecrease,
  "Funds Each Block Bonus":                postRemoveFundsEachBlockBonus,
  "Prediction Market Participation Bonus": postRemovePredictionMarketParticipationBonus,
  "Boost Mining Efficiency On Location":   postRemoveBoostMiningEfficiencyOnLocation,
}

var SubtypeMiscFuncPostPlayMapping = map[string]func(*State, Card, Move){
  "Power Rent":        postPlayPowerRent,
  "Developer Booster": postPlayDeveloperBooster,
  "Space Rent":        postPlaySpaceRent,
}

var SubtypeMiscFuncPreRemoveMapping = map[string]func(*State, Card, Move) error{
  "Power Rent":        preRemovePowerRent,
  "Developer Booster": preRemoveDeveloperBooster,
  "Space Rent":        preRemoveSpaceRent,
}

var SubtypeMiscFuncPostRemoveMapping = map[string]func(*State, Card, Move){
  "Power Rent":        postRemovePowerRent,
  "Developer Booster": postRemoveDeveloperBooster,
  "Space Rent":        postRemoveSpaceRent,
}

var SubtypeProjectFuncFinishPlayMapping = map[string]func(*State, Card, Move){
  "Day Trading":                     postPlayDayTrading,
  "Funds Each Block Bonus":          postPlayFundsEachBlockBonus,
  "Boost Mining Efficiency":         postPlayBoostMiningEfficiency,
  "Prediction Market Participation": postPlayPredicationMarketParticipation,
  "Power Rent":                      postPlayRentPower,
  "Funds Bonus":                     postPlayFundsBonus,
  "Project Time Decrease":           postPlayProjectTimeDecrease,
}

var NotEnoughFundsError = errors.New("not enough funds")
var NotEnoughExperienceError = errors.New("not enough experience")
var NotEnoughDevelopmentError = errors.New("not enough development")
var NotEnoughPowerError = errors.New("not enough power")
var NotEnoughSpaceError = errors.New("not enough space")
var UnableToLevelCardError = errors.New("unable to level card")
var LocationNotEmpty = errors.New("location not empty")
var ComputerCaseNotEmpty = errors.New("computer case not empty")
var RigCaseNotEmpty = errors.New("rig not empty")
var MountCaseNotEmpty = errors.New("mount not empty")
var CPUMinerNotFound = errors.New("CPU miner not found")
var GPUMinerNotFound = errors.New("GPU miner not found")
var ASICMinerNotFound = errors.New("ASIC miner not found")
var PersonNotFound = errors.New("person not found")
var PowerNotFound = errors.New("power not found")
var PowerRentNotFound = errors.New("power rent not found")
var DeveloperBoosterNotFound = errors.New("developer booster not found")
var SpaceRentNotFound = errors.New("space rent not found")
var ProjectNotFound = errors.New("project not found")
var DevelopersInUseError = errors.New("developers in use")

var LocationExists = errors.New("location exists")

var cards map[uint]map[uint]Card
var levels []Level

type Card struct {
  Id      uint   `json:"id"`
  Type    string `json:"type"`
  Subtype string `json:"subtype"`
  Level   uint   `json:"level"`
  Costs   Costs  `json:"cost"`
  Gains   Gains  `json:"values"`
}

type Costs struct {
  Development    uint `json:"development"`
  Funds          uint `json:"funds"`
  Level          uint `json:"level"`
  Power          uint `json:"power"`
  Space          uint `json:"space"`
  ContainerSpace uint `json:"containerSpace"`
  Time           uint `json:"time"`
}

type Gains struct {
  Development     uint `json:"development"`
  Funds           uint `json:"funds"`
  MultiplierDev   uint `json:"multiplierDev"`
  MultiplierFunds uint `json:"multiplierFunds"`
  MultiplierTime  uint `json:"multiplierTime"`
  Power           uint `json:"power"`
  Space           uint `json:"space"`
  ContainerSpace  uint `json:"containerSpace"`
  Xp              uint `json:"xp"`
}

func (card *Card) isLocation() bool {
  return card.Type == "Location"
}

func (card *Card) isContainer() bool {
  return card.Type == "Container"
}

func (card *Card) isMining() bool {
  return card.Type == "Mining"
}

func (card *Card) isProject() bool {
  return card.Type == "Project"
}

type Level struct {
  Level  uint `json:"level"`
  Exp    uint `json:"exp"`
  Change uint `json:"change"`
}

func getCard(id uint, level uint) Card {
  if len(cards) == 0 {
    raw, _ := ioutil.ReadFile("./constants/cards.json")
    json.Unmarshal(raw, &cards)

    for i := 0; i < len(cards); i++ {
      for j := 1; j < len(cards[uint(i)]); j++ {
        card := cards[uint(i)][uint(j)]
        card.Level -= levelOffset
        cards[uint(i)][card.Level] = card
      }

      delete(cards[uint(i)], uint(len(cards[uint(i)]) - 1))
    }
  }

  return cards[id][level]
}
func getLevel(experience uint) uint {
  if len(levels) == 0 {
    raw, _ := ioutil.ReadFile("./constants/levels.json")
    json.Unmarshal(raw, &levels)
  }

  for i := 0; i < len(levels); i++ {
    if levels[i].Exp > experience {
      return levels[i-1].Level
    }
  }

  return levels[len(levels)-1].Level
}
func updateProjects(state *State, move Move) {
  for i := 0; i < len(state.Projects); i++ {
    if state.Projects[i].Exists > 0 {
      if state.Projects[i].TimeLeft == 0 {
        continue
      }
      if state.Projects[i].TimeLeft > move.BlockDifference {
        state.Projects[i].TimeLeft -= move.BlockDifference
      } else {
        card := getCard(state.Projects[i].Card, state.Projects[i].Level)
        SubtypeProjectFuncFinishPlayMapping[card.Subtype](state, card, move)
        state.Projects[i].TimeLeft = 0
        state.Funds += card.Gains.Funds
        state.Experience += card.Gains.Xp
        state.CurrentCardsCount[card.Id]--
      }
    }
  }
}
func playCard(state *State, move Move) error {
  state.Level = getLevel(state.Experience)
  card := getCard(move.Card, move.Level)

  err := typeFuncPrePlayMapping[card.Type](state, card, move)
  if err != nil {
    return err
  }

  err = requirePlayCosts(state, card, move)
  if err != nil {
    return err
  }

  costs(state, card, move)
  if !card.isProject() {
    gains(state, card, move)
  }

  typeFuncPostPlayMapping[card.Type](state, card, move)

  state.CurrentCardsCount[card.Id]++
  if state.CurrentCardsCount[card.Id] > state.MaximumCardsCount[card.Id] {
    state.MaximumCardsCount[card.Id] = state.CurrentCardsCount[card.Id]
  }

  return nil
}

func removeCard(state *State, move Move) error {
  state.Level = getLevel(state.Experience)
  card := getCard(move.Card, move.Level)

  err := typeFuncPreRemoveMapping[card.Type](state, card, move)
  if err != nil {
    return err
  }

  removeGains(state, card, move)
  typeFuncRemoveMapping[card.Type](state, card, move)

  state.CurrentCardsCount[card.Id]--

  return nil
}

func prePlayLocation(state *State, card Card, move Move) error {
  if state.Locations[move.Location].Exists > 0 {
    return LocationExists
  }
  return nil
}

func prePlayMiningContainer(state *State, card Card, move Move) error { return nil }
func prePlayMining(state *State, card Card, move Move) error {
  return SubtypeMiningFuncPrePlayMapping[card.Subtype](state, card, move)
}
func prePlayCPUMining(state *State, card Card, move Move) error {
  if card.Level > 0 {
    if state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
      return UnableToLevelCardError
    }
    state.Locations[move.Location].NumberOfCards--
  }

  return nil
}
func prePlayGPUMining(state *State, card Card, move Move) error {
  if card.Level > 0 {
    if move.GpuOption {
      if state.Locations[move.Location].RigCases[move.ContainerIndex].Count[card.Id-rigCaseMinersOffset][card.Level] == 0 {
        return UnableToLevelCardError
      }
    } else {
      if state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
        return UnableToLevelCardError
      }
    }
    state.Locations[move.Location].NumberOfCards--
  }

  return nil
}
func prePlayASICMining(state *State, card Card, move Move) error {
  if card.Level > 0 {
    if state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[card.Level] == 0 {
      return UnableToLevelCardError
    }
    state.Locations[move.Location].NumberOfCards--
  }

  return nil
}
func prePlayPerson(state *State, card Card, move Move) error {
  if card.Level == 0 {
    return nil
  }
  if card.Level > 0 {
    for _, person := range state.Locations[move.Location].People {
      if person.Card == card.Id && person.Count[card.Level] > 0 {
        state.Locations[move.Location].NumberOfCards--
        return nil
      }
    }
  }
  return UnableToLevelCardError
}
func prePlayPower(state *State, card Card, move Move) error {
  if card.Level == 0 {
    return nil
  }
  if card.Level > 0 {
    for _, power := range state.Locations[move.Location].Powers {
      if power.Card == card.Id && power.Count[card.Level] > 0 {
        state.Locations[move.Location].NumberOfCards--
        return nil
      }
    }
  }

  return UnableToLevelCardError
}
func prePlayMisc(state *State, card Card, move Move) error { return nil }
func prePlayProject(state *State, card Card, move Move) error {
  if card.Level == 0 {
    return nil
  }
  if card.Level > 0 {
    for _, project := range state.Projects {
      if project.Card == card.Id && project.Level == card.Level && project.TimeLeft == 0 {
        state.Locations[move.Location].NumberOfCards--
        return nil
      }
    }
  }

  return UnableToLevelCardError
}

func postPlayLocation(state *State, card Card, move Move) {
  state.Locations[move.Location].Card = card.Id
  state.Locations[move.Location].Exists = 1
}

func postPlayMiningContainer(state *State, card Card, move Move) {
  SubtypeMiningContainerFuncPostPlayMapping[card.Subtype](state, card, move)
}
func postPlayComputerCaseMiningContainer(state *State, card Card, move Move) {
  state.Locations[move.Location].ComputerCases = append(state.Locations[move.Location].ComputerCases, ComputerCase{})
  state.Locations[move.Location].NumberOfCards++
}
func postPlayRigMiningContainer(state *State, card Card, move Move) {
  state.Locations[move.Location].RigCases = append(state.Locations[move.Location].RigCases, RigCase{})
  state.Locations[move.Location].NumberOfCards++
}
func postPlayASICMiningContainer(state *State, card Card, move Move) {
  if card.Level > 0 {
    state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[card.Level]--
  }

  state.Locations[move.Location].AsicCases = append(state.Locations[move.Location].AsicCases, MountCase{})
  state.Locations[move.Location].NumberOfCards++
}
func postPlayMining(state *State, card Card, move Move) {
  SubtypeMiningFuncPostPlayMapping[card.Subtype](state, card, move)
}

func postPlayCPUMining(state *State, card Card, move Move) {
  if card.Level > 0 {
    state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]--
  }

  state.CpuCount++
  state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]++
  state.Locations[move.Location].NumberOfCards++
}
func postPlayGPUMining(state *State, card Card, move Move) {
  if card.Level > 0 {
    if move.GpuOption {
      state.Locations[move.Location].RigCases[move.ContainerIndex].Count[card.Id-rigCaseMinersOffset][card.Level]--
    } else {
      state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]--
    }
  }

  if move.GpuOption {
    state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-rigCaseMinersOffset][card.Level]++
  } else {
    state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]++
  }
  state.GpuCount++
  state.Locations[move.Location].NumberOfCards++
}
func postPlayASICMining(state *State, card Card, move Move) {
  state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[card.Level]++
  state.Locations[move.Location].NumberOfCards++
}
func postPlayPerson(state *State, card Card, move Move) {
  if card.Level > 0 {
    for i, person := range state.Locations[move.Location].People {
      if person.Card == card.Id && person.Count[card.Level] > 0 {
        state.Locations[move.Location].People = append(
          state.Locations[move.Location].People[:i],
          state.Locations[move.Location].People[i+1:]...
        )
        break
      }
    }
  }

  for i := 0; i < len(state.Locations[move.Location].People); i++ {
    if state.Locations[move.Location].People[i].Card == card.Id {
      state.Locations[move.Location].People[i].Count[card.Level]++
      return
    }
  }

  person := Person{}
  person.Card = card.Id
  person.Count[card.Level] += 1
  state.Locations[move.Location].People = append(state.Locations[move.Location].People, person)
  state.Locations[move.Location].NumberOfCards++

  if card.Subtype != "-" {
    SubtypePersonFuncPlayMapping[card.Subtype](state, card, move)
  }
}
func postPlayDeveloperBonus(state *State, card Card, move Move) {
  state.Locations[move.Location].DevelopmentPercentageBonus = uint(math.Floor(
    float64((100+state.Locations[move.Location].DevelopmentPercentageBonus)*(100+card.Gains.MultiplierDev)) / float64(10000)))
  diff := (100+state.Locations[move.Location].DevelopmentPercentageBonus)*state.Locations[move.Location].Development -
    state.Locations[move.Location].DevelopmentBonus
  state.DevelopmentLeft += diff
  state.Locations[move.Location].DevelopmentBonus += diff
}
func postPlayProjectTimeDecrease(state *State, card Card, move Move) {
  state.ProjectTimePercentageDecrease = uint(math.Ceil(
    float64((100-state.ProjectTimePercentageDecrease)*(100-card.Gains.MultiplierTime)) / float64(10000)))
}
func postPlayFundsEachBlockBonus(state *State, card Card, move Move) {
  state.FundsPerBlock += card.Gains.MultiplierFunds
}
func postPlayPredictionMarketParticipationBonus(state *State, card Card, move Move) {
  state.PredictionMarketParticipationBonus += 2
}
func postPlayBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) {
  state.Locations[move.Location].MiningPercentageBonus = uint(math.Floor(
    float64((100+state.Locations[move.Location].MiningPercentageBonus)*(100+card.Gains.MultiplierFunds)) / float64(10000)))
  diff := (100+state.Locations[move.Location].MiningPercentageBonus)*state.Locations[move.Location].Mining -
    state.Locations[move.Location].MiningBonus
  state.FundsPerBlock += diff
  state.Locations[move.Location].MiningBonus += diff
}

func postPlayPower(state *State, card Card, move Move) {
  if card.Level > 0 {
    for i, power := range state.Locations[move.Location].Powers {
      if power.Card == card.Id && power.Count[card.Level] > 0 {
        state.Locations[move.Location].Powers = append(
          state.Locations[move.Location].Powers[:i],
          state.Locations[move.Location].Powers[i+1:]...
        )
        break
      }
    }
  }

  for i := 0; i < len(state.Locations[move.Location].Powers); i++ {
    if state.Locations[move.Location].Powers[i].Card == card.Id {
      state.Locations[move.Location].Powers[i].Count[card.Level]++
      return
    }
  }

  power := Power{}
  power.Card = card.Id
  power.Count[card.Level] = 1
  state.Locations[move.Location].Powers = append(state.Locations[move.Location].Powers, power)
  state.Locations[move.Location].NumberOfCards++
}

func postPlayMisc(state *State, card Card, move Move) {
  SubtypeMiscFuncPostPlayMapping[card.Subtype](state, card, move)
}
func postPlayPowerRent(state *State, card Card, move Move) {
  state.Locations[move.Location].SpaceRenting = 1
  state.FundsPerBlock += state.Locations[move.Location].SpaceLeft * card.Gains.MultiplierFunds
}
func postPlayDeveloperBooster(state *State, card Card, move Move) {
  state.FundsPerBlock += card.Gains.MultiplierFunds
  state.Locations[move.Location].CoffeeMiner = 1
  postPlayDeveloperBonus(state, card, move)
}
func postPlaySpaceRent(state *State, card Card, move Move) {
  state.Locations[move.Location].PowerRenting = 1
  state.FundsPerBlock += state.Locations[move.Location].PowerLeft * card.Gains.MultiplierFunds
}
func postPlayProject(state *State, card Card, move Move) {
  for i := 0; i < len(state.Projects); i++ {
    if state.Projects[i].Exists == 0 {
      state.Projects[i].Exists = 1
      state.Projects[i].Card = card.Id
      state.Projects[i].Level = card.Level
      state.Projects[i].TimeLeft = card.Costs.Time

      return
    }
  }
}
func postPlayDayTrading(state *State, card Card, move Move) {
  state.Funds += state.DayTradingBonus
}
func postPlayBoostMiningEfficiency(state *State, card Card, move Move) {
  for i := 0; i < len(state.Locations); i++ {
    if state.Locations[i].Exists > 0 {
      postPlayBoostMiningEfficiencyOnLocation(state, card, move)
    }
  }
}
func postPlayPredicationMarketParticipation(state *State, card Card, move Move) {
  state.Funds += state.PredictionMarketParticipationBonus
}
func postPlayRentPower(state *State, card Card, move Move) {
  state.Funds += card.Gains.MultiplierFunds/3*state.CpuCount + card.Gains.MultiplierFunds*state.GpuCount
}
func postPlayFundsBonus(state *State, card Card, move Move) {
  state.Funds += uint(math.Ceil(float64(card.Gains.MultiplierFunds*state.Funds) / float64(100)))
}

func preRemoveLocation(state *State, card Card, move Move) error {
  if state.Locations[move.Location].Card == card.Id && state.Locations[move.Location].NumberOfCards > 0 {
    return LocationNotEmpty
  }
  return nil
}
func preRemoveMiningContainer(state *State, card Card, move Move) error {
  return SubtypeMiningContainerFuncPreRemoveMapping[card.Subtype](state, card, move)
}
func preRemoveComputerCaseMiningContainer(state *State, card Card, move Move) error {
  for i := 0; i < computerCaseMinersCount; i++ {
    for j := 0; j < computerCaseMinersLevelCount; j++ {
      if state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[i][j] > 0 {
        return ComputerCaseNotEmpty
      }
    }
  }
  return nil
}
func preRemoveRigMiningContainer(state *State, card Card, move Move) error {
  for i := 0; i < rigCaseMinersCount; i++ {
    for j := 0; j < rigCaseMinersLevelCount; j++ {
      if state.Locations[move.Location].RigCases[move.ContainerIndex].Count[i][j] > 0 {
        return RigCaseNotEmpty
      }
    }
  }
  return nil
}
func preRemoveASICMiningContainer(state *State, card Card, move Move) error {
  for i := 0; i < asicCaseLevelCount; i++ {
    if state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[i] > 0 {
      return MountCaseNotEmpty
    }
  }
  return nil
}
func preRemoveMining(state *State, card Card, move Move) error {
  return SubtypeMiningFuncPreRemoveMapping[card.Subtype](state, card, move)
}
func preRemoveCPUMining(state *State, card Card, move Move) error {
  if state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
    return CPUMinerNotFound
  }
  return nil
}
func preRemoveGPUMining(state *State, card Card, move Move) error {
  if move.GpuOption {
    if state.Locations[move.Location].RigCases[move.ContainerIndex].Count[card.Id-rigCaseMinersOffset][card.Level] == 0 {
      return GPUMinerNotFound
    }
  } else {
    if state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
      return GPUMinerNotFound
    }
  }
  return nil
}
func preRemoveASICMining(state *State, card Card, move Move) error {
  if state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[card.Level] == 0 {
    return ASICMinerNotFound
  }
  return nil
}
func preRemovePerson(state *State, card Card, move Move) error {
  for _, person := range state.Locations[move.Location].People {
    if person.Card == card.Id && person.Count[card.Level] > 0 {
      if (state.Locations[move.Location].DevelopmentPercentageBonus != 0 &&
        state.DevelopmentLeft < uint(math.Ceil(float64(card.Gains.Development)*float64(state.Locations[move.Location].DevelopmentPercentageBonus)))) ||
        ((state.Locations[move.Location].DevelopmentPercentageBonus == 0) && state.DevelopmentLeft < card.Gains.Development) {
        return DevelopersInUseError
      }

      if card.Subtype != "-" {
        return SubtypePersonFuncPreRemoveMapping[card.Type](state, card, move)
      }
    }
  }

  return PersonNotFound
}
func preRemoveDeveloperBonus(state *State, card Card, move Move) error {
  if state.DevelopmentLeft < uint(math.Ceil(float64((100+state.Locations[move.Location].DevelopmentPercentageBonus)*100) /
    float64(100+card.Gains.MultiplierDev))) * (state.Locations[move.Location].Development - card.Gains.Development) {
    return DevelopersInUseError
  }

  return nil
}
func preRemovePlayProjectTimeDecrease(state *State, card Card, move Move) error            { return nil }
func preRemoveFundsEachBlockBonus(state *State, card Card, move Move) error                { return nil }
func preRemovePredictionMarketParticipationBonus(state *State, card Card, move Move) error { return nil }
func preRemoveBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) error    { return nil }
func preRemovePower(state *State, card Card, move Move) error {
  for _, power := range state.Locations[move.Location].Powers {
    if power.Card == card.Id && power.Count[card.Level] > 0 {
      return nil
    }
  }

  return PowerNotFound
}
func preRemoveMisc(state *State, card Card, move Move) error {
  return SubtypeMiscFuncPreRemoveMapping[card.Subtype](state, card, move)
}

func preRemovePowerRent(state *State, card Card, move Move) error {
  if state.Locations[move.Location].PowerRenting == 0 {
    return PowerRentNotFound
  }

  return nil
}
func preRemoveDeveloperBooster(state *State, card Card, move Move) error {
  if state.Locations[move.Location].CoffeeMiner == 0 {
    return DeveloperBoosterNotFound
  }

  return nil
}
func preRemoveSpaceRent(state *State, card Card, move Move) error {
  if state.Locations[move.Location].SpaceRenting == 0 {
    return SpaceRentNotFound
  }

  return nil
}

func preRemoveProject(state *State, card Card, move Move) error {
  for i := 0; i < len(state.Projects); i++ {
    if state.Projects[i].Card == card.Id && state.Projects[i].Level == card.Level && state.Projects[i].TimeLeft == 0 {
      return nil
    }
  }

  return ProjectNotFound
}

func postRemoveLocation(state *State, card Card, move Move) {
  state.Locations[move.Location].Card = 0
  state.Locations[move.Location].Exists = 0
}
func postRemoveMiningContainer(state *State, card Card, move Move) {
  SubtypeMiningContainerFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemoveComputerCaseMiningContainer(state *State, card Card, move Move) {
  state.Locations[move.Location].ComputerCases = append(
    state.Locations[move.Location].ComputerCases[:move.ContainerIndex],
    state.Locations[move.Location].ComputerCases[move.ContainerIndex+1:]...
  )
}
func postRemoveRigMiningContainer(state *State, card Card, move Move) {
  state.Locations[move.Location].RigCases = append(
    state.Locations[move.Location].RigCases[:move.ContainerIndex],
    state.Locations[move.Location].RigCases[move.ContainerIndex+1:]...
  )
}
func postRemoveASICMiningContainer(state *State, card Card, move Move) {
  state.Locations[move.Location].AsicCases = append(
    state.Locations[move.Location].AsicCases[:move.ContainerIndex],
    state.Locations[move.Location].AsicCases[move.ContainerIndex+1:]...
  )
}
func postRemoveMining(state *State, card Card, move Move) {
  SubtypeMiningFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemoveCPUMining(state *State, card Card, move Move) {
  state.CpuCount--
  state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]--
}
func postRemoveGPUMining(state *State, card Card, move Move) {
  if move.GpuOption {
    state.Locations[move.Location].RigCases[move.ContainerIndex].Count[card.Id-rigCaseMinersOffset][card.Level]--
  } else {
    state.Locations[move.Location].ComputerCases[move.ContainerIndex].Count[card.Id-computerCaseMinersOffset][card.Level]--
  }
  state.GpuCount--
}
func postRemoveASICMining(state *State, card Card, move Move) {
  state.Locations[move.Location].AsicCases[move.ContainerIndex].Count[card.Level]--
}
func postRemovePerson(state *State, card Card, move Move) {
  for i, person := range state.Locations[move.Location].People {
    if person.Card == card.Id && person.Count[card.Level] > 0 {
      state.Locations[move.Location].People = append(
        state.Locations[move.Location].People[:i],
        state.Locations[move.Location].People[i+1:]...
      )

      if card.Subtype != "-" {
        SubtypePersonFuncPostRemoveMapping[card.Subtype](state, card, move)
      }
      return
    }
  }
}
func postRemoveDeveloperBonus(state *State, card Card, move Move) {
  developmentDiff := state.Locations[move.Location].Development - card.Gains.Development
  developmentPercentageDiff := 100 + state.Locations[move.Location].DevelopmentPercentageBonus - uint(math.Ceil(
    float64((100+state.Locations[move.Location].DevelopmentPercentageBonus)*100)/float64(100+card.Gains.MultiplierDev)))

  state.Locations[move.Location].DevelopmentPercentageBonus -= developmentPercentageDiff
  state.Locations[move.Location].Development -= developmentDiff
  state.DevelopmentLeft -= developmentPercentageDiff * developmentDiff
}
func postRemovePlayProjectTimeDecrease(state *State, card Card, move Move) {
  state.ProjectTimePercentageDecrease -= card.Gains.MultiplierFunds
}
func postRemoveFundsEachBlockBonus(state *State, card Card, move Move) {
  state.FundsPerBlock -= card.Gains.Funds
}
func postRemovePredictionMarketParticipationBonus(state *State, card Card, move Move) {
  state.PredictionMarketParticipationBonus -= card.Gains.MultiplierFunds
}
func postRemoveBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) {}
func postRemovePower(state *State, card Card, move Move) {
  for i, power := range state.Locations[move.Location].Powers {
    if power.Card == card.Id && power.Count[card.Level] > 0 {
      state.Locations[move.Location].Powers = append(
        state.Locations[move.Location].Powers[:i],
        state.Locations[move.Location].Powers[i+1:]...
      )
      return
    }
  }
}
func postRemoveMisc(state *State, card Card, move Move) {
  SubtypeMiscFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemovePowerRent(state *State, card Card, move Move) {
  state.FundsPerBlock -= card.Gains.MultiplierFunds * state.Locations[move.Location].PowerLeft
  state.Locations[move.Location].PowerRenting = 0
}
func postRemoveDeveloperBooster(state *State, card Card, move Move) {
  state.FundsPerBlock -= card.Gains.MultiplierFunds
  postRemoveDeveloperBonus(state, card, move)
}
func postRemoveSpaceRent(state *State, card Card, move Move) {
  state.FundsPerBlock -= card.Gains.MultiplierFunds * state.Locations[move.Location].SpaceLeft
  state.Locations[move.Location].SpaceRenting = 0
}

func postRemoveProject(state *State, card Card, move Move) {
  for i := 0; i < len(state.Projects); i++ {
    if state.Projects[i].Card == card.Id && state.Projects[i].Level == card.Level && state.Projects[i].TimeLeft == 0 {
      state.Projects[i].Exists = 0
    }
  }
}

func requirePlayCosts(state *State, card Card, move Move) error {
  if card.Costs.Level > state.Level {
    return NotEnoughExperienceError
  }

  if card.Costs.Funds > state.Funds {
    return NotEnoughFundsError
  }

  if card.Costs.Development > state.DevelopmentLeft {
    return NotEnoughDevelopmentError
  }

  if !card.isLocation() && !card.isProject() && card.Costs.Space > state.Locations[move.Location].SpaceLeft {
    return NotEnoughSpaceError
  }

  if !card.isLocation() && !card.isProject() && card.Costs.Power > state.Locations[move.Location].PowerLeft {
    return NotEnoughPowerError
  }

  return nil
}

func costs(state *State, card Card, move Move) {
  state.Funds -= card.Costs.Funds
  state.DevelopmentLeft -= card.Costs.Development
  if !card.isLocation() && !card.isProject() {
    state.Locations[move.Location].SpaceLeft -= card.Costs.Space
    state.Locations[move.Location].PowerLeft -= card.Costs.Power
  }
}

func gains(state *State, card Card, move Move) {
  state.Funds += card.Gains.Funds
  state.Experience += card.Gains.Xp
  state.DevelopmentLeft += card.Gains.Development
  state.Locations[move.Location].SpaceLeft += card.Gains.Space
  state.Locations[move.Location].PowerLeft += card.Gains.Power
}

func removeGains(state *State, card Card, move Move) {
  state.DevelopmentLeft -= card.Gains.Development
  state.Locations[move.Location].SpaceLeft -= card.Gains.Space
  state.Locations[move.Location].PowerLeft -= card.Gains.Power
}
