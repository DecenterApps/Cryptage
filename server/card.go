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
  for i := 0; i < len(state.projects); i++ {
    if state.projects[i].exists > 0 {
      if state.projects[i].timeLeft == 0 {
        continue
      }
      if state.projects[i].timeLeft > move.blockDifference {
        state.projects[i].timeLeft -= move.blockDifference
      } else {
        card := getCard(state.projects[i].card, state.projects[i].level)
        SubtypeProjectFuncFinishPlayMapping[card.Subtype](state, card, move)
        state.projects[i].timeLeft = 0
        state.funds += card.Gains.Funds
        state.experience += card.Gains.Xp
        state.currentCardsCount[card.Id]--
      }
    }
  }
}
func playCard(state *State, move Move) error {
  state.level = getLevel(state.experience)
  card := getCard(move.card, move.level)

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

  state.currentCardsCount[card.Id]++
  if state.currentCardsCount[card.Id] > state.maximumCardsCount[card.Id] {
    state.maximumCardsCount[card.Id] = state.currentCardsCount[card.Id]
  }

  return nil
}

func removeCard(state *State, move Move) error {
  state.level = getLevel(state.experience)
  card := getCard(move.card, move.level)

  err := typeFuncPreRemoveMapping[card.Type](state, card, move)
  if err != nil {
    return err
  }

  removeGains(state, card, move);
  typeFuncRemoveMapping[card.Type](state, card, move)

  state.currentCardsCount[card.Id]--

  return nil
}

func prePlayLocation(state *State, card Card, move Move) error {
  if state.locations[move.location].exists > 0 {
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
    if state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
      return UnableToLevelCardError
    }
    state.locations[move.location].numberOfCards--
  }

  return nil
}
func prePlayGPUMining(state *State, card Card, move Move) error {
  if card.Level > 0 {
    if move.gpuOption {
      if state.locations[move.location].rigCases[move.containerIndex].count[card.Id-rigCaseMinersOffset][card.Level] == 0 {
        return UnableToLevelCardError
      }
    } else {
      if state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
        return UnableToLevelCardError
      }
    }
    state.locations[move.location].numberOfCards--
  }

  return nil
}
func prePlayASICMining(state *State, card Card, move Move) error {
  if card.Level > 0 {
    if state.locations[move.location].asicCases[move.containerIndex].count[card.Level] == 0 {
      return UnableToLevelCardError
    }
    state.locations[move.location].numberOfCards--
  }

  return nil
}
func prePlayPerson(state *State, card Card, move Move) error {
  if card.Level == 0 {
    return nil
  }
  if card.Level > 0 {
    for _, person := range state.locations[move.location].people {
      if person.card == card.Id && person.count[card.Level] > 0 {
        state.locations[move.location].numberOfCards--
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
    for _, power := range state.locations[move.location].powers {
      if power.card == card.Id && power.count[card.Level] > 0 {
        state.locations[move.location].numberOfCards--
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
    for _, project := range state.projects {
      if project.card == card.Id && project.level == card.Level && project.timeLeft == 0 {
        state.locations[move.location].numberOfCards--
        return nil
      }
    }
  }

  return UnableToLevelCardError
}

func postPlayLocation(state *State, card Card, move Move) {
  state.locations[move.location].card = card.Id
  state.locations[move.location].exists = 1
}

func postPlayMiningContainer(state *State, card Card, move Move) {
  SubtypeMiningContainerFuncPostPlayMapping[card.Subtype](state, card, move)
}
func postPlayComputerCaseMiningContainer(state *State, card Card, move Move) {
  state.locations[move.location].computerCases = append(state.locations[move.location].computerCases, ComputerCase{})
  state.locations[move.location].numberOfCards++
}
func postPlayRigMiningContainer(state *State, card Card, move Move) {
  state.locations[move.location].rigCases = append(state.locations[move.location].rigCases, RigCase{})
  state.locations[move.location].numberOfCards++
}
func postPlayASICMiningContainer(state *State, card Card, move Move) {
  if card.Level > 0 {
    state.locations[move.location].asicCases[move.containerIndex].count[card.Level]--
  }

  state.locations[move.location].asicCases = append(state.locations[move.location].asicCases, MountCase{})
  state.locations[move.location].numberOfCards++
}
func postPlayMining(state *State, card Card, move Move) {
  SubtypeMiningFuncPostPlayMapping[card.Subtype](state, card, move)
}

func postPlayCPUMining(state *State, card Card, move Move) {
  if card.Level > 0 {
    state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]--
  }

  state.cpuCount++
  state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]++
  state.locations[move.location].numberOfCards++
}
func postPlayGPUMining(state *State, card Card, move Move) {
  if card.Level > 0 {
    if move.gpuOption {
      state.locations[move.location].rigCases[move.containerIndex].count[card.Id-rigCaseMinersOffset][card.Level]--
    } else {
      state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]--
    }
  }

  if move.gpuOption {
    state.locations[move.location].computerCases[move.containerIndex].count[card.Id-rigCaseMinersOffset][card.Level]++
  } else {
    state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]++
  }
  state.gpuCount++
  state.locations[move.location].numberOfCards++
}
func postPlayASICMining(state *State, card Card, move Move) {
  state.locations[move.location].asicCases[move.containerIndex].count[card.Level]++
  state.locations[move.location].numberOfCards++
}
func postPlayPerson(state *State, card Card, move Move) {
  if card.Level > 0 {
    for i, person := range state.locations[move.location].people {
      if person.card == card.Id && person.count[card.Level] > 0 {
        state.locations[move.location].people = append(
          state.locations[move.location].people[:i],
          state.locations[move.location].people[i+1:]...
        )
        break
      }
    }
  }

  for i := 0; i < len(state.locations[move.location].people); i++ {
    if state.locations[move.location].people[i].card == card.Id {
      state.locations[move.location].people[i].count[card.Level]++
      return
    }
  }

  person := Person{}
  person.card = card.Id
  person.count[card.Level] += 1
  state.locations[move.location].people = append(state.locations[move.location].people, person)
  state.locations[move.location].numberOfCards++

  if card.Subtype != "-" {
    SubtypePersonFuncPlayMapping[card.Subtype](state, card, move)
  }
}
func postPlayDeveloperBonus(state *State, card Card, move Move) {
  state.locations[move.location].developmentPercentageBonus = uint(math.Floor(
    float64((100+state.locations[move.location].developmentPercentageBonus)*(100+card.Gains.MultiplierDev)) / float64(10000)))
  diff := (100+state.locations[move.location].developmentPercentageBonus)*state.locations[move.location].development -
    state.locations[move.location].developmentBonus
  state.developmentLeft += diff
  state.locations[move.location].developmentBonus += diff
}
func postPlayProjectTimeDecrease(state *State, card Card, move Move) {
  state.projectTimePercentageDecrease = uint(math.Ceil(
    float64((100-state.projectTimePercentageDecrease)*(100-card.Gains.MultiplierTime)) / float64(10000)))
}
func postPlayFundsEachBlockBonus(state *State, card Card, move Move) {
  state.fundsPerBlock += card.Gains.MultiplierFunds
}
func postPlayPredictionMarketParticipationBonus(state *State, card Card, move Move) {
  state.predictionMarketParticipationBonus += 2
}
func postPlayBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) {
  state.locations[move.location].miningPercentageBonus = uint(math.Floor(
    float64((100+state.locations[move.location].miningPercentageBonus)*(100+card.Gains.MultiplierFunds)) / float64(10000)))
  diff := (100+state.locations[move.location].miningPercentageBonus)*state.locations[move.location].mining -
    state.locations[move.location].miningBonus
  state.fundsPerBlock += diff
  state.locations[move.location].miningBonus += diff
}

func postPlayPower(state *State, card Card, move Move) {
  if card.Level > 0 {
    for i, power := range state.locations[move.location].powers {
      if power.card == card.Id && power.count[card.Level] > 0 {
        state.locations[move.location].powers = append(
          state.locations[move.location].powers[:i],
          state.locations[move.location].powers[i+1:]...
        )
        break
      }
    }
  }

  for i := 0; i < len(state.locations[move.location].powers); i++ {
    if state.locations[move.location].powers[i].card == card.Id {
      state.locations[move.location].powers[i].count[card.Level]++
      return
    }
  }

  power := Power{}
  power.card = card.Id
  power.count[card.Level] = 1
  state.locations[move.location].powers = append(state.locations[move.location].powers, power)
  state.locations[move.location].numberOfCards++
}

func postPlayMisc(state *State, card Card, move Move) {
  SubtypeMiscFuncPostPlayMapping[card.Subtype](state, card, move)
}
func postPlayPowerRent(state *State, card Card, move Move) {
  state.locations[move.location].spaceRenting = 1
  state.fundsPerBlock += state.locations[move.location].spaceLeft * card.Gains.MultiplierFunds
}
func postPlayDeveloperBooster(state *State, card Card, move Move) {
  state.fundsPerBlock += card.Gains.MultiplierFunds
  state.locations[move.location].coffeeMiner = 1
  postPlayDeveloperBonus(state, card, move)
}
func postPlaySpaceRent(state *State, card Card, move Move) {
  state.locations[move.location].powerRenting = 1
  state.fundsPerBlock += state.locations[move.location].powerLeft * card.Gains.MultiplierFunds
}
func postPlayProject(state *State, card Card, move Move) {
  for i := 0; i < len(state.projects); i++ {
    if state.projects[i].exists == 0 {
      state.projects[i].exists = 1
      state.projects[i].card = card.Id
      state.projects[i].level = card.Level
      state.projects[i].timeLeft = card.Costs.Time

      return
    }
  }
}
func postPlayDayTrading(state *State, card Card, move Move) {
  state.funds += state.dayTradingBonus
}
func postPlayBoostMiningEfficiency(state *State, card Card, move Move) {
  for i := 0; i < len(state.locations); i++ {
    if state.locations[i].exists > 0 {
      postPlayBoostMiningEfficiencyOnLocation(state, card, move)
    }
  }
}
func postPlayPredicationMarketParticipation(state *State, card Card, move Move) {
  state.funds += state.predictionMarketParticipationBonus
}
func postPlayRentPower(state *State, card Card, move Move) {
  state.funds += card.Gains.MultiplierFunds/3*state.cpuCount + card.Gains.MultiplierFunds*state.gpuCount
}
func postPlayFundsBonus(state *State, card Card, move Move) {
  state.funds += uint(math.Ceil(float64(card.Gains.MultiplierFunds*state.funds) / float64(100)))
}

func preRemoveLocation(state *State, card Card, move Move) error {
  if state.locations[move.location].card == card.Id && state.locations[move.location].numberOfCards > 0 {
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
      if state.locations[move.location].computerCases[move.containerIndex].count[i][j] > 0 {
        return ComputerCaseNotEmpty
      }
    }
  }
  return nil
}
func preRemoveRigMiningContainer(state *State, card Card, move Move) error {
  for i := 0; i < rigCaseMinersCount; i++ {
    for j := 0; j < rigCaseMinersLevelCount; j++ {
      if state.locations[move.location].rigCases[move.containerIndex].count[i][j] > 0 {
        return RigCaseNotEmpty
      }
    }
  }
  return nil
}
func preRemoveASICMiningContainer(state *State, card Card, move Move) error {
  for i := 0; i < asicCaseLevelCount; i++ {
    if state.locations[move.location].asicCases[move.containerIndex].count[i] > 0 {
      return MountCaseNotEmpty
    }
  }
  return nil
}
func preRemoveMining(state *State, card Card, move Move) error {
  return SubtypeMiningFuncPreRemoveMapping[card.Subtype](state, card, move)
}
func preRemoveCPUMining(state *State, card Card, move Move) error {
  if state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
    return CPUMinerNotFound
  }
  return nil
}
func preRemoveGPUMining(state *State, card Card, move Move) error {
  if move.gpuOption {
    if state.locations[move.location].rigCases[move.containerIndex].count[card.Id-rigCaseMinersOffset][card.Level] == 0 {
      return GPUMinerNotFound
    }
  } else {
    if state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level] == 0 {
      return GPUMinerNotFound
    }
  }
  return nil
}
func preRemoveASICMining(state *State, card Card, move Move) error {
  if state.locations[move.location].asicCases[move.containerIndex].count[card.Level] == 0 {
    return ASICMinerNotFound
  }
  return nil
}
func preRemovePerson(state *State, card Card, move Move) error {
  for _, person := range state.locations[move.location].people {
    if person.card == card.Id && person.count[card.Level] > 0 {
      if (state.locations[move.location].developmentPercentageBonus != 0 &&
        state.developmentLeft < uint(math.Ceil(float64(card.Gains.Development)*float64(state.locations[move.location].developmentPercentageBonus)))) ||
        ((state.locations[move.location].developmentPercentageBonus == 0) && state.developmentLeft < card.Gains.Development) {
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
  if state.developmentLeft < uint(math.Ceil(float64((100+state.locations[move.location].developmentPercentageBonus)*100) /
    float64(100+card.Gains.MultiplierDev))) * (state.locations[move.location].development - card.Gains.Development) {
    return DevelopersInUseError
  }

  return nil
}
func preRemovePlayProjectTimeDecrease(state *State, card Card, move Move) error            { return nil }
func preRemoveFundsEachBlockBonus(state *State, card Card, move Move) error                { return nil }
func preRemovePredictionMarketParticipationBonus(state *State, card Card, move Move) error { return nil }
func preRemoveBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) error    { return nil }
func preRemovePower(state *State, card Card, move Move) error {
  for _, power := range state.locations[move.location].powers {
    if power.card == card.Id && power.count[card.Level] > 0 {
      return nil
    }
  }

  return PowerNotFound
}
func preRemoveMisc(state *State, card Card, move Move) error {
  return SubtypeMiscFuncPreRemoveMapping[card.Subtype](state, card, move)
}

func preRemovePowerRent(state *State, card Card, move Move) error {
  if state.locations[move.location].powerRenting == 0 {
    return PowerRentNotFound
  }

  return nil
}
func preRemoveDeveloperBooster(state *State, card Card, move Move) error {
  if state.locations[move.location].coffeeMiner == 0 {
    return DeveloperBoosterNotFound
  }

  return nil
}
func preRemoveSpaceRent(state *State, card Card, move Move) error {
  if state.locations[move.location].spaceRenting == 0 {
    return SpaceRentNotFound
  }

  return nil
}

func preRemoveProject(state *State, card Card, move Move) error {
  for i := 0; i < len(state.projects); i++ {
    if state.projects[i].card == card.Id && state.projects[i].level == card.Level && state.projects[i].timeLeft == 0 {
      return nil
    }
  }

  return ProjectNotFound
}

func postRemoveLocation(state *State, card Card, move Move) {
  state.locations[move.location].card = 0
  state.locations[move.location].exists = 0
}
func postRemoveMiningContainer(state *State, card Card, move Move) {
  SubtypeMiningContainerFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemoveComputerCaseMiningContainer(state *State, card Card, move Move) {
  state.locations[move.location].computerCases = append(
    state.locations[move.location].computerCases[:move.containerIndex],
    state.locations[move.location].computerCases[move.containerIndex+1:]...
  )
}
func postRemoveRigMiningContainer(state *State, card Card, move Move) {
  state.locations[move.location].rigCases = append(
    state.locations[move.location].rigCases[:move.containerIndex],
    state.locations[move.location].rigCases[move.containerIndex+1:]...
  )
}
func postRemoveASICMiningContainer(state *State, card Card, move Move) {
  state.locations[move.location].asicCases = append(
    state.locations[move.location].asicCases[:move.containerIndex],
    state.locations[move.location].asicCases[move.containerIndex+1:]...
  )
}
func postRemoveMining(state *State, card Card, move Move) {
  SubtypeMiningFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemoveCPUMining(state *State, card Card, move Move) {
  state.cpuCount--
  state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]--
}
func postRemoveGPUMining(state *State, card Card, move Move) {
  if move.gpuOption {
    state.locations[move.location].rigCases[move.containerIndex].count[card.Id-rigCaseMinersOffset][card.Level]--
  } else {
    state.locations[move.location].computerCases[move.containerIndex].count[card.Id-computerCaseMinersOffset][card.Level]--
  }
  state.gpuCount--
}
func postRemoveASICMining(state *State, card Card, move Move) {
  state.locations[move.location].asicCases[move.containerIndex].count[card.Level]--
}
func postRemovePerson(state *State, card Card, move Move) {
  for i, person := range state.locations[move.location].people {
    if person.card == card.Id && person.count[card.Level] > 0 {
      state.locations[move.location].people = append(
        state.locations[move.location].people[:i],
        state.locations[move.location].people[i+1:]...
      )

      if card.Subtype != "-" {
        SubtypePersonFuncPostRemoveMapping[card.Subtype](state, card, move)
      }
      return
    }
  }
}
func postRemoveDeveloperBonus(state *State, card Card, move Move) {
  developmentDiff := state.locations[move.location].development - card.Gains.Development
  developmentPercentageDiff := 100 + state.locations[move.location].developmentPercentageBonus - uint(math.Ceil(
    float64((100+state.locations[move.location].developmentPercentageBonus)*100)/float64(100+card.Gains.MultiplierDev)))

  state.locations[move.location].developmentPercentageBonus -= developmentPercentageDiff
  state.locations[move.location].development -= developmentDiff
  state.developmentLeft -= developmentPercentageDiff * developmentDiff
}
func postRemovePlayProjectTimeDecrease(state *State, card Card, move Move) {
  state.projectTimePercentageDecrease -= card.Gains.MultiplierFunds
}
func postRemoveFundsEachBlockBonus(state *State, card Card, move Move) {
  state.fundsPerBlock -= card.Gains.Funds
}
func postRemovePredictionMarketParticipationBonus(state *State, card Card, move Move) {
  state.predictionMarketParticipationBonus -= card.Gains.MultiplierFunds
}
func postRemoveBoostMiningEfficiencyOnLocation(state *State, card Card, move Move) {}
func postRemovePower(state *State, card Card, move Move) {
  for i, power := range state.locations[move.location].powers {
    if power.card == card.Id && power.count[card.Level] > 0 {
      state.locations[move.location].powers = append(
        state.locations[move.location].powers[:i],
        state.locations[move.location].powers[i+1:]...
      )
      return
    }
  }
}
func postRemoveMisc(state *State, card Card, move Move) {
  SubtypeMiscFuncPostRemoveMapping[card.Subtype](state, card, move)
}
func postRemovePowerRent(state *State, card Card, move Move) {
  state.fundsPerBlock -= card.Gains.MultiplierFunds * state.locations[move.location].powerLeft
  state.locations[move.location].powerRenting = 0
}
func postRemoveDeveloperBooster(state *State, card Card, move Move) {
  state.fundsPerBlock -= card.Gains.MultiplierFunds
  postRemoveDeveloperBonus(state, card, move)
}
func postRemoveSpaceRent(state *State, card Card, move Move) {
  state.fundsPerBlock -= card.Gains.MultiplierFunds * state.locations[move.location].spaceLeft
  state.locations[move.location].spaceRenting = 0
}

func postRemoveProject(state *State, card Card, move Move) {
  for i := 0; i < len(state.projects); i++ {
    if state.projects[i].card == card.Id && state.projects[i].level == card.Level && state.projects[i].timeLeft == 0 {
      state.projects[i].exists = 0
    }
  }
}

func requirePlayCosts(state *State, card Card, move Move) error {
  if card.Costs.Level > state.level {
    return NotEnoughExperienceError
  }

  if card.Costs.Funds > state.funds {
    return NotEnoughFundsError
  }

  if card.Costs.Development > state.developmentLeft {
    return NotEnoughDevelopmentError
  }

  if !card.isLocation() && !card.isProject() && card.Costs.Space > state.locations[move.location].spaceLeft {
    return NotEnoughSpaceError
  }

  if !card.isLocation() && !card.isProject() && card.Costs.Power > state.locations[move.location].powerLeft {
    return NotEnoughPowerError
  }

  return nil
}

func costs(state *State, card Card, move Move) {
  state.funds -= card.Costs.Funds
  state.developmentLeft -= card.Costs.Development
  if !card.isLocation() && !card.isProject() {
    state.locations[move.location].spaceLeft -= card.Costs.Space
    state.locations[move.location].powerLeft -= card.Costs.Power
  }
}

func gains(state *State, card Card, move Move) {
  state.funds += card.Gains.Funds
  state.experience += card.Gains.Xp
  state.developmentLeft += card.Gains.Development
  state.locations[move.location].spaceLeft += card.Gains.Space
  state.locations[move.location].powerLeft += card.Gains.Power
}

func removeGains(state *State, card Card, move Move) {
  state.developmentLeft -= card.Gains.Development
  state.locations[move.location].spaceLeft -= card.Gains.Space
  state.locations[move.location].powerLeft -= card.Gains.Power
}
