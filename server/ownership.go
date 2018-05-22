package main

import (
  "fmt"
  "github.com/ethereum/go-ethereum/accounts/abi/bind"
  "github.com/ethereum/go-ethereum/ethclient"
  "github.com/ethereum/go-ethereum/common"
  "math/big"
  "errors"
  "io/ioutil"
  "encoding/json"
)

var UnableToConnectToNode = errors.New("unable to connect to node")
var CardOwnershipVerificationFailed = errors.New("card ownership verification failed")
var contract Contract

type Contract struct {
  HttpProvider string `json:"httpProvider"`
  Address string `json:"address"`
}

func verifyCardsOwnership(address string, maximumCardsCount [numberOfCards]uint, level uint) error {
  contractJson, _ := ioutil.ReadFile("./constants/contract.json")
  json.Unmarshal(contractJson, &contract)

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

  client, err := getClient()

  if err != nil {
    fmt.Println(err)
    return UnableToConnectToNode
  }

  cardsContract, err := NewSeleneanCards(common.HexToAddress(contract.Address), client)

  for i, count := range maximumCardsCount {
    if count == 0 {
      continue
    }

    // optimize
    ownershipCount, err := cardsContract.NumberOfCardsWithType(&bind.CallOpts{Pending: true}, common.HexToAddress(address), big.NewInt(int64(i)))

    if err != nil {
      return err
    }

    if ownershipCount.Cmp(big.NewInt(int64(count))) == -1  {
      return CardOwnershipVerificationFailed
    }
  }

  return nil
}

func getClient() (client *ethclient.Client, err error) {
  return ethclient.Dial(contract.HttpProvider)
}
