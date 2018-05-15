package main

import (
  "context"
  "github.com/mongodb/mongo-go-driver/mongo"
  "github.com/mongodb/mongo-go-driver/bson"
)

type CryptageDocument struct {
  Exists bool
  Address string
  Name string
  StateBuffer []byte
}

func connectToDB() (*mongo.Database, error) {
  client, err := mongo.Connect(context.Background(), "mongodb://localhost:27017", nil)

  if err != nil {
    return nil, err
  }

  return client.Database("selenean"), nil
}

func update(cryptageDocument CryptageDocument) error {
  db, err := connectToDB()

  if err != nil {
    return err
  }

  if cryptageDocument.Exists {
     _, err = db.Collection("cryptage").UpdateOne(
      context.Background(),
      bson.NewDocument(
        bson.EC.String("address", cryptageDocument.Address),
      ),
      bson.NewDocument(
        bson.EC.SubDocumentFromElements("$set",
          bson.EC.String("name", cryptageDocument.Name),
          bson.EC.Binary("stateBuffer", cryptageDocument.StateBuffer),
        ),
      ))

     return err
  }

  _, err = db.Collection("cryptage").InsertOne(
    context.Background(),
    bson.NewDocument(
      bson.EC.String("address", cryptageDocument.Address),
      bson.EC.String("name", cryptageDocument.Name),
      bson.EC.Binary("stateBuffer", cryptageDocument.StateBuffer),
    ))

  return err
}

func get(address string) (*CryptageDocument, error) {
  db, err := connectToDB()

  if err != nil {
    return nil, err
  }

  documentResult := db.Collection("cryptage").FindOne(
    context.Background(),
    bson.NewDocument(bson.EC.String("address", address)))

  var cryptageDocument CryptageDocument
  documentResult.Decode(&cryptageDocument)
  cryptageDocument.Exists = len(cryptageDocument.StateBuffer) > 0

  return &cryptageDocument, nil
}
