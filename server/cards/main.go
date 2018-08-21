package main

import (
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/accounts/abi/bind"
	"github.com/ethereum/go-ethereum/common"
	"context"
	"math/big"
	"github.com/mongodb/mongo-go-driver/mongo"
	"github.com/mongodb/mongo-go-driver/bson"
	"fmt"
	"reflect"
	"encoding/hex"
	"net/http"
	"encoding/json"
	"log"
	"time"
	"os"
	"github.com/ethereum/go-ethereum/event"
)

const numberOfCards = 100

type CardsOwned struct {
	Exists            bool
	Address           string               `json:"address"`
	BoostersProcessed [][]byte
	Cards             [numberOfCards] uint `json:"cards"`
}

type Metadata struct {
	Id               uint     `json:"id"`
	Rarity           uint     `json:"rarity"`
	IpfsHash         [32]byte `json:"ipfs_hash"`
	IpfsHashFunction uint8    `json:"ipfs_hash_function"`
	IpfsSize         uint8    `json:"ipfs_size"`
	Artist           string   `json:"artist"`
}

var numberOfCardsInBooster *big.Int
var boosterContract *Booster
var seleneanCardsContract *SeleneanCards
var db *mongo.Database
var client *ethclient.Client

func main() {
	if len(os.Args) > 1 && os.Args[1] == "watcher" {
		var err error
		client, err = ethclient.Dial("wss://kovan.decenter.com:4443")
		if err != nil {
			client.Close()
			return
		}

		seleneanCardsContract, err = NewSeleneanCards(common.HexToAddress("0x51777507fd1c642e1522f3d9bb0ec8cc061e3843"), client)
		if err != nil {
			return
		}

		boosterContract, err = NewBooster(common.HexToAddress("0x2bd3cd032bca5891ef361414a4c716c36ae37474"), client)
		if err != nil {
			return
		}

		db, err = connectToDB()
		if err != nil {
			return
		}

		numberOfCardsInBooster, err = boosterContract.NumberOfCardsInBooster(&bind.CallOpts{})

		startBlock := uint64(7112364)
		iteratorJump := uint64(10000)
		header, _ := client.HeaderByNumber(context.Background(), nil)
		blockNumber := header.Number

		dbClose := false

		end := new(uint64)
		for i := startBlock; i < blockNumber.Uint64(); i += iteratorJump {
			fmt.Println(fmt.Sprintf("Fast sync. Current block number %d", i))
			if i+iteratorJump < blockNumber.Uint64() {
				*end = i + iteratorJump
			} else {
				dbClose = true
				*end = blockNumber.Uint64()
			}

			time.Sleep(time.Second)
			boosterIterator, err := boosterContract.FilterBoosterInstantBought(&bind.FilterOpts{Start: uint64(i), End: end})
			if err != nil {
				return
			}

			go func(boosterIterator *BoosterBoosterInstantBoughtIterator, dbClose bool) {
				time.Sleep(5 * time.Second)

				if len(boosterIterator.logs) > 0 {
					for event := range boosterIterator.logs {
						err := process(new(big.Int).SetBytes(event.Data[32:]), "0x"+hex.EncodeToString(event.Data[:32])[24:], event.TxHash.Bytes(), false)
						if err != nil {
							fmt.Println(fmt.Sprintf("Error occured while proccesing cards: %s", err))
						}
					}
				}

				if dbClose {
					err := db.Client().Disconnect(context.Background())
					if err != nil {
						return
					}
				}

			}(boosterIterator, dbClose)
		}

		sink := make(chan *BoosterBoosterInstantBought)
		subscriber, err := boosterContract.WatchBoosterInstantBought(&bind.WatchOpts{}, sink)

		if err != nil {
			return
		}

		log.Println("Started watching")
		for {
			select {
			case <-subscriber.Err():
				{
					subscriber = event.Resubscribe(100*time.Millisecond, func(ctx context.Context) (event.Subscription, error) {
						return boosterContract.WatchBoosterInstantBought(&bind.WatchOpts{Context: context.Background()}, sink)
					})
				}
			case log := <-sink:
				{
					fmt.Println(fmt.Sprintf("Slow syncing. Current block number %d", log.Raw.BlockNumber))

					err := process(new(big.Int).SetBytes(log.Raw.Data[32:]), "0x"+hex.EncodeToString(log.Raw.Data[:32])[24:], log.Raw.TxHash.Bytes(), true)
					if err != nil {
						fmt.Println(fmt.Sprintf("Error occured while proccesing cards: %s", err))
					}
				}
			}
		}
	}

	log.Println("Server started on: http://localhost:8088")
	http.HandleFunc("/cards-owned", cardsOwned)
	http.HandleFunc("/cards", cards)
	http.ListenAndServe("0.0.0.0:8088", nil)
}

func cardsOwned(w http.ResponseWriter, r *http.Request) {
	db, err := connectToDB()
	if err != nil {
		return
	}

	cursor, err := db.Collection("cards").Find(context.Background(), nil)
	if err != nil {
		return
	}

	var cardsOwnedAll []CardsOwned
	var cardsOwned CardsOwned
	for cursor.Next(context.Background()) {
		cursor.Decode(&cardsOwned)
		cardsOwnedAll = append(cardsOwnedAll, cardsOwned)
	}

	jsonCardsOwnedAll, err := json.Marshal(cardsOwnedAll)
	if err != nil {
		return
	}

	w.Write(jsonCardsOwnedAll)
}
func cards(w http.ResponseWriter, r *http.Request) {
	client, err := ethclient.Dial("wss://kovan.decenter.com:4443")
	if err != nil {
		client.Close()
		return
	}

	cardMetadataContract, err := NewCardMetadata(common.HexToAddress("0x1670ed5f2b463a7ae959edab27728e82bf6ec84c"), client)

	var cardsMetadata []Metadata
	for i := 0; ; i++ {
		cardMetadata, err := cardMetadataContract.Properties(&bind.CallOpts{}, new(big.Int).SetInt64(int64(i)))
		if err != nil {
			break
		}

		cardsMetadata = append(cardsMetadata, Metadata{uint(cardMetadata.Id.Uint64()), uint(cardMetadata.Rarity.Uint64()), cardMetadata.IpfsHash, cardMetadata.IpfsHashFunction, cardMetadata.IpfsSize, cardMetadata.Artist.String()})
	}

	jsonCardsMetadata, err := json.Marshal(cardsMetadata)

	w.Write(jsonCardsMetadata)
}

func process(boosterId *big.Int, address string, txHash []byte, watcher bool) error {
	cardsOwned, err := getCardsOwned(address, watcher)
	if err != nil {
		return err
	}

	for _, boosterProcessed := range cardsOwned.BoostersProcessed {
		if reflect.DeepEqual(boosterProcessed, txHash) {
			return nil
		}
	}

	for i := 0; i < int(numberOfCardsInBooster.Int64()); i++ {
		cardId, err := boosterContract.BoosterCaller.Boosters(&bind.CallOpts{}, boosterId, new(big.Int).SetInt64(int64(i)))
		if err != nil {
			return err
		}

		metadata, _, _, _, _, _, err := seleneanCardsContract.Metadata(&bind.CallOpts{}, cardId)
		if err != nil {
			return err
		}

		cardsOwned.Cards[int(metadata.Int64())]++
	}

	cardsOwned.BoostersProcessed = append(cardsOwned.BoostersProcessed, txHash)

	err = updateCardsOwned(cardsOwned, watcher)
	if err != nil {
		return err
	}

	return nil
}

func getCardsOwned(address string, dbRefresh bool) (*CardsOwned, error) {
	if dbRefresh {
		var err error

		db, err = connectToDB()
		if err != nil {
			return nil, err
		}
	}

	documentResult := db.Collection("cards").FindOne(
		context.Background(),
		bson.NewDocument(bson.EC.String("address", address)))

	var cardsOwned CardsOwned
	documentResult.Decode(&cardsOwned)

	if cardsOwned.Address == "" {
		cardsOwned.Exists = false
		cardsOwned.Address = address
	} else {
		cardsOwned.Exists = true
	}

	if dbRefresh {
		err := db.Client().Disconnect(context.Background())
		if err != nil {
			return nil, err
		}
	}

	return &cardsOwned, nil
}

func updateCardsOwned(cardsOwned *CardsOwned, dbRefresh bool) error {
	if dbRefresh {
		var err error

		db, err = connectToDB()
		if err != nil {
			return err
		}
	}

	var err error
	if cardsOwned.Exists {
		_, err = db.Collection("cards").UpdateOne(
			context.Background(),
			bson.NewDocument(
				bson.EC.String("address", cardsOwned.Address),
			),
			bson.NewDocument(
				bson.EC.SubDocumentFromElements("$set",
					bson.EC.Interface("cards", cardsOwned.Cards),
					bson.EC.Interface("boostersProcessed", cardsOwned.BoostersProcessed),
				),
			))
	} else {
		_, err = db.Collection("cards").InsertOne(
			context.Background(),
			bson.NewDocument(
				bson.EC.String("address", cardsOwned.Address),
				bson.EC.Interface("cards", cardsOwned.Cards),
				bson.EC.Interface("boostersProcessed", cardsOwned.BoostersProcessed),
			))

	}
	if err != nil {
		return err
	}

	if dbRefresh {
		err := db.Client().Disconnect(context.Background())
		if err != nil {
			return err
		}
	}

	return err
}

func connectToDB() (*mongo.Database, error) {
	client, err := mongo.Connect(context.Background(), "mongodb://localhost:27017", nil)

	if err != nil {
		return nil, err
	}

	return client.Database("selenean"), nil
}
