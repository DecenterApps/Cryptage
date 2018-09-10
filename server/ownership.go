package main

import (
	"errors"
)

var CardOwnershipVerificationFailed = errors.New("card ownership verification failed")

func verifyCardsOwnership(address string, maximumCardsCount []uint, level uint, fromCheckBlock uint, toCheckBlock uint, cards []uint) error {

	for i, cards := range config.CardsPerLevel {
		if uint(i) <= level {
			for _, card := range cards {
				if maximumCardsCount[card] > 0 {
					maximumCardsCount[card]--
				}
			}
		}
	}

	if toCheckBlock > fromCheckBlock {
		toCheckBlockInt := uint64(toCheckBlock)

		var err error
		cards, err = refreshCards(address, uint64(fromCheckBlock), &toCheckBlockInt, cards)

		if err != nil {
			return err
		}
	}

	for i := 0; i < len(config.Cards); i++ {
		if maximumCardsCount[i] == 0 {
			continue
		}

		if maximumCardsCount[i] > cards[i] {
			return CardOwnershipVerificationFailed
		}
	}

	return nil
}
