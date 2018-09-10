package main

import "errors"

var CardsNotInOrder = errors.New("cards not in correct order")

type Cryptage struct {
	Address string
	State   *State
	Cards   []uint
	Events  [][]byte
}

func (cryptage *Cryptage) update(sendBlockNumber uint, moves []Move) error {
	for i := 0; i < len(moves); i++ {
		if moves[i].BlockNumber < cryptage.State.BlockNumber {
			//fix error message
			return CardsNotInOrder
		}

		// update everything based on funds per block
		cryptage.State.Funds += (moves[i].BlockNumber - cryptage.State.BlockNumber) * cryptage.State.FundsPerBlock
		// update all projects
		updateProjects(cryptage.State, moves[i].BlockDifference)
		// calculate level based on current experience
		cryptage.State.Level = getLevel(cryptage.State.Experience)

		var err error
		if moves[i].Shift {
			err = playCard(cryptage.State, moves[i])
		} else {
			err = removeCard(cryptage.State, moves[i])
		}

		if err != nil {
			return err
		}

		// verify that user is in possession of the played/removed card
		err = verifyCardsOwnership(cryptage.Address, cryptage.State.MaximumCardsCount, cryptage.State.Level, cryptage.State.BlockNumber, moves[i].BlockNumber, cryptage.Cards)
		if err != nil {
			return err
		}

		// set new block number
		cryptage.State.BlockNumber = moves[i].BlockNumber
	}
	updateProjects(cryptage.State, sendBlockNumber-moves[len(moves)-1].BlockNumber)
	cryptage.State.BlockNumber = sendBlockNumber

	return nil
}

func updateProjects(state *State, blockDifference uint) {
	for i := 0; i < len(state.Projects); i++ {
		if state.Projects[i].Exists > 0 {
			if state.Projects[i].TimeLeft == 0 {
				continue
			}
			if state.Projects[i].TimeLeft > blockDifference {
				state.Projects[i].TimeLeft -= blockDifference
			} else {
				state.Projects[i].TimeLeft = 0
				state.Projects[i].Exists = 0
				removeCard(state, Move{Card: state.Projects[i].Card, Level: state.Projects[i].Card})
			}
		}
	}
}

func getLevel(experience uint) uint {
	for i := 0; i < len(config.Levels); i++ {
		if config.Levels[i].Exp > experience {
			return config.Levels[i-1].Level
		}
	}

	return config.Levels[len(config.Levels)-1].Level
}
