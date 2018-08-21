package main

import (
	"testing"
)

func TestPlayLocation(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	move := Move{Shift: true}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].Card != 0 || state.Locations[0].Exists == 0 {
		t.Fail()
	}
}

func TestPlayExistingLocation(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	move := Move{Shift: true}
	err := playCard(&state, move)

	if err != LocationExists {
		t.Fail()
	}
}

func TestPlayDeveloper(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 12}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].People[0].Card != 12 {
		t.Fail()
	}
}

func TestPlayDeveloperNoFunds(t *testing.T) {
	loadConfig()

	state := State{Funds: 0, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 12}
	err := playCard(&state, move)

	if err != NotEnoughFundsError {
		t.Fail()
	}
}

func TestPlayMiningContainer(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 6}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}
}

func TestPlayMiningContainerNoSpace(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	move := Move{Shift: true, Card: 6}
	err := playCard(&state, move)

	if err != NotEnoughSpaceError {
		t.Fail()
	}
}

func TestPlayComputerCaseMiner(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].PowerLeft = 10
	state.Locations[0].ComputerCases = append(state.Locations[0].ComputerCases, ComputerCase{})
	move := Move{Shift: true, Card: 9}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].ComputerCases[0].Count[0][0] != 1 {
		t.Fail()
	}
}

func TestPlayComputerCaseMinerNoCase(t *testing.T) {
	loadConfig()

	state := State{Funds: 100, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].PowerLeft = 10
	move := Move{Shift: true, Card: 9}
	err := playCard(&state, move)

	if err != ContainerDoesntExist {
		t.Fail()
	}
}

func TestPlayPower(t *testing.T) {
	loadConfig()

	state := State{Funds: 1000, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 20
	move := Move{Shift: true, Card: 19}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].Powers[0].Card != 19 {
		t.Fail()
	}
}

func TestPlayPowerNoFunds(t *testing.T) {
	loadConfig()

	state := State{Funds: 0, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 20
	move := Move{Shift: true, Card: 19}
	err := playCard(&state, move)

	if err != NotEnoughFundsError {
		t.Fail()
	}
}

func TestPlayPowerNoSpace(t *testing.T) {
	loadConfig()

	state := State{Funds: 1000, Level: 1}
	state.Locations[0].Exists = 1
	move := Move{Shift: true, Card: 19}
	err := playCard(&state, move)

	if err != NotEnoughSpaceError {
		t.Fail()
	}
}

func TestPlayGridConnect(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].PowerLeft = 100
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 22}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.FundsPerBlock != 90 {
		t.Fail()
	}
}

func TestPlayCoffeeMachineMiner(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].Development = 100
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 23}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].DevelopmentBonus != 10 {
		t.Fail()
	}
}

func TestPlayBlockchainSmartlock(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].Development = 100
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 43}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.FundsPerBlock != 60 {
		t.Fail()
	}
}

func TestPlayTechnicalTeamLeader(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].Development = 100
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 16}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].DevelopmentBonus != 10 || state.Locations[0].DevelopmentPercentageBonus != 10 {
		t.Fail()
	}
}

func TestPlayCorporateEfficiencyOfficer(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].Development = 100
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 39}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].DevelopmentBonus != 20 || state.Locations[0].DevelopmentPercentageBonus != 20 {
		t.Fail()
	}
}

func TestPlayCorporateExecutive(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 40}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.ProjectTimePercentageDecrease != 95 {
		t.Fail()
	}
}

func TestPlayProjectArchitect(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 17}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.ProjectTimePercentageDecrease != 90 {
		t.Fail()
	}
}

func TestPlayBlackHatHacker(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 18}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.FundsPerBlock != 10 {
		t.Fail()
	}
}

func TestPlayDayTrading(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 1}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 41}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.DayTradingBonus != 1 {
		t.Fail()
	}
}

func TestPlayInformationDealer(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	move := Move{Shift: true, Card: 42}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.PredictionMarketParticipationBonus != 2 {
		t.Fail()
	}
}

func TestPlayHardwareTinkerer(t *testing.T) {
	loadConfig()

	state := State{Funds: 100000, Level: 10}
	state.Locations[0].Exists = 1
	state.Locations[0].SpaceLeft = 100
	state.Locations[0].Mining = 100
	move := Move{Shift: true, Card: 44}
	err := playCard(&state, move)

	if err != nil {
		t.Fail()
	}

	if state.Locations[0].MiningBonus != 5 || state.Locations[0].MiningPercentageBonus != 5 {
		t.Fail()
	}
}
