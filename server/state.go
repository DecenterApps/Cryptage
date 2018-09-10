package main

const numberOfLocations = 6
const numberOfProjects = 10
const computerCaseMinersCount = 5
const rigCaseMinersCount = 4

const powerLevelCount = 5
const computerCaseMinersLevelCount = 5
const rigCaseMinersLevelCount = 5
const asicCaseLevelCount = 5
const developerLevelCount = 5
const specialLevelCount = 5

const levelOffset = 1
const computerCaseMinersOffset = 9
const rigCaseMinersOffset = 10

const blockNumberOffset = 10000

type State struct {
	Funds                              uint                        `json:"funds"`
	FundsPerBlock                      uint                        `json:"funds_per_block"`
	Experience                         uint                        `json:"experience"`
	Level                              uint                        `json:"level"`
	DevelopmentLeft                    uint                        `json:"development_left"`
	BlockNumber                        uint                        `json:"block_number"`
	DayTradingBonus                    uint                        `json:"day_trading_bonus"`
	CpuCount                           uint                        `json:"cpu_count"`
	GpuCount                           uint                        `json:"gpu_count"`
	ProjectTimePercentageDecrease      uint                        `json:"project_time_percentage_decrease"`
	PredictionMarketParticipationBonus uint                        `json:"prediction_market_participation_bonus"`
	Locations                          [numberOfLocations]Location `json:"locations"`
	Projects                           [numberOfProjects]Project   `json:"projects"`
	CurrentCardsCount                  []uint                      `json:"current_cards_count"`
	MaximumCardsCount                  []uint                      `json:"maximum_cards_count"`
}

type Location struct {
	Exists                     uint           `json:"exists"`
	Card                       uint           `json:"card"`
	NumberOfCards              uint           `json:"number_of_cards"`
	SpaceLeft                  uint           `json:"space_left"`
	PowerLeft                  uint           `json:"power_left"`
	Development                uint           `json:"development"`
	DevelopmentBonus           uint           `json:"development_bonus"`
	DevelopmentPercentageBonus uint           `json:"development_percentage_bonus"`
	Mining                     uint           `json:"mining"`
	MiningBonus                uint           `json:"mining_bonus"`
	MiningPercentageBonus      uint           `json:"mining_percentage_bonus"`
	SpaceRenting               uint           `json:"space_renting"`
	SpaceRentingBonus          uint           `json:"space_renting_bonus"`
	PowerRenting               uint           `json:"power_renting"`
	PowerRentingBonus          uint           `json:"power_renting_bonus"`
	CoffeeMiner                uint           `json:"coffee_miner"`
	ComputerCases              []ComputerCase `json:"computer_cases"`
	RigCases                   []RigCase      `json:"rig_cases"`
	AsicCases                  []MountCase    `json:"asic_cases"`
	People                     []Person       `json:"people"`
	Powers                     []Power        `json:"powers"`
	SpecialCards               []SpecialCard  `json:"special_cards"`
}

type Power struct {
	Card  uint                  `json:"card"`
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
	Card  uint                      `json:"card"`
	Count [developerLevelCount]uint `json:"count"`
}

type SpecialCard struct {
	Card  uint                    `json:"card"`
	Count [specialLevelCount]uint `json:"count"`
}

type Project struct {
	Exists   uint `json:"exists"`
	Card     uint `json:"card"`
	Level    uint `json:"level"`
	TimeLeft uint `json:"time_left"`
}

func NewState(blockNumber uint) *State {
	return &State{
		Funds:                         150,
		FundsPerBlock:                 0,
		DevelopmentLeft:               0,
		BlockNumber:                   blockNumber - blockNumberOffset,
		ProjectTimePercentageDecrease: 0,
		Locations:                     [6]Location{},
		Projects:                      [10]Project{},
		CurrentCardsCount:             make([]uint, len(config.Cards)),
		MaximumCardsCount:             make([]uint, len(config.Cards)),
	}
}
