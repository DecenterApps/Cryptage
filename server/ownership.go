package main

import (
  "errors"
  "math/big"
  "io/ioutil"
  "encoding/json"
)

var CardOwnershipVerificationFailed = errors.New("card ownership verification failed")

func verifyCardsOwnership(address string, maximumCardsCount [numberOfCards]uint, level uint) error {
  var cardsPerLevel [][]uint
  cardsPerLevelJson, _ := ioutil.ReadFile("./constants/cardsPerLevel.json")
  json.Unmarshal(cardsPerLevelJson, &cardsPerLevel)

  for i, cards := range cardsPerLevel {
    if uint(i) <= level {
      for _, card := range cards {
        if maximumCardsCount[card] > 0 {
          maximumCardsCount[card]--
        }
      }
    }
  }

  for i, count := range maximumCardsCount {
    if count == 0 {
      continue
    }

    // optimize
    ownershipCount, err := GetNumberOfCardWithType(address, i)
    if err != nil {
      return err
    }

    if ownershipCount.Cmp(big.NewInt(int64(count))) == -1  {
      return CardOwnershipVerificationFailed
    }
  }

  return nil
}
