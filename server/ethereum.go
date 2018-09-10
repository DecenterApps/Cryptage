package main

import (
	"errors"
	"context"
	"reflect"
	"math/big"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
)

var UnableToConnectToNode = errors.New("unable to connect to node")
var UnableToFetchLastBlock = errors.New("unable to fetch last block")

var numberOfCardsInBooster *big.Int

func getClient(schema string) (client *ethclient.Client, err error) {
	if schema == "http" {
		return ethclient.Dial(config.HttpProvider)
	} else {
		return ethclient.Dial(config.WsProvider)
	}
}

func getBlockNumber() (*uint64, error) {

	client, err := getClient("http")
	if err != nil {
		return nil, UnableToConnectToNode
	}

	header, err := client.HeaderByNumber(context.Background(), nil)
	client.Close()

	// TODO check error: missing required field 'mixHash' for Header
	//if err != nil {
	//  return nil, UnableToFetchLastBlock
	//}

	blockNumber := header.Number.Uint64()
	return &blockNumber, nil
}

func refreshCards(address string, start uint64, end *uint64, cards []uint) ([]uint, error) {
	client, err := getClient("ws")
	if err != nil {
		client.Close()
		return make([]uint, len(config.Cards)), UnableToConnectToNode
	}

	var indexedKeyRule []interface{}
	hexAddress := common.HexToAddress(address)
	indexedKeyRule = append(indexedKeyRule, hexAddress)

	boosterContract, err := NewBooster(common.HexToAddress(config.BoosterAddress), client)
	boosterIterator, err := boosterContract.FilterBoosterInstantBought(&bind.FilterOpts{Start: start, End: end}, []common.Address{hexAddress})
	if err != nil {
		return make([]uint, len(config.Cards)), err
	}

	cardPackTokenContract, err := NewSeleneanCards(common.HexToAddress(config.SeleneanCardsAddress), client)
	cardPackTokenTransferIterator, err := cardPackTokenContract.FilterTransfer(&bind.FilterOpts{}, []common.Address{hexAddress}, []common.Address{hexAddress}, nil)
	if err != nil {
		return make([]uint, len(config.Cards)), err
	}

	if len(boosterIterator.logs) > 0 {
		for log := range boosterIterator.logs {
			if common.ToHex(log.Data[:32]) == address {
				boosterId := new(big.Int).SetBytes(log.Data[32:])

				if numberOfCardsInBooster == nil {
					numberOfCardsInBooster, err = boosterContract.NumberOfCardsInBooster(&bind.CallOpts{})
					if err != nil {
						return make([]uint, len(config.Cards)), err
					}
				}

				for i := 0; i < int(numberOfCardsInBooster.Int64()); i++ {
					cardId, err := boosterContract.BoosterCaller.Boosters(&bind.CallOpts{}, boosterId, new(big.Int).SetInt64(int64(i)))
					if err != nil {
						return make([]uint, len(config.Cards)), err
					}

					cards[int(cardId.Int64())]++
				}
			}
		}
	}

	if len(cardPackTokenTransferIterator.logs) > 0 {
		for log := range cardPackTokenTransferIterator.logs {
			if reflect.DeepEqual(log.Data[12:32], hexAddress.Bytes()[:20]) {
				cards[int(new(big.Int).SetBytes(log.Data[32:]).Int64())]++
			} else {
				cards[int(new(big.Int).SetBytes(log.Data[32:]).Int64())]--
			}
		}
	}

	return cards, nil
}
