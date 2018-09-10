package main

import (
	"context"

	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/mongo"
)

type CryptageDocument struct {
	Address     string
	StateBuffer []byte
	Cards       []uint
	Events      [][]byte
}

func connectToDB() (*mongo.Database, error) {
	client, err := mongo.Connect(context.Background(), "mongodb://localhost:27017", nil)

	if err != nil {
		return nil, err
	}

	return client.Database("selenean"), nil
}

func updateOne(cryptageDocument CryptageDocument) error {
	db, err := connectToDB()
	if err != nil {
		return err
	}

	db.Collection("cryptage").FindOneAndUpdate(
		context.Background(),
		bson.NewDocument(
			bson.EC.String("address", cryptageDocument.Address),
		),
		bson.NewDocument(
			bson.EC.SubDocumentFromElements("$set",
				bson.EC.Binary("stateBuffer", cryptageDocument.StateBuffer),
				bson.EC.Interface("cards", cryptageDocument.Cards),
				bson.EC.Interface("events", cryptageDocument.Events),
			),
		))
	return nil
}

func findOne(address string) (*CryptageDocument, error) {
	db, err := connectToDB()

	if err != nil {
		return nil, err
	}

	documentResult := db.Collection("cryptage").FindOne(
		context.Background(),
		bson.NewDocument(bson.EC.String("address", address)))

	var cryptageDocument CryptageDocument
	documentResult.Decode(&cryptageDocument)

	return &cryptageDocument, nil
}

func findAll() ([]*CryptageDocument, error) {
	db, err := connectToDB()
	if err != nil {
		return nil, err
	}

	cursor, err := db.Collection("cryptage").Find(
		context.Background(), nil, nil,
	)
	if err != nil {
		return nil, err
	}

	var cryptageDocuments []*CryptageDocument
	var cryptageDocument CryptageDocument
	for cursor.Next(context.Background()) {
		cursor.Decode(&cryptageDocument)
		cryptageDocuments = append(cryptageDocuments, &cryptageDocument)
	}

	return cryptageDocuments, nil
}
