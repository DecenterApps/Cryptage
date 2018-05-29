package main

import (
  "errors"
  "context"
  "math/big"
  "io/ioutil"
  "encoding/json"

  "github.com/ethereum/go-ethereum/common"
  "github.com/ethereum/go-ethereum/ethclient"
  "github.com/ethereum/go-ethereum/accounts/abi/bind"
)

var UnableToConnectToNode = errors.New("unable to connect to node")
var UnableToFetchLastBlock = errors.New("unable to fetch last block")
var UnableToCreateContractInterface = errors.New("unable to create contract interface")

type Ethereum struct {
  HttpProvider string `json:"httpProvider"`
}

type Contract struct {
  Address string `json:"address"`
}

func GetClient() (client *ethclient.Client, err error) {
  var ethereum Ethereum
  contractJson, _ := ioutil.ReadFile("./constants/ethereum.json")
  json.Unmarshal(contractJson, &ethereum)

  return ethclient.Dial(ethereum.HttpProvider)
}

func GetBlockNumber() (*big.Int, error) {

  client, err := GetClient()
  if err != nil {
    return nil, UnableToConnectToNode
  }

  header, err := client.HeaderByNumber(context.Background(), nil)
  client.Close()

  // TODO check error: missing required field 'mixHash' for Header
  //if err != nil {
  //  return nil, UnableToFetchLastBlock
  //}

  return header.Number, nil
}

func GetNumberOfCardWithType(address string, metadataId int) (*big.Int, error) {
  client, err := GetClient()
  if err != nil {
    client.Close()
    return nil, UnableToConnectToNode
  }

  var contract Contract
  contractJson, _ := ioutil.ReadFile("./constants/contract.json")
  json.Unmarshal(contractJson, &contract)

  cardsContract, err := NewSeleneanCards(common.HexToAddress(contract.Address), client)
  if err != nil {
    return nil, UnableToCreateContractInterface
  }

  return cardsContract.NumberOfCardsWithType(&bind.CallOpts{Pending: true}, common.HexToAddress(address), big.NewInt(int64(metadataId)))
}
