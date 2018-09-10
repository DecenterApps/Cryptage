package main

import (
	"fmt"
	"time"
	"context"
	"reflect"
	"net/http"
	"io/ioutil"
	"encoding/json"

	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/event"
)

type Config struct {
	Cards                map[uint]map[uint]Card `json:"cards"`
	BoosterAddress       string                 `json:"boosterAddress"`
	CryptageAddress      string                 `json:"cryptageAddress"`
	SeleneanCardsAddress string                 `json:"seleneanCardsAddress"`
	CryptageStartBlock   uint64                 `json:"cryptageStartBlock"`
	HttpProvider         string                 `json:"httpProvider"`
	WsProvider           string                 `json:"wsProvider"`
	Levels               []Level                `json:"levels"`
	CardsPerLevel        [][]uint               `json:"cardsPerLevel"`
}

var config Config

func loadConfig() {
	contractJson, _ := ioutil.ReadFile("./config.json")
	json.Unmarshal(contractJson, &config)

	for i := 0; i < len(config.Cards); i++ {
		for j := 1; j <= len(config.Cards[uint(i)]); j++ {
			card := config.Cards[uint(i)][uint(j)]
			card.Level -= levelOffset
			config.Cards[uint(i)][card.Level] = card
		}

		delete(config.Cards[uint(i)], uint(len(config.Cards[uint(i)])-1))
	}
}

func process(address string, hexMoves []byte, reset bool, hash []byte) error {
	sendBlockNumber, moves := DecodeMoves(hexMoves)
	cryptage, err := getCryptage(address, reset, sendBlockNumber)
	if err != nil {
		return err
	}

	//check if event is already processed
	for _, cryptageEvent := range cryptage.Events {
		if reflect.DeepEqual(cryptageEvent, hash) {
			return nil
		}
	}

	err = cryptage.update(sendBlockNumber, moves)
	if err != nil {
		return err
	}

	cryptage.Events = append(cryptage.Events, hash)
	updateCryptage(*cryptage)
	return nil
}

func leaderboard(w http.ResponseWriter, r *http.Request) {
	cryptageDocuments, err := findAll()
	if err != nil {
		return
	}

	cryptageDocumentsJson, err := json.Marshal(cryptageDocuments)
	if err != nil {
		return
	}

	w.Write(cryptageDocumentsJson)
}

func main() {
	loadConfig()

	client, err := getClient("ws")
	if err != nil {
		client.Close()
		return
	}

	filterer, err := NewCryptageMovesFilterer(common.HexToAddress(config.CryptageAddress), client)

	sink := make(chan *CryptageMovesNewMoves)
	watchSub, err := filterer.WatchNewMoves(&bind.WatchOpts{Context: context.Background()}, sink, nil)
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occured while trying to initaite event subscriber"))
		return
	}

	blockNumber, err := getBlockNumber()
	if err != nil {
		fmt.Println(fmt.Sprintf("Error occured while fetching latest block number"))
		return
	}

	iter, err := filterer.FilterNewMoves(&bind.FilterOpts{Start: uint64(config.CryptageStartBlock), End: blockNumber}, nil)

	for iter.Next() {
		err := process("0x"+iter.Event.Raw.Topics[1].String()[26:], iter.Event.Raw.Data[96:], iter.Event.Raw.Data[63] > 0, iter.Event.Raw.TxHash.Bytes())
		if err != nil {
			fmt.Println(fmt.Sprintf("Error occured while updating state: %s, txHash: %s", err, iter.Event.Raw.TxHash.String()))
		} else {
			fmt.Println(fmt.Sprintf("Successfuly updated state, txHash: %s", iter.Event.Raw.TxHash.String()))
		}
	}

	go func() {
		for {
			select {
			case <-watchSub.Err():
				{
					watchSub = event.Resubscribe(100*time.Millisecond, func(ctx context.Context) (event.Subscription, error) {
						return filterer.WatchNewMoves(&bind.WatchOpts{Context: context.Background()}, sink, nil)
					})
				}
			case watchLog := <-sink:
				{
					err := process("0x"+watchLog.Raw.Topics[1].String()[26:], watchLog.Raw.Data[96:], watchLog.Raw.Data[63] > 0, watchLog.Raw.TxHash.Bytes())
					if err != nil {
						fmt.Println(fmt.Sprintf("Error occured while updating state: %s, txHash: %s", err, iter.Event.Raw.TxHash.String()))
					} else {
						fmt.Println(fmt.Sprintf("Successfuly updated state, txHash: %s", iter.Event.Raw.TxHash.String()))
					}
				}
			}
		}
	}()

	http.HandleFunc("/leaderboard", leaderboard)
	http.ListenAndServe(":8080", nil)
}
